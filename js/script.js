

class Product {
    constructor(name, description, price, mark, rating, images, cpu, gpu) {
        this.name = "Boolean " + name;
        this.description = description;
        this.price = price;
        this.cpu = cpu,
        this.gpu = gpu;
        this.mark = mark;
        this.saleMultiplier = (mark == 0 ? (randomFromRange(50, 90) / 100) : 1);
        this.rating = rating;
        this.isOnWishList = false;
        this.isInCart = false;
        this.images = images;
        this.quantity = 1;
        this.fees = 0;
    }
    static compareWith(instance1, instance2) {
        return instance1.name == instance2.name && instance1.price == instance2.price && instance1.description == instance2.description;
    }
    static togglewishList() {
        if (wishListElements.contains(this)) {
            wishListElements.reduce(x => {
                return x.compareWith(this);
            });
        }
        else {
            wishListElements.push(this);
        }
        this.isOnWishList = wishListElements.includes(this);
    }
    static isProductInCart(product) {
        var cart = JSON.parse(localStorage.getItem("cart")) || cartElements;
        for (var elem of cart) {
            if (Product.compareWith(elem, product)) {
                return true;
            }
        }
        return false;
    }
    static toggleCart(instance) {
        var cart = JSON.parse(localStorage.getItem("cart")) || cartElements;
        var includes = false;
        cart.forEach(x => {
            if (Product.compareWith(x, instance)) {
                includes = true;
            }
        });
        if (includes) {
            cart = cart.filter(x => {
                return !Product.compareWith(x, instance);
            });
            instance.isInCart = false;
        }
        else {
            cart.push(instance);
            instance.isInCart = true;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return instance;

    }
}

function createToast(id, desc) {
    if (document.querySelector(".main-cont")) {
        var container = document.querySelector(".toast-container") || document.createElement("div");
        if (!container.classList.contains("toast-container")) {
            container.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");
            document.querySelector(".main-cont").append(container);
        }
        container.innerHTML += `<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" id="${id}">
        <div class="d-flex">
        <div class="toast-body">
            ${desc}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        </div>`;
    }


}

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
window.addEventListener("scroll", function () {
    if (this.scrollY > 0) {
        document.querySelector("header").classList.add("bottom-shadow");
    }
    else {
        document.querySelector("header").classList.remove("bottom-shadow");
    }
});
// Kinyitható menük ikonjai váltakoznak attól függően, hogy nyitva vannak-e, vagy sem
var wishListElements = [];
var cartElements = [];
const shownElements = {

}

function createButton(type, role) {
    role ||= "button"
    var button = document.createElement("button");
    button.classList.add("btn", `btn-${type}`);
    button.type = role;
    return button;
}

function updateCartIcon() {
    var icon = document.getElementById("cart-count");
    var cart = JSON.parse(localStorage.getItem("cart")) || cartElements;
    if (cart.length > 0) {
        icon.classList.remove("d-none");
    }
    else {
        icon.classList.add("d-none");
    }
    icon.innerHTML = cart.length;
    var amountIndicator = document.querySelector("h1 span")
    if (amountIndicator) {
        amountIndicator.innerHTML = `(${cart.length} darab)`;
    }
}



const pcNames = ["Rogue Gaming PC", "Turbo Gaming PC", "Godskin PC", "Spitfire PC", "Phoneix PC", "Blizzard Pc"]
const pcDescriptions = [
    "Nvidia Asus Rog Strix RTX 3080 12 Gb Videókártya, Intel core i5 13400F Processzor (4.60 GHz), Asus B760 FCLGA1700 Alaplap",
    "AMD RX 7700 XT Gaming OC 12G 12GB GDDR6 videokártya, AMD Ryzen 5 5600X processzor, ASRock B450 Pro4 R2.0 Alaplap",
    "GIGABYTE RTX 4060 Windforce OC 8G 8GB GDDR6 videokártya, Intel Core i5-12400F processzor, GIGABYTE H610M K DDR4 alaplap",
    "MSI RTX 4070 Ti 12GB videókártya, Intel Core I5-14400F processzor, MSI B760-VC alaplap"
];
const PC_MARKS = {
    0: "sale",
    1: "new"
}

const CPU = ["Intel", "AMD"];
const GPU = ["NVIDIA", "AMD"];


const HUF_FORMAT = Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumSignificantDigits: 4
});

function randomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray(array, amount) {
    amount ||= 1;
    var picks = []
    for (var i = 0; i < amount; i++) {
        do {
            var pick = array[Math.floor(Math.random() * array.length)];
        } while (picks.includes(pick));
        picks.push(pick)
    }
    return picks.length == 1 ? picks[0] : picks;
}

function randomMark() {
    var chance = Math.floor(Math.random() * 100);
    if (chance < 50) {
        return null;
    }
    return chance > 75 ? 0 : 1;

}
function createProduct() {
    var pick = randomFromRange(1, 4);
    var coverImages = [`images/product${pick}_front.png`, `images/product${pick}_rear.png`];
    var desc = randomFromArray(pcDescriptions);
    var cpu = desc.includes("AMD Ryzen") ? CPU[1] : CPU[0];
    var gpu = desc.includes("RTX") ? GPU[0] : GPU[1];
    return new Product(randomFromArray(pcNames), desc, randomFromRange(400000, 900000), randomMark(), randomFromRange(10, 50) / 10, coverImages, cpu, gpu);
}

function insertStars(container, rating) {
    for (var i = 1; i <= 5; i++) {
        var starClass;
        if (rating >= i) {
            starClass = "bi-star-fill";
        }
        else if (rating <= i) {
            if (0 < i - rating && i - rating < 1) {
                starClass = "bi-star-half";
            }
            else {
                starClass = "bi-star";
            }
        }
        var star = document.createElement("i");
        star.classList.add("bi", starClass);
        container.append(star);
    }
}

function clearPage(category) {
    category ||= "main-pc-container";
    document.querySelectorAll(`.${category} .pcbox`).forEach(x => {
        x.remove();
    });
}

function insertProduct(container, product) {
    if (product.mark == 0) {
        var markIconClass = "bi-cash-coin";
        var oldPrice = document.createElement("p");
        oldPrice.classList.add("saleprice")
        var s = document.createElement("s");
        s.innerHTML = HUF_FORMAT.format(product.price);
        oldPrice.append(s);
    }
    else if (product.mark == 1) {
        var markIconClass = "bi-broadcast-pin";
    }
    container ||= "pcs";
    var pcContainer = document.createElement("article");
    pcContainer.classList.add("pcbox", "m-3", "col-lg-6", "col-md-6", "col-sm-12");
    var imgContainer = document.createElement("div");
    imgContainer.classList.add("pcbox-img");
    var imgFront = document.createElement("img");
    imgFront.classList.add("front");
    imgFront.setAttribute("src", product.images[0]);
    var imgRear = document.createElement("img");
    imgRear.classList.add("rear");
    imgRear.setAttribute("src", product.images[1]);
    imgContainer.append(imgFront, imgRear);
    var textContainer = document.createElement("div");
    textContainer.classList.add("pcbox-text");
    var title = document.createElement("a");
    title.classList.add("pcbox-title", "d-block");
    title.setAttribute("href", "product_page.html");
    title.innerHTML = `<strong>${product.name}</strong>`;
    title.addEventListener("click", function () {
        // localStorage.setItem("selected", JSON.stringify({name: product.name, price: product.price, oldprice: product.saleMultiplier ? product.price * product.saleMultiplier : false}));
        localStorage.setItem("selected", JSON.stringify(product));
    });
    var desc = document.createElement("p");
    desc.innerHTML = product.description;
    textContainer.append(title, desc);
    var heartContainer = document.createElement("div");
    heartContainer.classList.add("heart");
    heartContainer.title = "Kívánságlistához adás";
    var link = document.createElement("a");
    link.href = "#";
    var heartIcon = document.createElement("i");
    heartIcon.classList.add("bi", "bi-heart-fill", "icon-heart");
    heartIcon.setAttribute("fill", "currentColor");
    heartIcon.setAttribute("width", "30");
    heartIcon.setAttribute("height", "30");
    heartIcon.setAttribute("viewBox", "0 0 16 16");
    link.append(heartIcon);
    heartContainer.append(link);
    if (product.mark != null) {
        var markContainer = document.createElement("div");
        markContainer.classList.add(PC_MARKS[product.mark]);
        var markIcon = document.createElement("i");
        markIcon.classList.add("bi", markIconClass, "icon-sale");
        markIcon.setAttribute("fill", "currentColor");
        markIcon.setAttribute("width", "30");
        markIcon.setAttribute("height", "30");
        markIcon.setAttribute("viewBox", "0 0 16 16");
        markContainer.append(markIcon);
    }
    link = document.createElement("a");
    link.classList.add("cart", "pointer");
    link.type = "button";
    var cartIcon = document.createElement("i");
    cartIcon.classList.add("bi", "bi-cart4", "icon-cart");
    link.append(cartIcon);
    if (product.isInCart) {
        link.classList.add("active");
    }
    link.addEventListener("click", function () {
        cartToggler(product, link);
    });
    var ratingContainer = document.createElement("div");
    ratingContainer.classList.add("pcbox-stars");
    insertStars(ratingContainer, product.rating)
    var newPrice = document.createElement("p");
    newPrice.classList.add((oldPrice ? "newprice" : "price"));
    newPrice.innerHTML = `<strong>${HUF_FORMAT.format(product.price * (product.saleMultiplier ? product.saleMultiplier : 1))}</strong>`;
    pcContainer.append(imgContainer, textContainer, heartContainer, (markContainer ? markContainer : ""), ratingContainer, (oldPrice ? oldPrice : ""), newPrice, link);
    container.append(pcContainer);
}

function loadFiltered() {
    var filtered = JSON.parse(localStorage.getItem("filteredProducts"));
    filtered.forEach(product => {
        insertProduct(document.querySelector(".main-pc-container"), product);
    })
}

function loadProducts() {
    var elements = JSON.parse(localStorage.getItem("pcs"));
    var keys = Object.keys(elements);
    for (var key of keys) {
        if (document.querySelector(`.${key}`)) {
            for (var i = 0; i < elements[key].length; i++) {
                elements[key][i].isInCart = Product.isProductInCart(elements[key][i]);
                insertProduct(document.querySelector(`.${key}`), elements[key][i]);

            }
        }
    }

}

function webshopProducts() {
    if (!localStorage.getItem("pcs")) {
        shownElements["outstanding-pcs"] = [];
        shownElements["main-pc-container"] = [];
        for (var i = 0; i < 3; i++) {
            shownElements["outstanding-pcs"].push(createProduct());
        }
        for (var i = 0; i < 20; i++) {
            shownElements["main-pc-container"].push(createProduct());
        }
        localStorage.setItem("pcs", JSON.stringify(shownElements));
    }
}

function cartToggler(product, toggleLink) {
    Product.toggleCart(product);
    var targetId = !product.isInCart ? "removeFromCart" : "addToCart";
    var target = document.getElementById(targetId);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(target);
    updateCartIcon();
    toastBootstrap.show();
    if (toggleLink && !(typeof toggleLink == "number")) {
        if (product.isInCart) {
            toggleLink.classList.add("active");
        }
        else {
            toggleLink.classList.remove("active");
        }
    }

    updateCartIcon();
}

function initWebshop() {
    webshopProducts();
    loadProducts();
}

function initAll() {
    createToast("addToCart", "Sikeresen hozzáadva");
    createToast("removeFromCart", "Sikeresen eltávolítva");
    updateCartIcon();
    initQuantityInput();
}
// const shownElements = {
//     "outstanding": [],
//     "main-pc-container": []
// };

function applyFilters() {
    clearPage();
    var elements = JSON.parse(localStorage.getItem("pcs"));
    var filteredProducts = elements["main-pc-container"];
    if (window.innerWidth <= 1400) {
        var num = 1;
    }
    else {
        var num = 0;
    }
    const priceMIN = Number(document.querySelector(`#fromInput${num}`).value);
    const priceMAX = Number(document.querySelector(`#toInput${num}`).value);
    const byPriceASC = document.getElementById(`radioArNovekvo${num}`);
    const byPriceDESC = document.getElementById(`radioArCsokkeno${num}`);
    const flexCheckNVIDIA = document.getElementById(`flexCheckNVIDIA${num}`);
    const flexCheckAMDVid = document.getElementById(`flexCheckAMDVid${num}`);
    const flexCheckIntel = document.getElementById(`flexCheckIntel${num}`);
    const flexCheckAMDProc = document.getElementById(`flexCheckAMDProc${num}`);
    const byRatingASC = document.getElementById(`radioJelzesJo${num}`);
    const byRatingDESC = document.getElementById(`radioJelzesRossz${num}`);
    filteredProducts = filteredProducts.filter(product => {
        return priceMIN <= product.price * product.saleMultiplier && product.price * product.saleMultiplier <= priceMAX;
    });
    for (var i = 0; i < filteredProducts.length - 1; i++) {
        for (var j = i + 1; j < filteredProducts.length; j++) {
            if (byPriceASC.checked) {
                if ((filteredProducts[i].price * filteredProducts[i].saleMultiplier) > (filteredProducts[j].price * filteredProducts[j].saleMultiplier)) {
                    var temporary = filteredProducts[i];
                    filteredProducts[i] = filteredProducts[j];
                    filteredProducts[j] = temporary;
                }
            }
            else if (byPriceDESC.checked) {
                if ((filteredProducts[i].price * filteredProducts[i].saleMultiplier) < (filteredProducts[j].price * filteredProducts[j].saleMultiplier)) {
                    var temporary = filteredProducts[i];
                    filteredProducts[i] = filteredProducts[j];
                    filteredProducts[j] = temporary;
                }
            }
            if (byRatingASC.checked) {
                if (filteredProducts[i].rating < filteredProducts[j].rating) {
                    var temporary = filteredProducts[i];
                    filteredProducts[i] = filteredProducts[j];
                    filteredProducts[j] = temporary;
                }
            }
            else if (byRatingDESC.checked){
                if (filteredProducts[i].rating > filteredProducts[j].rating) {
                    var temporary = filteredProducts[i];
                    filteredProducts[i] = filteredProducts[j];
                    filteredProducts[j] = temporary;
                    
                }
            }
        }
    }

    const selectedGPUType = flexCheckNVIDIA.checked ? "NVIDIA" : flexCheckAMDVid.checked ? "AMD" : null;
    if (selectedGPUType) {
        filteredProducts = filteredProducts.filter(product => {
            return product.gpu === selectedGPUType;
        });
    }
    
    const selectedCPUType = flexCheckIntel.checked ? "Intel" : flexCheckAMDProc.checked ? "AMD" : null;
    if (selectedCPUType) {
        filteredProducts = filteredProducts.filter(product => {
            return product.cpu === selectedCPUType;
        });
    }
    var note = document.getElementById("filter-result");
    note.classList.remove("d-none");
    note.innerHTML = `${filteredProducts.length} db szűrési találat`;
    localStorage.setItem("filteredProducts", JSON.stringify(filteredProducts));
    loadFiltered();
}

function updatePrice(change, product) {
    var target = document.querySelector("p.final.sum");
    var feeSum = document.getElementById("fee-sum");
    var productSum = document.getElementById("product-sum");
    var sectOverall = document.querySelectorAll(".sum p");
    if (!target) {
        return;
    }
    var overAll = 0;
    var cartContent = document.querySelectorAll("article");
    var cart = JSON.parse(localStorage.getItem("cart")) || cartElements;
    for (var i = 0; i < cartContent.length; i++) {
        if (product && Product.compareWith(product, cart[i])) {
            if (change == 0 && cart[i].quantity == 1 || change == 1 && cart[i].quantity == 5) {
                return;
            }
            if (change == 1) {
                cart[i].quantity++
            }
            else {
                cart[i].quantity--;
            }
            document.querySelectorAll("article .price p")[i].innerHTML = HUF_FORMAT.format(Math.round(cart[i].price * cart[i].saleMultiplier * cart[i].quantity));
            sectOverall[i].innerHTML = HUF_FORMAT.format(Math.round(cart[i].price * cart[i].quantity * cart[i].saleMultiplier + product.fees));
        }
        overAll += cart[i].price * cart[i].quantity * cart[i].saleMultiplier + cart[i].fees;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    productSum.innerHTML = HUF_FORMAT.format(Math.round(overAll));
    feeSum.innerHTML = HUF_FORMAT.format(Math.round(cart.length * 3999));
    target.innerHTML = HUF_FORMAT.format(Math.round(overAll + cart.length * 3999));
    document.getElementById("to-pay").innerHTML = target.innerHTML;
}
function calculateFees(field, product) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < cart.length; i++) {
        if (Product.compareWith(product, cart[i])) {
            field.forEach(input => {
                if (input.checked) {
                    cart[i].fees += Number(input.value);
                    return;
                }
            });
        }
    }
}

function insertIntoCart(product) {
    var container = document.createElement("article");
    container.classList.add("d-flex", "flex-column");
    var main = document.createElement("div");
    container.append(main);
    main.classList.add("d-flex", "main", "bb-1");
    var imgCont = document.createElement("div");
    imgCont.classList.add("img-cont");
    main.append(imgCont);
    var img = document.createElement("img");
    img.src = product.images[0];
    imgCont.append(img);
    var textCont = document.createElement("div");
    textCont.classList.add("text-cont", "d-flex");
    main.append(textCont);
    var desc = document.createElement("div");
    desc.classList.add("desc");
    var title = document.createElement("h2");
    title.innerHTML = product.name;
    var paragraph = document.createElement("p");
    paragraph.innerHTML = product.description;
    textCont.append(desc);
    var buttons = document.createElement("div");
    desc.append(title, paragraph, buttons);
    buttons.classList.add("d-flex", "buttons");
    var button = document.createElement("a");
    button.classList.add("btn", "btn-outline-secondary", "me-3");
    button.type = "button";
    button.innerHTML = "Megtekintés";
    button.addEventListener("click", function () {
        localStorage.setItem("selected", JSON.stringify(product));
    })
    button.setAttribute("href", "product_page.html");
    if (product.mark) {
        var span = document.createElement("span");
        span.classList.add("badge");
        if (product.mark == 0) {
            span.classList.add("sale");
            var icon = `<i class="bi bi-clock me-2"></i>`
            span.innerHTML += icon + "Leárazás 2024. 03. 10.-ig";
        }
        else {
            span.classList.add("new");
            var icon = `<i class="bi bi-info-circle me-2"></i>`
            span.innerHTML += icon + "Újdonság";
        }
    }
    buttons.append(button, span ? span : "");
    var price = document.createElement("div");
    textCont.append(price);
    price.classList.add("price", "d-flex", "flex-column", "align-items-end");
    var priceText = document.createElement("div");
    priceText.innerHTML += (product.mark == 0 ? `<s>${HUF_FORMAT.format(product.price * product.quantity)}</s>` : "") + `<p>${HUF_FORMAT.format((product.price * (product.saleMultiplier ? product.saleMultiplier : 1) * product.quantity))}</p>`;
    priceText.classList.add("mb-3");
    var quantity = document.createElement("div");
    quantity.classList.add("buy", "mb-3");

    var form = document.createElement("form");
    form.classList.add("d-flex", "justify-content-center", "align-items-center");
    var input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.value = product.quantity;
    input.max = "5";
    input.readOnly = true;
    var link = document.createElement("a");
    link.innerHTML = `<i class="bi bi-dash-lg"></i>`;
    link.classList.add("pointer");
    link.addEventListener("click", function () {
        updatePrice(0, product);
    });
    form.append(link, input);
    quantity.append(form);
    var link = document.createElement("a");
    link.innerHTML = `<i class="bi bi-plus-lg"></i>`;
    link.classList.add("pointer");
    link.addEventListener("click", function () {
        updatePrice(1, product);
    });
    form.append(link);

    var remove = createButton("outline-secondary");
    remove.classList.add("mb-3");
    remove.innerHTML = `<i class="bi bi-trash"></i>Eltávolítás`
    remove.addEventListener("click", function () {
        Product.toggleCart(product);
        fillCart();
        updateCartIcon();
    });
    price.append(priceText, quantity, remove);
    var warranty = createCartItemSection("Garancia", true, null, "2 év - 0 Ft", "3 év - 9999 Ft", "5 év - 19998 Ft");
    warranty.classList.add("warranty");
    var shipping = createCartItemSection("Szállítás", true, null, "Személyes átvétel - 0 Ft", "FoxPost automata - 2999 Ft", "Egyéni címre - 5999 Ft");
    shipping.classList.add("shipping");
    var buildFee = createCartItemSection("Szerelési díj", false);
    buildFee.classList.add("build-fee")
    var sum = createCartItemSection("Összesen", false, HUF_FORMAT.format(Math.round(3999 + product.price * (product.saleMultiplier ? product.saleMultiplier : 1))));
    sum.classList.add("sum");
    container.append(warranty, shipping, buildFee, sum);
    document.querySelector("section.content").append(container);
}

function createCartItemSection(title, isCollapsible, price, ...labels) {
    if (title == "Garancia") {
        var name = "warranty";
    }
    else {
        var name = "shipping";
    }
    var id = title.toLowerCase() + document.querySelectorAll("article").length;
    var result = document.createElement("div");
    result.classList.add("article-section");
    var hold = document.createElement("div");
    hold.classList.add("hold", "d-flex");
    var h3 = document.createElement("h3");
    h3.innerHTML = title;
    if (isCollapsible) {
        var collapseToggle = document.createElement("a");
        collapseToggle.setAttribute("data-bs-toggle", "collapse");
        collapseToggle.setAttribute("href", `#${id}`);
        collapseToggle.setAttribute("role", "button");
        collapseToggle.setAttribute("aria-expanded", "false");
        collapseToggle.setAttribute("aria-controls", id);
        collapseToggle.innerHTML += `<i class="bi bi-plus-lg"></i>`;
        var collapse = createRadios(3, labels, name);
        collapse.classList.add("collapse");
        collapse.id = id
    }
    else {
        price ||= "3 999 Ft";
        collapseToggle = document.createElement("p");
        collapseToggle.innerHTML = price;
    }
    hold.append(h3, collapseToggle ? collapseToggle : "");
    result.append(hold, collapse ? collapse : "");
    result.classList.add("article-section");
    return result;
}

function createRadios(amount, labels, name) {
    var container = document.createElement("div");
    for (var i = 1; i <= amount; i++) {
        var checkCont = document.createElement("div");
        checkCont.classList.add("form-check");
        var input = document.createElement("input");
        input.classList.add("form-check-input");
        if (i == 1) {
            input.checked = true;
        }
        input.type = "radio";
        input.name = name + document.querySelectorAll(".form-check").length;
        input.id = name + document.querySelectorAll(".form-check").length;
        input.value = `${labels[i - 1].split(" - ")[1].replace(" Ft", "")}`;
        var label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for", `#${input.id}`);
        label.innerHTML = labels[i - 1];
        checkCont.append(input, label);
        container.append(checkCont);

    }
    return container;
}

function clearCart() {
    document.querySelectorAll("article").forEach(x => {
        x.remove();
    });
}



function insertEmptyCartNote(action) {
    var target = document.querySelector("section.content");
    if (target && action == 1) {
        document.querySelector(".remove-all").classList.add("d-none");
        var body = document.createElement("div");
        body.classList.add("empty-note")
        var heading = document.createElement("h2");
        heading.innerHTML = "Úgy tűnik, még nem adott semmit a kosárhoz."
        var text = document.createElement("p");
        text.innerHTML = `A Webshopban tud termékeket kosárba helyezni.`
        body.append(heading, text);
        target.append(body);
        document.getElementById("purchaseButton").disabled = true;

    }
    if (action == 0) {
        document.querySelector(".remove-all").classList.remove("d-none");
        var note = document.querySelector(".empty-note");
        if (note) {
            note.remove();
        }
        document.getElementById("purchaseButton").disabled = false;
    }
}


function fillCart() {
    var target = document.querySelector("section.content");
    if (target) {
        clearCart();
        var cart = JSON.parse(localStorage.getItem("cart")) || cartElements;
        if (cart.length == 0) {
            insertEmptyCartNote(1);
        }
        else {
            insertEmptyCartNote(0);
            cart.forEach(product => {
                insertIntoCart(product);
            });
        }
        updatePrice();
        updateCartIcon();
    }

}


function initQuantityInput() {
    var setQuantity = document.querySelectorAll(".buy form");
    if (setQuantity) {
        for (var i = 0; i < setQuantity.length; i++) {
            setQuantity[i].children[0].addEventListener("click", function () {
                var input = this.parentElement.children[1];
                if (Number(input.value) > 1) {
                    input.value = Number(input.value) - 1;
                }
            });

            setQuantity[i].children[2].addEventListener("click", function () {
                var input = this.parentElement.children[1];
                if (Number(input.value) < 5) {
                    input.value = Number(input.value) + 1;
                }
            });
        }

    }
}
function removeAllFromCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || shownElements;
    cart = cart.filter(x => {
        return false;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    fillCart();
}
var removeAll = document.querySelector(".remove-all");
if (removeAll) {
    removeAll.addEventListener("click", removeAllFromCart);
}

function initCollapse() {
    document.querySelectorAll("a[data-bs-toggle=collapse]").forEach(icon => {
        icon.addEventListener("click", function () {
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
}
initWebshop();
fillCart();
initCollapse();
updatePrice();
initAll();
