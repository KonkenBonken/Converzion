"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkList } from '@/src/components/LinkSelect';
import { usePathname } from "../clientUtils";
import scss from '@/app/main.module.scss';
import choose from "hasch/choose";
import hasch from "hasch/decimal";
import SwapButton from "@/src/components/Swap";

export default function UnitPage(
  units: Units,
  name: string
) {
  const lowerName = name.toLowerCase();

  function Unit({ unit }: { unit: typeof units[string] }) {
    return <abbr title={unit.name}>{unit.unit}</abbr>
  }

  function UnitList({ from, both, length = 15 }: { from?: true, both?: true, length?: number }) {
    const current = usePathname().split('/');

    const href = (unit: typeof units[string], other?: string) => {
      current[3] ||= '-';
      current[4] ||= '-';

      if (other) {
        current[3] = other;
        current[4] = other;
      }

      if (from)
        current[3] = unit.unit;
      else
        current[4] = unit.unit;

      return current.join('/');
    }

    return both ? <LinkList links={
      Object.values(units)
        .sort((a, b) => hasch([a.unit, current, from]) - hasch([b.unit, current, from]))
        .slice(0, length)
        .map(unit => {
          const other = choose([current, unit.unit, Math.floor((new Date).getDate() / 7)], Object.keys(units));
          return {
            href: href(unit, other),
            value: [`Convert ${other} to ${unit.name}`]
          }
        })
    } />
      : <LinkList links={
        Object.values(units)
          .sort((a, b) => hasch([a.unit, current, from]) - hasch([b.unit, current, from]))
          .slice(0, length)
          .map(unit => ({
            href: href(unit),
            value: [unit.name, unit.unit]
          }))
      } />
  }

  return function Page({ params: { from, to }, searchParams: { n = '1' } }: { params: { from?: string, to?: string }, searchParams: { n: string } }) {
    from = decodeURI(from ?? '');
    to = decodeURI(to ?? '');

    const fromObj: typeof units[string] | undefined = units[from];
    const toObj: typeof units[string] | undefined = units[to];

    const defaultValue = parseFloat(n) || 1;
    const incomplete = from === '-' || to === '-';

    const [input, setInput] = useState(defaultValue);
    const result = (input && fromObj && toObj) && +(input / fromObj.toRoot * toObj.toRoot).toPrecision(6);

    const ready = !!(!incomplete && fromObj && toObj);

    const router = useRouter();

    return (<>
      <section className={scss.mainSection}>
        <h2>{name} unit converter</h2>
        <section>
          Convert {lowerName} from
          <select onChange={e => router.push(`/units/length/${e.currentTarget.value}/${to}`)} defaultValue={from}>
            <option disabled>-</option>
            {Object.values(units).map(unit => (
              <option key={unit.unit} value={unit.unit}>{unit.name}</option>
            ))}
          </select>
          to
          {ready && <SwapButton />}
          <select onChange={e => router.push(`/units/length/${from}/${e.currentTarget.value}`)} defaultValue={to}>
            <option disabled>-</option>
            {Object.values(units).map(unit => (
              <option key={unit.unit} value={unit.unit}>{unit.name}</option>
            ))}
          </select>
        </section>
        {
          ready && <>
            <span>Input:</span>
            <input type="number" value={input} onInput={e => setInput(e.currentTarget.valueAsNumber || 0)} />
          </>
        }
        {
          !!(!incomplete && fromObj && toObj) &&
          <div className={scss.result}>
            <span>{input} <Unit unit={fromObj} /> = </span><span>{result} <Unit unit={toObj} /></span>
          </div>
        }
      </section>
      <section className={scss.linkList}>
        {toObj && <section className={scss.from}>
          <h4>Convert other {lowerName} units to {toObj.name}:</h4>
          <UnitList from />
        </section>}
        {fromObj && <section className={scss.to}>
          <h4>Convert {fromObj.name} to other {lowerName} units:</h4>
          <UnitList />
        </section>}
        {!toObj && !fromObj && <section className={scss.both}>
          <h4>Convert between these popular {lowerName} units:</h4>
          <UnitList both length={25} />
        </section>}
      </section>
      <section className={scss.sidebar}>
        {fromObj && <article>
          <h3>{fromObj.name}</h3>
          {fromObj.TextWithLinks(units)}
        </article>}
        {toObj && <article>
          <h3>{toObj.name}</h3>
          {toObj.TextWithLinks(units)}
        </article>}
      </section>
    </>);
  }
}