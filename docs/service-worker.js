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
    "revision": "e4382f3e5accd4c62e999135e7e157d7"
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
    "url": "assets/js/10.610b9671.js",
    "revision": "beea7dd20b1c16d84a05673b75fb5abe"
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
    "url": "assets/js/4.4b186996.js",
    "revision": "017b927e39cbc5f5b7f54c5c4a94dd58"
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
    "url": "assets/js/app.50bcb63c.js",
    "revision": "463deb2fff5b916c633a09519ec72449"
  },
  {
    "url": "conventions/components.html",
    "revision": "ef137df7d8b83dfcddc8a48f0a659489"
  },
  {
    "url": "conventions/directives.html",
    "revision": "d70f636bc23e5f53c6512353f3d8302d"
  },
  {
    "url": "conventions/index.html",
    "revision": "12602a4f7f5aa7829a4f35de97f0d705"
  },
  {
    "url": "conventions/mixins.html",
    "revision": "daeebaed2f3d738ebf3123068c4cf83e"
  },
  {
    "url": "conventions/routes.html",
    "revision": "22b3d36a35fa98abe1c32ea983566fe3"
  },
  {
    "url": "conventions/views.html",
    "revision": "2e4271dbdb906fd5bc4575f8503067eb"
  },
  {
    "url": "index.html",
    "revision": "a17122e5e605a010f40b000a6c2853a5"
  },
  {
    "url": "installation.html",
    "revision": "9d9ff5810800b742053cdfbf71bcaaf4"
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
