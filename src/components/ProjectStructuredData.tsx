export default function ProjectStructuredData({ title, description, path }: { title: string; description: string; path: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: `https://hritikjasnani.vercel.app${path}`,
    creator: { '@id': 'https://hritikjasnani.vercel.app/#person' },
    isPartOf: { '@id': 'https://hritikjasnani.vercel.app/#website' },
  }).replace(/</g, '\\u003c') }} />;
}
