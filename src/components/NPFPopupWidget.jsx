import React, { useEffect } from "react";

const NPFPopupWidget = () => {
  useEffect(() => {
    const scriptId = "npf-popup-script";

    const initializeWidget = () => {
      if (
        window.NpfWidgetsInit &&
        !window.npfPopupInitialized
      ) {
        new window.NpfWidgetsInit({
          widgetId: "b9e07b3b3898e1f019ca0c25a842d922",
          baseurl: "widgets.in4.nopaperforms.com",
          formTitle: "Enquiry Form",
          titleColor: "#FF0033",
          backgroundColor: "#ddd",
          iframeHeight: "500px",
          buttonbgColor: "#4c79dc",
          buttonTextColor: "#FFF",
        });

        window.npfPopupInitialized = true;
      }
    };

    // Load script only once
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://in4cdn.npfs.co/js/widget/npfwpopup.js";
      script.async = true;
      script.onload = initializeWidget;
      document.body.appendChild(script);
    } else {
      initializeWidget();
    }
  }, []);

  return (
    <button
      type="button"
      className="npfWidgetButton npfWidget-b9e07b3b3898e1f019ca0c25a842d922"
    >
      Enquire Now!
    </button>
  );
};

export default NPFPopupWidget;