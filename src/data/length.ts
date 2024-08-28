import { parse } from 'csv-parse/sync';
import lengthData from './length.csv'
import { capitalize } from '@/src/utils';

export default Object.fromEntries(parse(lengthData, {
  columns: true,
  on_record(data) {
    const unit = data.unit || data.name.toLowerCase();
    return [unit, {
      name: capitalize(data.name.toLowerCase()),
      unit,
      toRoot: parseFloat(data.toRoot),
      text: data.text,
    }]
  }
})) as Record<string, {
  name: string
  unit: string
  toRoot: number
  text: string
}>
