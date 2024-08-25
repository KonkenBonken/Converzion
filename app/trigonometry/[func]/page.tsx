import { notFound } from 'next/navigation'
import { isKeyOfObject } from '@/src/utils';
import Trig from './Trig';

const params = {
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

export type params = typeof params;

export default function Page({ params: { func } }: { params: { func: string } }) {
  if (!isKeyOfObject(func, params))
    notFound()

  return <Trig name={params[func].name} />
}
