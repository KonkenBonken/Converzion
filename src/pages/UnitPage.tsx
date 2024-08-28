"use client";
import { useState } from "react";
import { LinkSelect, LinkList } from '@/src/components/LinkSelect';
import { usePathname } from "next/navigation";
import scss from '@/app/main.module.scss';
import hasch from "hasch";
import SwapButton from "@/src/components/Swap";
import clsx from "clsx";

export default function UnitPage(
  units: Record<string, {
    name: string
    unit: string
    toRoot: number
    text: string
  }>,
  name: string
) {
  const lowerName = name.toLowerCase();

  function Unit({ unit }: { unit: typeof units[string] }) {
    return <abbr title={unit.name}>{unit.unit}</abbr>
  }

  function UnitList({ from, select }: { from?: true, select?: true }) {
    const current = usePathname()?.split('/') ?? [];

    const href = (unit: typeof units[string]) => {
      current[3] ||= '-';
      current[4] ||= '-';

      if (from)
        current[3] = unit.unit;
      else
        current[4] = unit.unit;

      return current.join('/');
    }

    return select ? <LinkSelect links={
      Object.values(units).map(unit => ({
        href: href(unit),
        value: [unit.name, unit.unit]
      }))
    } />
      : <LinkList links={
        Object.values(units)
          .sort((a, b) => hasch(a.unit + current, { decimal: true, seed: from }) - hasch(b.unit + current, { decimal: true, seed: from }))
          .slice(0, 15)
          .map(unit => ({
            href: href(unit),
            value: [unit.name, unit.unit]
          }))
      } />
  }

  return function Page({ params: { from, to } }: { params: { from?: string, to?: string } }) {
    const fromObj: typeof units[string] | undefined = units[from ?? ''];
    const toObj: typeof units[string] | undefined = units[to ?? ''];

    const incomplete = from === '-' || to === '-';

    const [input, setInput] = useState<number>(1);
    const result = (input && fromObj && toObj) && +(input / fromObj.toRoot * toObj.toRoot).toPrecision(6);

    const ready = !!(!incomplete && fromObj && toObj);

    return (<>
      <section className={scss.mainSection}>
        <h2>{name} unit converter</h2>
        <section>
          Convert {lowerName} from
          <UnitList select from /> to
          {ready && <SwapButton />}
          <UnitList select />
        </section>
        {
          ready &&
          <input type="number" value={input} onInput={e => setInput(e.currentTarget.valueAsNumber || 0)} />
        }
        {
          !!(!incomplete && fromObj && toObj) &&
          <div className={scss.result}>
            <span>{input} <Unit unit={fromObj} /> = </span><span>{result} <Unit unit={toObj} /></span>
          </div>
        }
      </section>
      <section className={scss.sidebar}>
        {fromObj && <article>
          <h3>{fromObj.name}</h3>
          {fromObj.text}
        </article>}
        {toObj && <article>
          <h3>{toObj.name}</h3>
          {toObj.text}
        </article>}
      </section>
      {toObj && <section className={clsx(scss.linkList, scss.from)}>
        <h4>Convert other {lowerName} units to {toObj.name}:</h4>
        <UnitList from />
      </section>}
      {fromObj && <section className={clsx(scss.linkList, scss.to)}>
        <h4>Convert {fromObj.name} to other {lowerName} units:</h4>
        <UnitList />
      </section>}
    </>);
  }
}