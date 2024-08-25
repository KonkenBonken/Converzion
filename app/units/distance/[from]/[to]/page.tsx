import { capitalize } from '@/src/utils';
import Distance from '../../Distance';

export const units = Object.fromEntries(([
  ['KiloMeter', 1e-3],
  ['Meter', 1],
  ['DeciMeter', 10],
  ['CentiMeter', 1e2],
  ['MilliMeter', 1e3],
  ['MIle', 6.21371192e-4],
  ['YarD', 1.0936133],
  ['FooT', 3.2808399],
  ['INch', 39.3700788],
  ['Light-Year', 1.05702341e-16],
  ['Astronomical Unit', 6.68458712e-12]
] as const).map(([name, toM]) => [unitSuffix(name), {
  name: capitalize(name),
  unit: unitSuffix(name),
  toM
}]));

function unitSuffix(unit: string) {
  return unit.replace(/[^A-Z]/g, '').toLowerCase();
}

export default function Page({ params: { from, to } }: { params: { from: string, to: string } }) {
  return <Distance from={from} to={to} />
}
