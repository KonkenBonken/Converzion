import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";

import Consent from "@/src/components/Consent";
import NavLinkList from '@/src/page/paths'

import scss from './main.module.scss';
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Utilz.eu"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Consent />
      <body className={clsx(inter.className, scss.body)}>
        <header className={scss.header}>
          <h1>Utilz.eu</h1>
          <h2>Free Utilities Online</h2>
        </header>
        <section className={scss.navbar}>
          <NavLinkList />
        </section>
        <main className={scss.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
