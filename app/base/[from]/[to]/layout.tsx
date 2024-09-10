import type { Metadata } from 'next'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export async function generateMetadata(
  { params: { from, to } }: { params: { from?: string, to?: string } }
): Promise<Metadata> {
  const fromN = parseInt(from ?? '');
  const toN = parseInt(to ?? '');

  let title = 'Convert any number from ';

  if (fromN && toN)
    title += `base ${fromN} to base ${toN}`;
  else if (fromN)
    title += `base ${fromN} to any base`;
  else if (toN)
    title += `any base to base ${toN}`;
  else
    title = 'Convert between any two bases';

  const description = 'Simple online utility to convert any number between any two bases';

  return {
    title, description,
    openGraph: {
      title, description,
      url: `https://utilz.eu/units/length/${from}/${to}`,
    }
  };
}