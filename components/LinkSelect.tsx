"use client";

import Link from 'next/link';
import scss from './LinkSelect.module.scss';
import { usePathname } from 'next/navigation';

export default function LinkSelect({ links }: { links: { href: string, value: [string, string?] }[] }) {
  const path = usePathname();

  const UnitText = (value?: [string, string?]) => value ? value.map(text => (<span key={text}>{text}</span>)) : <span>Click here</span>;

  return <div className={scss.linkSelect} tabIndex={0}>
    <span className={scss.current}>{UnitText(links.find(({ href }) => href === path)?.value)}</span>
    <span className={scss.arrow}>▼</span>
    <ul>
      {links.map(({ href, value }) => (
        <li key={value.join()}>
          <Link href={href}>{UnitText(value)}</Link>
        </li>
      ))}
    </ul>
  </div>
}