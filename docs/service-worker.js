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
    "revision": "bb27590c6d9f8587cf255f7cdee05f29"
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
    "url": "assets/js/10.a537037e.js",
    "revision": "a4fa25a8b4f14f849cdff2861fda274d"
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
    "url": "assets/js/3.587580f7.js",
    "revision": "7ab1a05e1c7979638132a84ee4e69f76"
  },
  {
    "url": "assets/js/4.772465f9.js",
    "revision": "1e5ad565854904a98a14cb336cb7950f"
  },
  {
    "url": "assets/js/5.5bf4212a.js",
    "revision": "88f5f71e748c9f40f81a81c1cafc4db1"
  },
  {
    "url": "assets/js/6.ebe6cece.js",
    "revision": "b004dac6895ce5f2bef3c64190693a3a"
  },
  {
    "url": "assets/js/7.81f6dbe3.js",
    "revision": "e1e5ec32bb8daeb44c16183249fdc504"
  },
  {
    "url": "assets/js/8.2ac51807.js",
    "revision": "2e03f3e6c381a72d998cb3c869416c4a"
  },
  {
    "url": "assets/js/9.e7739c10.js",
    "revision": "42e784daee92ae78075bee8780b15a64"
  },
  {
    "url": "assets/js/app.8c51bea6.js",
    "revision": "91acb55b6d144f7bda19865737915d2c"
  },
  {
    "url": "guide/index.html",
    "revision": "a563f6ea8fdcb4b6623000d50e690b96"
  },
  {
    "url": "guide/registering-components.html",
    "revision": "2ac8869e163fc2073dee04a53d6353bd"
  },
  {
    "url": "guide/registering-directives.html",
    "revision": "ef0cb3aa6e8e274c4c12cfcb40bc4ee2"
  },
  {
    "url": "guide/registering-mixins.html",
    "revision": "17b5fab8763b10f6c41a8c4b433ae43c"
  },
  {
    "url": "guide/registering-routes.html",
    "revision": "a20f31448da8a6dc08648e9461a0690d"
  },
  {
    "url": "guide/registering-views.html",
    "revision": "eaa30a8e2165197e307a96e5e1bb4867"
  },
  {
    "url": "index.html",
    "revision": "6e29d7ddeb85cbf0857abb14267791b0"
  },
  {
    "url": "installation.html",
    "revision": "96e9e03cccf013ec9dd56126a0c89496"
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
