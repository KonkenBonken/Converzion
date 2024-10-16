import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import Script from "next/script";

import Google from "@/src/components/Google";
import NavLinkList from '@/src/page/paths'

import scss from './main.module.scss';
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Utilz.eu",
    template: '%s | Utilz.eu'
  },
  applicationName: 'Utilz.eu',
  description: 'Free Utilities Online',
  openGraph: {
    title: 'Utilz.eu',
    description: 'Free Utilities Online',
    url: 'https://utilz.eu',
    siteName: 'Utilz.eu',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Script src="/consent.js" strategy="beforeInteractive" />
      <Google />
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
