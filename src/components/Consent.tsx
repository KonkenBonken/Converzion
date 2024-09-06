"use client";

import { consent, GoogleAnalytics } from "nextjs-google-analytics";

export default function Consent() {
  if (typeof window !== 'undefined') consent({
    arg: 'update',
    params: {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    }
  });


  return <>
    <GoogleAnalytics gaMeasurementId="G-E9SW9RXXSE" />
    <meta name="google-adsense-account" content="ca-pub-2422033382456580" />
  </>;
}