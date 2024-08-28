import type { Metadata } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";

import scss from './main.module.scss';
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Converzion"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, scss.body)}>
        <header className={scss.header}>
          <h1>Converzion</h1>
          <h2>Math tools online</h2>
        </header>
        <section className={scss.navbar}>
          <ul>
            <li>
              <a href="/trigonometry">Trigonometry</a>
              <ul>
                <li>
                  <a href="/trigonometry/sin">Sine</a>
                </li>
                <li>
                  <a href="/trigonometry/cos">Cosine</a>
                </li>
                <li>
                  <a href="/trigonometry/tan">Tangent</a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/units/length">Length Unit Converter</a>
            </li>
            <li>
              <a href="/units/mass">Mass Unit Converter</a>
            </li>
          </ul>
        </section>
        <main className={scss.main}>
          {children}
        </main>
      </body>
    </html>
  );
}
