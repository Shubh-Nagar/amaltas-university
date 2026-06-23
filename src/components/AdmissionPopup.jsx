import React, { useEffect, useRef } from "react";

/**
 * Renders a hidden NPF widget button and auto-clicks it after 700 ms so the
 * NoPaperForms enquiry popup (initialised in index.html) opens on page load.
 * The NPF script uses document-level event delegation, so dynamically rendered
 * buttons with the correct class are picked up without any extra wiring.
 */
export default function AdmissionPopup() {
  const btnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      btnRef.current?.click();
    }, 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      className="npfWidgetButton npfWidget-b9e07b3b3898e1f019ca0c25a842d922"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
}
