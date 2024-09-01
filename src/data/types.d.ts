declare module '*.csv' {
  declare const csv: string
  export default csv
}

type Units = Record<string, {
  name: string
  unit: string
  toRoot: number
  text: string,
  TextWithLinks(units: Units): string[]
}>