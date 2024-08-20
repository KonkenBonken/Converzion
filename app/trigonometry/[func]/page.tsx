import Trig from "./Trig";

export const pages = {
  sin: {
    name: 'sin'
  },
  cos: {
    name: 'cos'
  },
  tan: {
    name: 'tan'
  }
} as const;

export default function Page({ params: { func } }: { params: { func: keyof typeof pages } }) {
  console.log(pages, func, pages[func])

  return <Trig name={pages[func].name} />
}

export async function generateStaticParams() {
  return [{ func: 'sin' }, { func: 'cos' }, { func: 'tan' }]
}
