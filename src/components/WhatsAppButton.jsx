import React, { useState } from "react";

export default function WhatsAppButton() {
  const phone = "919373055458";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          background: "white",
          color: "#333",
          padding: "8px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(10px)",
          transition: "all 0.3s ease",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Need Help? 💬
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${phone}?text=Hello%20I%20want%20admission%20details`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
      >
        {/* WhatsApp SVG (REAL ICON) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
        >
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L.3 31.7l8-2.1c2.3 1.3 4.9 2 7.6 2 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.6c-2.4 0-4.8-.6-6.9-1.9l-.5-.3-4.8 1.3 1.3-4.7-.3-.5C3.6 20.8 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 13-13 13zm7.3-9.7c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.5-.2-.7.2s-.8 1.2-1 1.4c-.2.2-.3.3-.7.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.8-1-2.4c-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.9 1.3 3.4 1.5 3.6c.2.2 2.6 4 6.3 5.5.9.4 1.6.6 2.2.7.9.1 1.7.1 2.3.1.7 0 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5z" />
        </svg>
      </a>
    </div>
  );
}