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
    "revision": "e72ef239ccc245317def09ddb631f633"
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
    "url": "assets/js/5.00e5463d.js",
    "revision": "5fd88bec618eba7a3709fa93f45ee503"
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
    "url": "assets/js/9.a44ae208.js",
    "revision": "79ac663ae308bc8584944042733a54e9"
  },
  {
    "url": "assets/js/app.5658a3d5.js",
    "revision": "8b1185058d6ee3da007bea7dd7b364f7"
  },
  {
    "url": "conventions/components.html",
    "revision": "1b554bb17646aa05ea233a784348c195"
  },
  {
    "url": "conventions/directives.html",
    "revision": "f11a3fda39bcf005ec095fbf94dc7f39"
  },
  {
    "url": "conventions/index.html",
    "revision": "354d7631b6eed1af6dcb818033ac14b3"
  },
  {
    "url": "conventions/mixins.html",
    "revision": "9352ee0416f38531bd679823399086db"
  },
  {
    "url": "conventions/routes.html",
    "revision": "7d9bbc459bbd06a3d344386173673ed3"
  },
  {
    "url": "conventions/views.html",
    "revision": "ba2af3996aa6b8f96c982d86f53f5588"
  },
  {
    "url": "index.html",
    "revision": "4351b9f6576a1c631e195caa5f25e2d6"
  },
  {
    "url": "installation.html",
    "revision": "612ffb946d3cccf0595aae94b01a0e33"
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
