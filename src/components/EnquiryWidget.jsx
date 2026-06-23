import React, { useEffect, useRef, forwardRef } from "react";

const WIDGET_ID = "b9e07b3b3898e1f019ca0c25a842d922";

function initWidget() {
  if (window.NpfWidgetsInit) {
    new window.NpfWidgetsInit({
      widgetId: WIDGET_ID,
      baseurl: "widgets.in4.nopaperforms.com",
      formTitle: "Enquiry Form",
      titleColor: "#FF0033",
      backgroundColor: "#ddd",
      iframeHeight: "500px",
      buttonbgColor: "#4c79dc",
      buttonTextColor: "#FFF",
    });
  }
}

const EnquiryWidget = forwardRef(function EnquiryWidget({ style, className }, ref) {
  useEffect(() => {
    // Guard: only load the script once per page
    if (document.querySelector('script[src*="npfwpopup"]')) {
      // Script already present — widget may already be running; just ensure init
      initWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://in4cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);

    return () => {
      // Leave the script in the DOM — removing it breaks already-open popups
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`npfWidgetButton npfWidget-${WIDGET_ID}${className ? ` ${className}` : ""}`}
      style={style}
    >
      Enquire Now!
    </button>
  );
});

export default EnquiryWidget;
