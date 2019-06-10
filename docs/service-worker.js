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
    "revision": "37b6161b2fe8e49e8213605d692751e8"
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
    "url": "assets/js/10.dc69613f.js",
    "revision": "326379a99c7b6f8382f8c0669b4f52e8"
  },
  {
    "url": "assets/js/11.f52781e0.js",
    "revision": "3f97f9686fb59ef7fdf635820564b147"
  },
  {
    "url": "assets/js/12.8891b8b0.js",
    "revision": "86cf6906a36cb18dd59d162317f55373"
  },
  {
    "url": "assets/js/2.7cb6fb06.js",
    "revision": "4b8b85169ad2da77109277d164d09fd9"
  },
  {
    "url": "assets/js/3.d95baa2d.js",
    "revision": "fde34942235ecee41bc23783c05ac21c"
  },
  {
    "url": "assets/js/4.76140b71.js",
    "revision": "87a41ce98c71101b0bf31bc3554e7a89"
  },
  {
    "url": "assets/js/5.e5c28aab.js",
    "revision": "a6fb9b74aba056053d8688a2ca9c504f"
  },
  {
    "url": "assets/js/6.09e76def.js",
    "revision": "b850abbb60261cfa57b5be5da4b4bec6"
  },
  {
    "url": "assets/js/7.150fe643.js",
    "revision": "b3a1a8524305b05077742060f811e973"
  },
  {
    "url": "assets/js/8.12dd277c.js",
    "revision": "2a8b981f4030e45e1eec5bf316a3c576"
  },
  {
    "url": "assets/js/9.0f474c4f.js",
    "revision": "68faa0ca037074b1740fa3326a0d2fa5"
  },
  {
    "url": "assets/js/app.5854b008.js",
    "revision": "6e3804fe9985918d40f33880f4161816"
  },
  {
    "url": "conventions/components.html",
    "revision": "df69f9436438a4974419ecd82d967d3d"
  },
  {
    "url": "conventions/directives.html",
    "revision": "b663c669ae21ae4f6d34cf69763bb1ef"
  },
  {
    "url": "conventions/filters.html",
    "revision": "f9a5a3f1398109cd321adff6063d504b"
  },
  {
    "url": "conventions/index.html",
    "revision": "e3f4f92d6ea47eb45ab0a1091779e936"
  },
  {
    "url": "conventions/mixins.html",
    "revision": "261d97aaa26d12a681adf3b760785dd3"
  },
  {
    "url": "conventions/routes.html",
    "revision": "b6727c72f6ecab7fc2fd7d945e605e43"
  },
  {
    "url": "conventions/views.html",
    "revision": "bfb8d2371e19b3aa98742798d1afc46e"
  },
  {
    "url": "index.html",
    "revision": "22fe56a43faf5cc54da66dfca0e59dbd"
  },
  {
    "url": "installation.html",
    "revision": "a0761c1958008789c30a4a4f21662270"
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
