// Gombok animációja
var animateButtons = document.querySelectorAll("button.show-more");
// for (var i = 0; i < animateButtons.length; i++) {
//     animateButtons[i].addEventListener("mouseover", function() {
//         this.children[0].classList.add("w-20px");
//     });
//     animateButtons[i].addEventListener("mouseout", function() {
//         this.children[0].classList.remove("w-20px");
//     });
// }

animateButtons.forEach(button => {
    button.addEventListener("mouseover", function() {
        this.children[0].classList.add("w-20px");
    });
    button.addEventListener("mouseout", function() {
        this.children[0].classList.remove("w-20px");
    });
});