"use client";

import { consent, GoogleAnalytics } from "nextjs-google-analytics";
import { GoogleAdSense } from "nextjs-google-adsense";

import scss from './Google.module.scss';
import useLocalStorage from "use-local-storage";

export default function Consent() {
  return <>
    <GoogleAnalytics gaMeasurementId="G-E9SW9RXXSE" />
    <GoogleAdSense publisherId="ca-pub-2422033382456580" />
    <meta name="google-adsense-account" content="ca-pub-2422033382456580" />
  </>;
}

export function AcceptButton() {
  const [shown, setShown] = useLocalStorage('show-consent', true);

  if (!shown)
    return void consent({
      arg: 'update',
      params: {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      }
    });

  return <dialog className={scss.consent} ref={el => el?.showModal()}>
    <button onClick={() => setShown(false)}>
      Consent to Tracking, Personalisation and Cookies
    </button>
    <a href="/privacy-policy.html">Privacy Policy</a>
  </dialog >
}