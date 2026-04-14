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

      // --- Chromium-based browsers ---
      const isEdge = /Edg\//.test(ua);
      const isOpera = /OPR\//.test(ua) || /Opera/.test(ua);
      const isUC =
        /UCBrowser/.test(ua) ||
        /UCPC\//.test(ua) ||
        /UCWeb/.test(ua) ||
        /UC Browser/.test(ua);
      const isSamsungBrowser = /SamsungBrowser/.test(ua);
      const isYandex = /YaBrowser/.test(ua);
      const isCocCoc = /coc_coc_browser/i.test(ua);
      const isVivaldi = /Vivaldi/.test(ua);
      const isBraveBrand = /Brave/.test(ua);
      const isWhaleBrowser = /Whale/.test(ua);
      const isDuckDuckGo = /DuckDuckGo/.test(ua);
      const isArc = /Arc\//.test(ua);
      const isThornbird = /Thornbird/.test(ua);
      const isSleipnir = /Sleipnir/.test(ua);
      const isAvast = /Avast\//.test(ua) || /AVG\//.test(ua);
      const is360Browser =
        /QIHU/.test(ua) || /360Browser/.test(ua) || /360SE/.test(ua);
      const isBaidu = /BIDUBrowser/.test(ua) || /baiduboxapp/i.test(ua);
      const isQQ = /QQBrowser/.test(ua) || /MQQBrowser/.test(ua);
      const isSogou = /SogouMobileBrowser/.test(ua) || /MetaSr/.test(ua);
      const isMaxthon = /Maxthon/.test(ua) || /MxBrowser/.test(ua);
      const isMiuiBrowser =
        /MiuiBrowser/.test(ua) ||
        /XiaoMi/.test(ua) ||
        /MiBrowser/.test(ua) ||
        /miui\/browser/i.test(ua) ||
        /com\.mi\.globalbrowser/i.test(ua) ||
        /com\.miui\.mihome2/i.test(ua);
      const isHuaweiBrowser = /HuaweiBrowser/.test(ua);
      const isOppoBrowser = /OPPO/.test(ua) || /HeyTapBrowser/.test(ua);
      const isVivoBrowser = /VivoBrowser/.test(ua);
      const isOnePlus = /OnePlus/.test(ua);
      const isSzBrowser = /SZBrowser/.test(ua);
      const isMZBrowser = /MZBrowser/.test(ua);
      const isIridium = /Iridium\//.test(ua);
      const isEpic = /Epic\//.test(ua);
      const isCentBrowser = /CentBrowser/.test(ua);
      const isGreenBrowser = /GreenBrowser/.test(ua);
      const isSlimjet = /Slimjet/.test(ua);
      const isTorch = /Torch\//.test(ua);
      const isComodo = /Comodo/.test(ua) || /Dragon\//.test(ua);
      const isSRWare = /Iron\//.test(ua);
      const isCoolNovo = /CoolNovo/.test(ua);
      const isRockMelt = /RockMelt/.test(ua);
      const isFlock = /Flock\//.test(ua);

      // --- GoLogin / Orbita antidetect browser ---
      const isOrbita =
        // Check userAgentData brands for "Orbita" or "GoLogin" identifier
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (typeof (navigator as any).userAgentData !== "undefined" &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Array.isArray((navigator as any).userAgentData?.brands) &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (navigator as any).userAgentData.brands.some(
            (b: { brand: string }) =>
              /orbita/i.test(b.brand) || /gologin/i.test(b.brand),
          )) ||
        // Check for GoLogin-injected globals
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(window as any).gologin ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(window as any).__gologin__ ||
        // UA string fallback (some older versions leaked this)
        /Orbita\//.test(ua) ||
        /GoLogin/.test(ua);

      // --- Non-Chromium browsers ---
      const isFirefox =
        /Firefox\//.test(ua) || /FxiOS/.test(ua) || /Fennec/.test(ua);
      const isSafari =
        /Safari\//.test(ua) && /Apple Computer/.test(vendor) && !isChromeUA;
      const isIE = /Trident\//.test(ua) || /MSIE/.test(ua);
      const isSeaMonkey = /SeaMonkey\//.test(ua);
      const isPaleMoon = /PaleMoon\//.test(ua);
      const isWaterfox = /Waterfox\//.test(ua);
      const isTor = /TorBrowser/.test(ua) || /Tor\//.test(ua);
      const isBasalt = /Basilisk\//.test(ua);
      const isIceCat = /IceCat\//.test(ua);
      const isIceWeasel = /Iceweasel\//.test(ua);
      const isGecko =
        /Gecko\//.test(ua) && !/Chrome/.test(ua) && !/Safari/.test(ua);
      const isNetscape = /Netscape\//.test(ua);
      const isKonqueror = /Konqueror/.test(ua);
      const isLynx = /Lynx\//.test(ua);
      const isLinks = /Links \(/.test(ua);
      const isW3m = /w3m\//.test(ua);
      const isElinks = /ELinks\//.test(ua);
      const isLibreWolf = /LibreWolf\//.test(ua);
      const isGnomeWeb = /Epiphany\//.test(ua);
      const isMidori = /Midori\//.test(ua);
      const isQuteBrowser = /qutebrowser/.test(ua);
      const isDillo = /Dillo\//.test(ua);
      const isNetSurf = /NetSurf\//.test(ua);
      const isK_Meleon = /K-Meleon\//.test(ua);
      const isLunascape = /Lunascape/.test(ua);
      const isFalkon = /Falkon\//.test(ua);
      const isOtter = /Otter\//.test(ua);

      // --- Brave via API ---
      const isBrave =
        isBraveBrand ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((navigator as any).brave &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (await (navigator as any).brave.isBrave()));

      // --- In-app / WebView browsers ---
      const isWebView =
        /wv/.test(ua) ||
        /Android.*Version\/[\d.]+/.test(ua) ||
        /FB_IAB/.test(ua) ||
        /FBAN/.test(ua) ||
        /FBAV/.test(ua) ||
        /Instagram/.test(ua) ||
        /Twitter/.test(ua) ||
        /Line\//.test(ua) ||
        /KAKAOTALK/.test(ua) ||
        /Snapchat/.test(ua) ||
        /Pinterest/.test(ua) ||
        /TikTok/.test(ua) ||
        /WhatsApp/.test(ua) ||
        /Telegram/.test(ua) ||
        /WeChat/.test(ua) ||
        /MicroMessenger/.test(ua) ||
        /LinkedInApp/.test(ua) ||
        /GSA\//.test(ua) ||
        /DomainApp/.test(ua) ||
        /Musical_ly/.test(ua) ||
        /YahooMobile/.test(ua) ||
        /Mail\//.test(ua) ||
        /Outlook/.test(ua) ||
        /com\.apple\.mobilenotes/.test(ua);

      // check chrome object exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasChromeObject = !!(window as any).chrome;

      const isRealChrome =
        // Original Chrome check
        (isChromeUA &&
          isGoogleVendor &&
          hasChromeObject &&
          !isEdge &&
          !isOpera &&
          !isUC &&
          !isSamsungBrowser &&
          !isYandex &&
          !isCocCoc &&
          !isVivaldi &&
          !isBrave &&
          !isWhaleBrowser &&
          !isDuckDuckGo &&
          !isArc &&
          !isThornbird &&
          !isSleipnir &&
          !isAvast &&
          !is360Browser &&
          !isBaidu &&
          !isQQ &&
          !isSogou &&
          !isMaxthon &&
          !isMiuiBrowser &&
          !isHuaweiBrowser &&
          !isOppoBrowser &&
          !isVivoBrowser &&
          !isOnePlus &&
          !isSzBrowser &&
          !isMZBrowser &&
          !isIridium &&
          !isEpic &&
          !isCentBrowser &&
          !isGreenBrowser &&
          !isSlimjet &&
          !isTorch &&
          !isComodo &&
          !isSRWare &&
          !isCoolNovo &&
          !isRockMelt &&
          !isFlock &&
          !isOrbita &&
          !isFirefox &&
          !isSafari &&
          !isIE &&
          !isSeaMonkey &&
          !isPaleMoon &&
          !isWaterfox &&
          !isTor &&
          !isBasalt &&
          !isIceCat &&
          !isIceWeasel &&
          !isGecko &&
          !isNetscape &&
          !isKonqueror &&
          !isLynx &&
          !isLinks &&
          !isW3m &&
          !isElinks &&
          !isLibreWolf &&
          !isGnomeWeb &&
          !isMidori &&
          !isQuteBrowser &&
          !isDillo &&
          !isNetSurf &&
          !isK_Meleon &&
          !isLunascape &&
          !isFalkon &&
          !isOtter &&
          !isWebView) ||
        isSafari;

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
       
          </div>
        `;
      }
    };

    checkBrowser();
  }, []);

  return null;
}
