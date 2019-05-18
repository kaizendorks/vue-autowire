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
    "revision": "a187604263e1d9dd07d7070416f9c3f2"
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
    "url": "assets/js/10.667c67d9.js",
    "revision": "687f95f7e5ad0f682dabd254ad7a297b"
  },
  {
    "url": "assets/js/11.7d447ced.js",
    "revision": "a5b13f92d1145ad037fc4670c5aaedab"
  },
  {
    "url": "assets/js/2.9809e03a.js",
    "revision": "ac3c07dd1687b332f8d66d63c115fd6c"
  },
  {
    "url": "assets/js/3.f0df66be.js",
    "revision": "f61a5fe51a8d3ace3a49fb1913e3d833"
  },
  {
    "url": "assets/js/4.0c51f0c4.js",
    "revision": "8359a4aca2926ea2035b505458d90128"
  },
  {
    "url": "assets/js/5.a52d3cc8.js",
    "revision": "379e7ea8630d78178a153a10fab48f11"
  },
  {
    "url": "assets/js/6.39384bed.js",
    "revision": "e9844d1af9d5adcb3f5a306ad67ae764"
  },
  {
    "url": "assets/js/7.1db1f2ca.js",
    "revision": "829d538fbe83873f070de625f9bac30e"
  },
  {
    "url": "assets/js/8.4e16e6ca.js",
    "revision": "df7fc88f44e0d868a9cc73ef9a685ea6"
  },
  {
    "url": "assets/js/9.69880954.js",
    "revision": "37129b0472e2153021241e95ae09313d"
  },
  {
    "url": "assets/js/app.34f7c533.js",
    "revision": "e9ac3127a7c91d0cdf1ae4205f4eb5ae"
  },
  {
    "url": "guide/index.html",
    "revision": "0fdb9c4d44454ed8c3a5252f55d249ca"
  },
  {
    "url": "guide/registering-components.html",
    "revision": "4055f79c97f2b359527aa8b6050ce7d3"
  },
  {
    "url": "guide/registering-directives.html",
    "revision": "6e7d05cf1890b8b15549ba8a22890b10"
  },
  {
    "url": "guide/registering-mixins.html",
    "revision": "2edbd6709d05fb398c39091ff4ee9fc9"
  },
  {
    "url": "guide/registering-routes.html",
    "revision": "e791aeab4ecd3376521fbda5d25592db"
  },
  {
    "url": "guide/registering-views.html",
    "revision": "f285ff5ec03f5562c9aa07a65a0b00bb"
  },
  {
    "url": "index.html",
    "revision": "445b2a5ac9431161fa5d3652d65a6cb3"
  },
  {
    "url": "installation.html",
    "revision": "791fcbf3392980c1d2765c9eba4e0534"
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
