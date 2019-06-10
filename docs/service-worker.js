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
    "revision": "ae12a1c932090429cfa36c25a892042d"
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
    "url": "assets/js/3.9573cf76.js",
    "revision": "167fff67c00d89087c241a1e0797afaf"
  },
  {
    "url": "assets/js/4.6a3a3ab2.js",
    "revision": "5c54d90e47641e35f7125d92a64d9015"
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
    "url": "assets/js/app.7e17d72d.js",
    "revision": "359cdaf5ca825512f4eb3d3ff2cbb5e8"
  },
  {
    "url": "conventions/components.html",
    "revision": "709c8d2e04cb5c54975eb8e40732d224"
  },
  {
    "url": "conventions/directives.html",
    "revision": "87fd3cee25a9d9049230dad63a89a4b6"
  },
  {
    "url": "conventions/filters.html",
    "revision": "9fec39c7c8df7d301e413a09541e3553"
  },
  {
    "url": "conventions/index.html",
    "revision": "0df407e8235ff44d2e39331b5fc498f4"
  },
  {
    "url": "conventions/mixins.html",
    "revision": "60662ece84425393853101624a1c96b0"
  },
  {
    "url": "conventions/routes.html",
    "revision": "97cb418793a9f5186d6d44ef10276c45"
  },
  {
    "url": "conventions/views.html",
    "revision": "53cfae186223f6abed8d121e71453af8"
  },
  {
    "url": "index.html",
    "revision": "e453271d5818fbae23080899fb95186b"
  },
  {
    "url": "installation.html",
    "revision": "dc32d095ffc59a5e8b0bb97c1f5cd81d"
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
