"use client";
import anyBase from 'any-base';
import { usePathname } from 'next/navigation';
import { LinkSelect } from '@/src/components/LinkSelect';
import SwapButton from "@/src/components/Swap";
import scss from '@/app/main.module.scss';
import { useState } from 'react';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+!@#$^';
const bases = Array(alphabet.length - 1).fill(0).map((_, i) => (i + 2).toString());

console.log(bases)

function BaseList({ from }: { from?: true }) {
  const current = usePathname().split('/');

  const href = (base: string) => {
    current[2] ||= '-';
    current[3] ||= '-';

    if (from)
      current[2] = base;
    else
      current[3] = base;

    return current.join('/');
  }


  return <LinkSelect links={
    Object.values(bases).map(base => ({
      href: href(base),
      value: [base]
    }))
  } />
}


export default function BasePage({ params: { from, to } }: { params: { from?: string, to?: string } }) {
  const fromN = parseInt(from ?? '');
  const toN = parseInt(to ?? '');

  const complete = !Number.isNaN(fromN) && !Number.isNaN(toN);

  const [input, setInput] = useState('10');

  const fromAlpha = alphabet.slice(0, fromN);
  const toAlpha = alphabet.slice(0, toN);


  const converter = anyBase(fromAlpha, toAlpha);
  const validInput = input.split('').every(c => fromAlpha.includes(c))

  const result = validInput && converter(input)

  return <section className={scss.mainSection}>
    <h2>Number base converter</h2>
    <section>
      Convert any number from base
      <BaseList from /> to
      {complete && <SwapButton />}
      base <BaseList />
    </section>
    {
      complete &&
      <input type="number" value={input} onInput={e => setInput(e.currentTarget.value || '10')} />
    }
    {
      !!(complete && fromN && toN && validInput) &&
      <div className={scss.result}>
        {input}<sub>{fromN}</sub> = {result}<sub>{toN}</sub>
      </div>
    }
  </section>
}