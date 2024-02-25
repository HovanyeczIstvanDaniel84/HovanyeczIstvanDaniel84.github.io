// Gombok animációja
var animateButtons = document.querySelectorAll("button.show-more");

animateButtons.forEach(button => {
    button.addEventListener("mouseover", function () {
        this.children[0].classList.add("w-20px");
    });
    button.addEventListener("mouseout", function () {
        this.children[0].classList.remove("w-20px");
    });
});

// Alsó árnyékolás effektet rak a fejléc alá, ha az oldalt elgörgették a legtetejétől, illetve elveszi azt, a ismét a legtetején vagyunk.
window.addEventListener("scroll", function() {
    if (this.scrollY > 0) {
        document.querySelector("header").classList.add("bottom-shadow");
    }
    else {
        document.querySelector("header").classList.remove("bottom-shadow");
    }
});
// Kinyitható menük ikonjai váltakoznak attól függően, hogy nyitva vannak-e, vagy sem
document.querySelectorAll(".filters a[role=button]").forEach(icon => {
    icon.addEventListener("click", function() {
        if (this.classList.contains("collapsed")) {
            this.children[0].classList.add("bi-plus-lg");
            this.children[0].classList.remove("bi-dash-lg");
        }
        else {
            this.children[0].classList.add("bi-dash-lg");
            this.children[0].classList.remove("bi-plus-lg");
        }
    });
});