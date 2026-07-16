import React, { useEffect } from "react";

const NPFWidget = () => {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (!document.querySelector('script[src="https://widgets.in4.nopaperforms.com/emwgts.js"]')) {
      const script = document.createElement("script");
      script.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    } else {
      // If script already exists, reinitialize the widget
      if (window.initializeNpfWidgets) {
        window.initializeNpfWidgets();
      }
    }
  }, []);

  return (
    <div
      className="npf_wgts"
      data-height="400px"
      data-w="b9e07b3b3898e1f019ca0c25a842d922"
    ></div>
  );
};

export default NPFWidget;