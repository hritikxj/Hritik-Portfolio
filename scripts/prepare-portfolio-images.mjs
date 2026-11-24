import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';
import sizes from '../src/lib/portfolio-image-sizes.json' with { type: 'json' };

const publicDirectory = resolve('public');
const outputDirectory = join(publicDirectory, 'portfolio-images');
const manifestPath = resolve('src/lib/portfolio-images.generated.json');
const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const widths = [...sizes.imageSizes, ...sizes.deviceSizes];
const maximumWidth = Math.max(...widths);
const defaultQuality = 75;
const posterQuality = 70;

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && path !== outputDirectory) return findImages(path);
    if (entry.isFile() && extensions.has(extname(entry.name).toLowerCase())) return [path];
    return [];
  }));
  return images.flat();
}

async function makeImageEntry(path) {
  const source = '/' + relative(publicDirectory, path).split(sep).join('/');
  const input = await readFile(path);
  const info = await sharp(input).metadata();
  const width = Math.min(maximumWidth, info.autoOrient.width);
  const variants = [...widths.filter(size => size < width), width];
  const quality = source.startsWith('/social/vivora_') ? posterQuality : defaultQuality;
  const key = createHash('sha256')
    .update(input)
    .update(JSON.stringify(['webp-v1', sharp.versions.sharp, sharp.versions.vips, quality]))
    .digest('hex')
    .slice(0, 24);
  const directory = join(outputDirectory, key);
  await mkdir(directory, { recursive: true });

  for (const size of variants) {
    const output = join(directory, size + '.webp');
    const existing = await stat(output).catch(error => {
      if (error.code !== 'ENOENT') throw error;
    });
    if (!existing?.size) {
      const temporary = output + '.' + randomUUID() + '.tmp';
      await sharp(input)
        .autoOrient()
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality })
        .toFile(temporary);
      await rename(temporary, output);
    }
  }

  return [source, { key, width }];
}

const images = (await findImages(publicDirectory)).sort();
const manifest = [];
// Limit concurrent decodes so large posters don't exhaust build memory.
for (let index = 0; index < images.length; index += 4) {
  manifest.push(...await Promise.all(images.slice(index, index + 4).map(makeImageEntry)));
}
await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, JSON.stringify(Object.fromEntries(manifest)) + '\n');
console.log(`Prepared responsive variants for ${images.length} portfolio images.`);
