(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{174:function(e,t,n){"use strict";n.r(t);var s=n(0),a=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"getting-started"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-started","aria-hidden":"true"}},[this._v("#")]),this._v(" Getting Started")]),this._v(" "),t("p",[this._v("Sample usage")]),this._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("import Vue from 'vue'\nimport App from './App.vue'\nimport VueAutowire from './autowire';\n\nVue.config.productionTip = false\n\nVue.use(VueAutowire, {\n  // All .js and .vue files except the ones ending with .async.vue\n  context: require.context('./', true, /\\/(?:[^.]+|(?!\\.async\\.vue$))(\\.js|\\.vue)$/),\n  // All the .async.vue files as async components on their own webpack chunk\n  asyncContext: require.context('./', true, /async\\.vue$/, 'lazy')\n})\n\nnew Vue({\n  render: h => h(App),\n}).$mount('#app')\n")])])])])}],!1,null,null,null);t.default=a.exports}}]);