'use client';

import Image, { type ImageProps } from 'next/image';
import sizes from '@/lib/portfolio-image-sizes.json';
import generatedImages from '@/lib/portfolio-images.generated.json';

const images: Record<string, { key: string; width: number }> = generatedImages;

export default function PortfolioImage({ alt, ...props }: ImageProps) {
  const image = typeof props.src === 'string' ? images[props.src] : undefined;
  if (!image) return <Image {...props} alt={alt} />;

  return (
    <Image
      {...props}
      alt={alt}
      loader={({ width }) => {
        const size = Math.min(image.width, Math.max(sizes.imageSizes[0], width));
        return `/portfolio-images/${image.key}/${size}.webp`;
      }}
    />
  );
}
