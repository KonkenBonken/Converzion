"use client";
import { useState } from "react";
import type { pages } from './page';

export default function Trig({ name }: { name: keyof typeof pages }) {
  const func = Math[name];

  const [input, setInput] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState<'deg' | 'rad'>('deg');

  const unitSuffix = unit === 'deg' ? '°' : 'rad'

  return (
    <main>
      <h2>{name} calculator</h2>
      <input type="number" value={input} onInput={e => setInput(e.currentTarget.valueAsNumber)} />
      <select value={unit} onInput={e => setUnit(e.currentTarget.value as 'deg')}>
        <option value="deg">Degrees</option>
        <option value="rad">Radians</option>
      </select>
      {input !== undefined && <div>
        <span>{name}({input}{unitSuffix}) = </span><span>{func(input)}</span>
      </div>}
    </main>
  );
}