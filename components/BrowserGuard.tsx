"use client";

import { useEffect } from "react";

export default function BrowserGuard() {
  useEffect(() => {
    const checkBrowser = async () => {
      const userAgent = navigator.userAgent;
      const vendor = navigator.vendor;

      const isChromium = /Chrome/.test(userAgent);
      const isGoogleVendor = /Google Inc/.test(vendor);

      const isEdge = /Edg/.test(userAgent);
      const isOpera = /OPR/.test(userAgent);

      const isBrave =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).brave && (await (navigator as any).brave.isBrave());

      const isRealChrome =
        isChromium && isGoogleVendor && !isEdge && !isOpera && !isBrave;

      if (!isRealChrome) {
        document.body.innerHTML = `
          <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-size:20px;flex-direction:column;text-align:center;padding:20px;">
            <p>موقعنا يعمل فقط على متصفح جوجل كروم</p>
            <p>This website only works on Google Chrome.</p>
          </div>
        `;
      }
    };

    checkBrowser();
  }, []);

  return null;
}
