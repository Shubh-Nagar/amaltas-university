import React, { useRef, forwardRef } from "react";

const WIDGET_ID = "b9e07b3b3898e1f019ca0c25a842d922";

const EnquiryWidget = forwardRef(function EnquiryWidget({ style, className }, ref) {
  const btnRef = ref || useRef(null);

  function handleClick(e) {
    // If NPF is already initialised, let the native click propagate — NPF handles it.
    if (window._npfReady) return;

    // First click: prevent NPF from firing before it's ready, load the script.
    e.stopPropagation();

    if (document.querySelector('script[src*="npfwpopup"]')) {
      // Script tag exists but widget not ready yet — wait and retry.
      const poll = setInterval(() => {
        if (window._npfReady) {
          clearInterval(poll);
          btnRef.current?.click();
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://in4cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;
    script.onload = () => {
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
        window._npfReady = true;
        // Trigger the popup now that the widget is ready
        btnRef.current?.click();
      }
    };
    document.body.appendChild(script);
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={`npfWidgetButton npfWidget-${WIDGET_ID}${className ? ` ${className}` : ""}`}
      style={style}
      onClick={handleClick}
    >
      Enquire Now!
    </button>
  );
});

export default EnquiryWidget;
