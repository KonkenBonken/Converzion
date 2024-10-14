{
  function setConsent() {
    if (window.gtag)
      gtag("consent", "default", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    else setTimeout(setConsent);
  }

  setConsent();
}
