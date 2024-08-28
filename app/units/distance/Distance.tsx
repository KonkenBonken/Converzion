"use client";
import { useState } from "react";
import units from '@/src/data/distance'
import { LinkSelect, LinkList } from '@/components/LinkSelect';
import { usePathname } from "next/navigation";
import scss from '@/app/main.module.scss';
import hasch from "hasch";
import clsx from "clsx";

function Unit({ unit }: { unit: typeof units[string] }) {
  return <abbr title={unit.name}>{unit.unit}</abbr>
}

function UnitList({ from, select }: { from?: true, select?: true }) {
  const current = usePathname().split('/');

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

export default function Distance({ from, to }: { from?: string, to?: string }) {
  const fromObj: typeof units[string] | undefined = units[from ?? ''];
  const toObj: typeof units[string] | undefined = units[to ?? ''];

  const incomplete = from === '-' || to === '-';

  const [input, setInput] = useState<number>(0);
  const result = (input && fromObj && toObj) && +(input / fromObj.toM * toObj.toM).toPrecision(6);

  const ready = !!(!incomplete && fromObj && toObj);

  return (<>
    <section className={scss.mainSection}>
      <h2>Distance unit converter</h2>
      <section>
        Convert distance from
        <UnitList select from /> to
        <UnitList select />
      </section>
      {
        ready &&
        <input type="number" value={input} onInput={e => setInput(e.currentTarget.valueAsNumber || 0)} />
      }
      {
        !!(!incomplete && input && fromObj && toObj) &&
        <div className={scss.result}>
          <span>{input} <Unit unit={fromObj} /> = </span><span>{result} <Unit unit={toObj} /></span>
        </div>
      }
    </section>
    <section className={scss.sidebar}>
      <article>
        <h3>{fromObj.name}</h3>
        {fromObj.text}
      </article>
      <article>
        <h3>{toObj.name}</h3>
        {toObj.text}
      </article>
    </section>
    <section className={clsx(scss.linkList, scss.to)}>
      <h4>Convert {fromObj.name} to other units:</h4>
      <UnitList />
    </section>
    <section className={clsx(scss.linkList, scss.from)}>
      <h4>Convert other units to {toObj.name}:</h4>
      <UnitList from />
    </section>
  </>);
}