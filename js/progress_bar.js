// Blogoldal oldal-előrehaladás sáv frissítése, ahogy a user lapoz 
function scrollProgressBar() {
  var getMax = function () {
    /*
    var body = document.body,
    html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    */
    return document.documentElement.scrollHeight
  }

  var getValue = function () {
    return window.scrollY * 1.2 // Valamilyért 42%-kal eltér az ablak tetejétől mért távolság a tényleges távolságtól... ;
  }

  var progressBar = document.querySelector(".progress-bar"),
    max = getMax(),
    value,
    width;

  var getWidth = function () {
    value = getValue();
    width = value / max * 100;
    width += "%";
    return width;
  }
  var setWidth = function () {
    if (progressBar) {
      progressBar.style.width = getWidth();
    }
  }

  document.addEventListener("scroll", function() {
    var toChange = document.querySelector("aside:first-child .cont") || document.getElementById("config");
    if (toChange.classList.contains("cont")) {
      var limit = 90;
    }
    else {
      var limit = 30;
    }
    if (!toChange) {
      return;
    }

    
    setWidth();
    if (Number(getWidth().replace("%", "")) > limit) {
      toChange.classList.add("d-none");
      toChange.classList.add("d-none");
    }
    else {
      toChange.classList.remove("d-none");
      toChange.classList.remove("d-none");
    }
  });
  window.addEventListener("resize", function () {
    max = getMax();
    setWidth();
  })
}
scrollProgressBar();