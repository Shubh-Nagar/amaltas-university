import React, { useEffect, useRef } from "react";
import EnquiryWidget from "./EnquiryWidget.jsx";

export default function AdmissionPopup() {
  const btnRef = useRef(null);

  useEffect(() => {
    // 1500 ms gives the dynamically loaded NPF script time to parse and init
    const t = setTimeout(() => {
      btnRef.current?.click();
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return <EnquiryWidget ref={btnRef} style={{ display: "none" }} />;
}
