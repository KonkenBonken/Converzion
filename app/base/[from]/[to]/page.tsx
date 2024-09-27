"use client";
import anyBase from 'any-base';
import { usePathname, useRouter } from 'next/navigation';
import { LinkList } from '@/src/components/LinkSelect';
import SwapButton from "@/src/components/Swap";
import scss from '@/app/main.module.scss';
import { useState } from 'react';
import texts from '@/src/data/base';
import hasch from 'hasch';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+!@#$^';
const bases = Array(alphabet.length - 1).fill(0).map((_, i) => (i + 2).toString());

function BaseList({ from, both, length = 15 }: { from?: true, both?: true, length?: number }) {
  const current = usePathname().split('/');

  const href = (base: string, other?: string) => {
    current[2] ||= '-';
    current[3] ||= '-';

    if (other) {
      current[2] = other;
      current[3] = other;
    }

    if (from)
      current[2] = base;
    else
      current[3] = base;

    return current.join('/');
  }

  return both ? <LinkList links={
    bases
      .sort((a, b) => hasch(a + current, { decimal: true, seed: from }) - hasch(b + current, { decimal: true, seed: from }))
      .slice(0, length)
      .map(base => {
        const other = hasch(current + base, { choose: bases, seed: Math.floor((new Date).getDate() / 7) });
        return {
          href: href(base, other),
          value: [`Convert base ${other} to base ${base}`]
        }
      })
  } />
    : <LinkList links={
      bases
        .sort((a, b) => hasch(a + current, { decimal: true, seed: from }) - hasch(b + current, { decimal: true, seed: from }))
        .slice(0, length)
        .map(base => ({
          href: href(base),
          value: [from ? `Convert from base ${base}` : `Convert to base ${base}`]
        }))
    } />
}


export default function BasePage({ params: { from, to } }: { params: { from?: string, to?: string } }) {
  const fromN = parseInt(from ?? '');
  const toN = parseInt(to ?? '');

  const complete = !Number.isNaN(fromN) && !Number.isNaN(toN) && 2 <= fromN && fromN <= 70 && 2 <= toN && toN <= 70;

  const [input, setInput] = useState('10');

  const fromAlpha = alphabet.slice(0, fromN);
  const toAlpha = alphabet.slice(0, toN);

  const converter = complete && anyBase(fromAlpha, toAlpha);
  const validInput = input.split('').every(c => fromAlpha.includes(c))

  const result = validInput && converter && converter(input)

  const FromText = texts[fromN];
  const ToText = texts[toN];

  const router = useRouter();

  return <section className={scss.mainSection}>
    <h2>Number base converter</h2>
    <section>
      Convert any number from base
      <select onChange={e => router.push(`/base/${e.currentTarget.value}/${toN}`)} defaultValue={fromN}>
        <option disabled>-</option>
        {bases.map(base => (
          <option key={base}>{base}</option>
        ))}
      </select>
      to
      {complete && <SwapButton />}
      base
      <select onChange={e => router.push(`/base/${fromN}/${e.currentTarget.value}`)} defaultValue={toN}>
        <option disabled>-</option>
        {bases.map(base => (
          <option key={base}>{base}</option>
        ))}
      </select>
    </section>
    {
      complete &&
      <input type="number" value={input} onInput={e => setInput(e.currentTarget.value || '10')} />
    }
    {
      !!(complete && validInput) &&
      <div className={scss.result}>
        {input}<sub>{fromN}</sub> = {result}<sub>{toN}</sub>
      </div>
    }
    <section className={scss.linkList}>
      {toN && <section className={scss.from}>
        <h4>Convert other number bases to base {toN}:</h4>
        <BaseList from />
      </section>}
      {fromN && <section className={scss.to}>
        <h4>Convert base {fromN} to other number bases:</h4>
        <BaseList />
      </section>}
      {!toN && !fromN && <section className={scss.both}>
        <h4>Convert between these popular number bases:</h4>
        <BaseList both length={25} />
      </section>}
    </section>
    <section className={scss.sidebar}>
      {!!fromN && texts[fromN] && <article>
        <FromText />
      </article>}
      {!!toN && texts[toN] && <article>
        <ToText />
      </article>}
    </section>
  </section>
}