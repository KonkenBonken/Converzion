"use client";
import { useState } from "react";
import units from '@/src/data/distance'
import { LinkSelect, LinkList } from '@/components/LinkSelect';
import { usePathname } from "next/navigation";
import scss from './distance.module.scss';
import hasch from "hasch";

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

  return (<>
    <h2>Distance unit converter</h2>
    <div className={scss.subHeader}>Convert distance from <UnitList select from /> to <UnitList select /></div>
    {
      !!(!incomplete && fromObj && toObj) &&
      <input type="number" value={input} onInput={e => setInput(e.currentTarget.valueAsNumber || 0)} />
    }
    {
      !!(!incomplete && input && fromObj && toObj) &&
      <div>
        <span>{input} <Unit unit={fromObj} /> = </span><span>{result} <Unit unit={toObj} /></span>
      </div>
    }
    <div className={scss.text}>{fromObj.text}</div>
    <div className={scss.text}>{toObj.text}</div>
    <div>
      <h4>Convert {fromObj.name} to other units:</h4>
      <UnitList />
    </div>
    <div>
      <h4>Convert {toObj.name} to other units:</h4>
      <UnitList from />
    </div>
  </>);
}