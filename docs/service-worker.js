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
    "revision": "16f66504dea4833c075841c9b3d06f75"
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
    "url": "assets/js/3.08c0d6db.js",
    "revision": "8c53cd9276589166435daf709273bdba"
  },
  {
    "url": "assets/js/4.c0dd3eb7.js",
    "revision": "c2ce9a9bed2f7f0069a1d5aa08ba0ddb"
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
    "url": "assets/js/app.f7e28de3.js",
    "revision": "ede01344a20ce713df2b5b975e911cc8"
  },
  {
    "url": "guide/index.html",
    "revision": "266a4e79c827f0b0f347dbc02fa731ed"
  },
  {
    "url": "guide/registering-components.html",
    "revision": "7a99cf6ca9ffa327eea4c5e8bb3fbd89"
  },
  {
    "url": "guide/registering-directives.html",
    "revision": "e91e4aa047c0a74a8ae5845682ee69e8"
  },
  {
    "url": "guide/registering-mixins.html",
    "revision": "71521e63ba18625986d03ed65cef724c"
  },
  {
    "url": "guide/registering-routes.html",
    "revision": "422fbb7dc3e72f0259463bc63c7426ea"
  },
  {
    "url": "guide/registering-views.html",
    "revision": "92bbc22e345e088e2431e1fae5a6d9ed"
  },
  {
    "url": "index.html",
    "revision": "e5ee8db2cca9ba7763feee4608d1c19e"
  },
  {
    "url": "installation.html",
    "revision": "aa48a917c1357b1dbdaf3eb0e215bb89"
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
