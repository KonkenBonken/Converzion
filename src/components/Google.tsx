"use client";

import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { GoogleAdSense } from "nextjs-google-adsense";

export default function Consent() {
  return <Head>
    <GoogleAnalytics gaMeasurementId="G-E9SW9RXXSE" />
    <GoogleAdSense publisherId="ca-pub-2422033382456580" />
    <meta name="google-adsense-account" content="ca-pub-2422033382456580" />
  </Head>;
}