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
      TextWithLinks(units: Units) {
        let text = (data.text as string).split('|');
        if (text.length === 1)
          return data.text;

        console.log(text)

        const res: (string | JSX.Element)[] = [];

        function parse(str: string) {
          str = str.replace(/[\s,]/g, '');

          if (str.includes('/')) {
            const [t, n] = str.split('/');
            return parseFloat(t) / parseFloat(n);
          }
          return parseFloat(str);
        }

        for (let i = 0; i < text.length; i++) {
          if (i % 2 === 0) {
            res.push(text[i])
            continue;
          }

          console.log(text[i])

          const lastWord = text[i].split(' ').at(-1);

          if (!lastWord) {
            res.push(text[i])
            continue;
          }


          const unitObj = Object.values(units).find(obj => {
            console.log([obj.name, obj.name + 's', obj.unit], (lastWord))

            return [obj.name, obj.name + 's', obj.unit].map(w => w.toLowerCase()).includes(lastWord.toLowerCase())
          })

          if (!unitObj) {
            res.push(text[i])
            continue;
          }

          res.push(<a key={i} href={`/units/length/${unit}/${unitObj.unit}`}>{text[i]}</a>);
        }

        return res;
      }
    }]
  }
})) as Units;
