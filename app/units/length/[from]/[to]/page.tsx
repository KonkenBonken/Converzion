import Length from '../../Length';

export default function Page({ params: { from, to } }: { params: { from: string, to: string } }) {
  return <Length from={from} to={to} />
}
