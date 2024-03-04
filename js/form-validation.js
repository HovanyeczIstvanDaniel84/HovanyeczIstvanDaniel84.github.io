// Az oldalon lévő összes beugró sáv azonosítóját tartalmazza.
var activeAlerts = [];
// A felhasználó kezdetben még nincs fel iratkozva a hírlevélre.
var subscribed = false;
/* Annak érdekében, hogy a beugró sávok egymás alatt helyezkedjenek el,
egy konténerbe kerülnek, amely csak akkor létezik, ha van beszúrandó beugró sáv.
Ilyenkor létrehozzuk és beszúrjuk a dokumentumba. Ellenkezőleg törlődik.
*/
function appendAlertContainer() {
    var alertContainer = document.querySelector(".alert-cont");
    if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.classList.add("alert-cont", "d-flex", "flex-column");
        document.body.addEventListener("click", function () {
            var alertContainer = document.querySelector(".alert-cont");
            if (alertContainer && alertContainer.children.length == 0) {
                alertContainer.remove();
            }
        });
    }
    document.body.append(alertContainer);
    return alertContainer;
}
// Megnézi, hogy a megjelenített beugró sávok közül van-e ugyanolyan, mint amit éppen be akarunk szúrni.
function checkDuplicate(toCheck) {
    for (var elem of activeAlerts) {
        if (elem == toCheck) {
            return true;
        }
    }
    return false;
}
// Létrehoz egy beugró sávot a paramétereknek megfelelően.
function createAlert(type, headingText, content, icon, id) {
    var container = document.createElement("div");
    container.id = id;
    if (checkDuplicate(container.id)) {
        return "";
    }
    if (icon) {
        var bsIcon = document.createElement("i");
        bsIcon.classList.add("bi", icon, "me-3")
    }
    activeAlerts.push(container.id);
    container.classList.add("alert", `alert-${type}`, "alert-dismissible", "d-flex", "align-items-center");
    container.setAttribute("role", "alert");
    var closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close", "ms-auto");
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.id = `button-for${container.id}`
    closeButton.addEventListener("click", function() {
        activeAlerts.splice(activeAlerts.indexOf(this.id.split("-for")[1]), 1);
    });
    var heading = document.createElement("h3");
    heading.innerHTML = headingText;
    var paragraph = document.createElement("p");
    paragraph.innerHTML = content;
    container.append(bsIcon, paragraph, closeButton);
    return container;
}
var target = document.getElementById("purchase");
if (target) {
    var modal = new bootstrap.Modal(target);
}

// Bootstrap űrlap validáció
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (form.classList.contains("valid")) {
                if (form.id == "reach-out-form") {
                    appendAlertContainer().append(createAlert("warning",
                    "Sikertelen művelet!", "A következő üzenetet leghamarabb 6 óra múlva küldheti!", "bi-exclamation-triangle", "warning-1"))
                }
                event.preventDefault()
            }
            else {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    if (form.id == "reach-out-form") {
                        document.querySelector(".reach-out").classList.add("expand-height");
                    }
                }
                else {
                    event.preventDefault()
                    if (form.id == "reach-out-form") {
                        appendAlertContainer().append(createAlert("info",
                        "Köszönjük bizalmát!", "Üzenetét rögzítettük, 2-3 munkanapon belül keresni fogjuk!", "bi-check-circle", "info-1"));
                    }
                    else if (form.id == "purchase-form") {
                        if (modal) {
                            modal.hide();
                        }
                        appendAlertContainer().append(createAlert("success",
                        "Tranzakció jóváhagyva!", "Köszönjük a vásárlást, rendelését jóváhagytuk!", "bi-check-circle", "success-1"));
                        removeAllFromCart();

                    }
                    form.classList.add("valid");
                    document.querySelector(".reach-out").classList.remove("expand-height");

                }

                form.classList.add('was-validated');
            }
        }, false)
    })
})()


// Hírlevél validáció
document.querySelector(".blue-button").addEventListener("click", function() {
    if (document.getElementById("newsletter").value == "" && !subscribed) {
        appendAlertContainer().append(createAlert("danger", "Nem adott meg email címet!", "Kérjük ne hadja üresen az Email cím mezőt!", "bi-exclamation-circle", "danger-1"));
    }
    else if (!subscribed) {
        appendAlertContainer().append(createAlert("success", "Köszönjük!", "Köszönjük feliratkozását! Innentől értesül a heti fejleményekről.", "bi-check-circle", "success-1"));
        subscribed = true;
    }
    else {
        appendAlertContainer().append(createAlert("warning", "Már feliratkozott", "Ön már feliratkozott a hírlevélre", "bi-exclamation-triangle", "warning-2"));
    }
});