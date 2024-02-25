// Blog oldalak tartalmomjegyzékeinek megjelenése kattintásra változik
document.querySelectorAll(".content-table a").forEach(link => {
    link.addEventListener("click", function() {
        var previous = document.querySelector(".content-table a.active");
        if (previous) {
            previous.classList.remove("active");
        }
        link.classList.add("active");
    })
});

window.addEventListener("click", function() {
    var button = document.querySelector(".toggle-menu");
    if (document.getElementById("content-menu").classList.contains("hiding")) {
        button.classList.remove("d-none");
    }
    else if (document.getElementById("content-menu").classList.contains("showing") || document.getElementById("content-menu").classList.contains("show")) {
        button.classList.add("d-none");
    }
});

document.body.addEventListener("click", function() {
    var fade = document.querySelector("div.offcanvas-backdrop");
    if (fade && fade.classList.contains("show")) {
        document.querySelector(".progress-container").classList.add("d-none");
    }
    else {
        document.querySelector(".progress-container").classList.remove("d-none");
    }
})