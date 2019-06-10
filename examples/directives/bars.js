export default {
  inserted: function (el) {
    el.innerHTML = `<div id="bars-directive"><hr>${el.innerHTML}<hr></div>`;
  }
};
