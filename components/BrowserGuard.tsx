"use client";

import { useEffect } from "react";

export default function BrowserGuard() {
  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isChrome =
      /Chrome/.test(userAgent) &&
      /Google Inc/.test(navigator.vendor) &&
      !/Edg/.test(userAgent);

    if (!isChrome) {
      document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-size:20px;flex-direction:column;">
<p>        موقعنا يعمل فقط على متصفح  جوجل كروم</p>
<p>     This website only works on Google Chrome.</p>

        

        </div>
      `;
    }
  }, []);

  return null;
}
