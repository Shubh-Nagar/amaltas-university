import React, { useEffect } from "react";

const NPFWidget = () => {
  useEffect(() => {
    // emwgts.js scans the DOM for .npf_wgts elements once, when it executes —
    // it exposes no reinit API. So on every mount (e.g. navigating back to a
    // page with this widget) we drop any previous copy of the script and
    // re-append a fresh one to force it to re-scan and fill the new div.
    const existing = document.querySelector('script[src="https://widgets.in4.nopaperforms.com/emwgts.js"]');
    if (existing) existing.remove();

    // Third-party script: inject it only after our own page has loaded so it
    // doesn't compete with first paint (it was a large share of PageSpeed's
    // Total Blocking Time). The div below reserves its height, so no layout shift.
    const inject = () => {
      const script = document.createElement("script");
      script.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    };
    if (document.readyState === "complete") {
      inject();
      return;
    }
    window.addEventListener("load", inject, { once: true });
    return () => window.removeEventListener("load", inject);
  }, []);

  return (
    <div
      className="npf_wgts"
      style={{ minHeight: 400 }}
      data-height="400px"
      data-w="b9e07b3b3898e1f019ca0c25a842d922"
    ></div>
  );
};

export default NPFWidget;