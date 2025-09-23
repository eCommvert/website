"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function GTMScript() {
  const [gtmContainer, setGtmContainer] = useState<string>("");

  useEffect(() => {
    // Load GTM container ID from settings
    const loadGTMSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          const containerId = data.settings?.gtmContainer;
          if (containerId && containerId.trim()) {
            setGtmContainer(containerId.trim());
          }
        }
      } catch (error) {
        console.error("Failed to load GTM settings:", error);
      }
    };

    loadGTMSettings();
  }, []);

  if (!gtmContainer) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmContainer}');
          `,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmContainer}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

export function GTMNoScript({ containerId }: { containerId: string }) {
  if (!containerId) return null;
  
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
