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


var product = JSON.parse(localStorage.getItem("selected"));
var imgs = document.querySelectorAll(".gallery img");
for (var i = 0; i < product.images.length; i++) {
    imgs[i].src = product.images[i];
}
document.querySelector("#main-show-image").src = product.images[0];
document.querySelector("h1").innerHTML = product.name;
document.getElementById("price").innerHTML = `<strong class="me-3">${HUF_FORMAT.format(product.price * (product.saleMultiplier ? product.saleMultiplier : 1))}</strong>`;
document.getElementById("price").innerHTML += product.mark == 0 ? `<s>${HUF_FORMAT.format(product.price)}</s><span
class="ms-3">${Math.round(100-product.saleMultiplier*100)}%-os
kedvezmény</span>` : "";
document.getElementById("place-to-cart").addEventListener("click", function() {
    product.quantity = Number(document.getElementById("amount").value);
    cartToggler(product);
});

insertStars(document.querySelector(".rating"), product.rating);
document.getElementById("numeric-rating").innerHTML += `${product.rating}/5`

