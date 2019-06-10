export default {
  inserted: function (el) {
    el.innerHTML = `<div id="local-directive"><b>${el.innerHTML}</b></div>`;
  }
};
