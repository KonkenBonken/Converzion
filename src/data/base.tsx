import { parse } from 'csv-parse/sync';
import baseData from './base.csv';
import Markdown from 'react-markdown';

export default Object.fromEntries(parse(baseData, {
  columns: true,
  on_record(data) {
    const rowBase = +data.base;

    let text = (data.text as string).split('|');

    for (let i = 0; i < text.length; i++) {
      if (i % 2 === 0)
        continue;

      let base;

      if (/base\s\d+/.test(text[i]))
        base = text[i].substring(5);
      else
        base = {
          binary: 2,
          decimal: 10,
          hexadecimal: 16
        }[text[i]];

      if (base)
        text[i] = `[${text[i]}](/base/${rowBase}/${base})`;
    }

    const markdown = text.join('').replaceAll('\\n', '\n');

    return [rowBase, () => <Markdown components={{ h2: 'h4', h3: 'h5' }}>{markdown}</Markdown>];
  }
})) as Record<number, () => JSX.Element>;
