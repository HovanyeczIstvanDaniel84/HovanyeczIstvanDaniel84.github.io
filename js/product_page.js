document.querySelectorAll(".images a").forEach(link => {
    link.addEventListener("click", function() {
        var previous = document.querySelector(".images a.active");
        if (previous) {
            previous.classList.remove("active");
        }
        this.classList.add("active");
        document.querySelector(".images .img-cont img").src = document.querySelector(".images a.active img").src;
    });
});

document.querySelector(".buy a:first-child").addEventListener("click", function() {
    var input = document.getElementById("amount");
    if (Number(input.value) > 1) {
        input.value = Number(input.value) - 1;
    }
});

document.querySelector(".buy a:last-child").addEventListener("click", function() {
    var input = document.getElementById("amount");
    if (Number(input.value) < 5) {
        input.value = Number(input.value) + 1;
    }
});