"use client";

import { useEffect } from "react";

export default function BrowserGuard() {
  useEffect(() => {
    const checkBrowser = async () => {
      const ua = navigator.userAgent;
      const vendor = navigator.vendor;

      // basic chrome checks
      const isChromeUA = /Chrome/.test(ua);
      const isGoogleVendor = vendor === "Google Inc.";

      // block known browsers
      const isEdge = /Edg/.test(ua);
      const isOpera = /OPR/.test(ua);
      const isUC = /UCBrowser/.test(ua);

      // detect Brave
      const isBrave =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).brave && (await (navigator as any).brave.isBrave());

      // detect WebView (Android / in-app browsers)
      const isWebView = /wv/.test(ua) || /Android.*Version\/[\d.]+/.test(ua);

      // check chromium object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasChromeObject = !!(window as any).chrome;

      const isRealChrome =
        isChromeUA &&
        isGoogleVendor &&
        hasChromeObject &&
        !isEdge &&
        !isOpera &&
        !isUC &&
        !isBrave &&
        !isWebView;

      if (!isRealChrome) {
        document.body.innerHTML = `
          <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-size:20px;
            flex-direction:column;
            text-align:center;
            padding:20px;
            font-family:sans-serif;
          ">
            <p>❌ موقعنا يعمل فقط على متصفح جوجل كروم الرسمي</p>
            <p>This website only works on official Google Chrome.</p>
          </div>
        `;
      }
    };

    checkBrowser();
  }, []);

  return null;
}
