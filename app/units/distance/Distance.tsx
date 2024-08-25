"use client";
import { useState } from "react";
import { units } from './[from]/[to]/page';
import LinkSelect from '@/components/LinkSelect';
import { usePathname } from "next/navigation";
import scss from './distance.module.scss';

function Unit({ unit }: { unit: typeof units[string] }) {
  return <abbr title={unit.name}>{unit.unit}</abbr>
}

function UnitSelect({ from }: { from?: true }) {
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

  return <LinkSelect links={
    Object.values(units).map(unit => ({
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
    <div className={scss.subHeader}>Convert distance from <UnitSelect from /> to <UnitSelect /></div>
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
  </>);
}