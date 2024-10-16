"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Consent() {
  return <>
    <GoogleAnalytics gaMeasurementId="G-E9SW9RXXSE" />
    <script async crossOrigin="anonymous"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2422033382456580" />
    <meta name="google-adsense-account" content="ca-pub-2422033382456580" />
  </>;
}
