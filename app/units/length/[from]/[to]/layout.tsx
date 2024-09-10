import type { Metadata } from 'next'
import units from '@/src/data/length';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export async function generateMetadata(
  { params: { from, to } }: { params: { from?: string, to?: string } }
): Promise<Metadata> {
  from = decodeURI(from ?? '');
  to = decodeURI(to ?? '');

  const fromObj: typeof units[string] | undefined = units[from];
  const toObj: typeof units[string] | undefined = units[to];

  let title = 'Convert length from ';

  if (fromObj && toObj)
    title += `${fromObj.name} to ${toObj.name}`;
  else if (fromObj)
    title += `${fromObj.name} to any unit`;
  else if (toObj)
    title += `any unit to ${toObj.name}`;
  else
    title = 'Convert between any two length units';

  const description = 'Simple online utility to convert any number between any two length units';

  return {
    title, description,
    openGraph: {
      title, description,
      url: `https://utilz.eu/units/length/${from}/${to}`,
    }
  };
}