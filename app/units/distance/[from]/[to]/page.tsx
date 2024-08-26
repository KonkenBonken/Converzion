import Distance from '../../Distance';

export default function Page({ params: { from, to } }: { params: { from: string, to: string } }) {
  return <Distance from={from} to={to} />
}
