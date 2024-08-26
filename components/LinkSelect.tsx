"use client";

import Link from 'next/link';
import scss from './LinkSelect.module.scss';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const UnitText = (value?: [string, string?]) => value ? value.map(text => (<span key={text}>{text}</span>)) : <span>Click here</span>;

export function LinkList({ links, select }: { links: { href: string, value: [string, string?] }[], select?: true }) {
  return <ul className={clsx(scss.linkList, !select && scss.list)}>
    {links.map(({ href, value }) => (
      <li key={value.join()}>
        <Link href={href}>{UnitText(value)}</Link>
      </li>
    ))}
  </ul>;
}

export function LinkSelect({ links }: { links: { href: string, value: [string, string?] }[] }) {
  const path = usePathname();

  return <div className={scss.linkSelect} tabIndex={0}>
    <span className={scss.current}>{UnitText(links.find(({ href }) => href === path)?.value)}</span>
    <span className={scss.arrow}>▼</span>
    <LinkList links={links} select />
  </div>
}