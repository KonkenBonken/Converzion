import { parse } from 'csv-parse/sync';
import distanceData from './distance.csv'
import { capitalize } from '@/src/utils';


export default Object.fromEntries(parse(distanceData, {
  columns: true,
  on_record(data) {
    const unit = data.unit || data.name.toLowerCase();
    return [unit, {
      name: capitalize(data.name.toLowerCase()),
      unit,
      toM: parseFloat(data.toM),
      text: data.text,
    }]
  }
})) as Record<string, {
  name: string
  unit: string
  toM: number
  text: string
}>
