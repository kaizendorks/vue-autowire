/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "8bdb9ff881c42734491777888ab80fb3"
  },
  {
    "url": "assets/css/0.styles.26b306d6.css",
    "revision": "425feb3f2ed28dd6a01605d64052b12f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.1f820d28.js",
    "revision": "fdb6a7813dd4288a857678ca0aa4d236"
  },
  {
    "url": "assets/js/11.8c0434a4.js",
    "revision": "8148495604a6f11be6c80b07f3f78606"
  },
  {
    "url": "assets/js/2.afc26b7e.js",
    "revision": "8f265611657e1a7af270952db67ef914"
  },
  {
    "url": "assets/js/3.d9556d6b.js",
    "revision": "504b700aeb480dedaca832db758b3592"
  },
  {
    "url": "assets/js/4.dde55361.js",
    "revision": "3ab20f387e0cd9ab4c8d4a7cba163ed2"
  },
  {
    "url": "assets/js/5.9893796f.js",
    "revision": "719446d2f6b9e5adf0618ae339724235"
  },
  {
    "url": "assets/js/6.5bcd68e7.js",
    "revision": "f0d1525ce712c001044c5d7155881b94"
  },
  {
    "url": "assets/js/7.3a36a519.js",
    "revision": "ac8242dc45676b458129cdc1cb083395"
  },
  {
    "url": "assets/js/8.faa0fff2.js",
    "revision": "b78c03fb9da6c2c8d6fedb77acce079e"
  },
  {
    "url": "assets/js/9.07bc468b.js",
    "revision": "e60265de5a735025e1755e5790489c89"
  },
  {
    "url": "assets/js/app.fd2eb941.js",
    "revision": "df38fb0ce463e8568e05673433673402"
  },
  {
    "url": "conventions/components.html",
    "revision": "775d443ce965ce38525db591eedf3de9"
  },
  {
    "url": "conventions/directives.html",
    "revision": "41bdb517b5426cf1388c83d70eb33af9"
  },
  {
    "url": "conventions/index.html",
    "revision": "090524de89207aef393cce71f126bead"
  },
  {
    "url": "conventions/mixins.html",
    "revision": "6078273122ad8acec4cb4b6bba29d51c"
  },
  {
    "url": "conventions/routes.html",
    "revision": "24d07463547249be19223a80e497dbcc"
  },
  {
    "url": "conventions/views.html",
    "revision": "efaafc65e477f5244c5b55a344d5b5e7"
  },
  {
    "url": "index.html",
    "revision": "518737a4a1bfcbf11eb26f76467f3b5c"
  },
  {
    "url": "installation.html",
    "revision": "704559832146523cda5832fc2ae0c71b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
