var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var message = document.getElementById("message");

myInput.onfocus = function () {
    message.style.display = "block";
}

myInput.onblur = function () {
    message.style.display = "none";
}

myInput.onkeyup = function () {
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

    // Ha a felhasználó nem írt be semmit és tovább akar lépni, megjelenik az error üzenet
    if (!myInput.value.trim()) {
        message.style.display = "block";
    }
}

function checkForm() {
    // Vezetéknév ellenőrzése
    var errorContainers = document.querySelectorAll(".error");

    var inputSurname = document.getElementById("InputSurname");
    var surnameErrorContainer = errorContainers[0];

    if (!inputSurname.value.trim() || /\d/.test(inputSurname.value)) {
        surnameErrorContainer.style.display = "block";
    } else {
        surnameErrorContainer.style.display = "none";
    }

    inputSurname.addEventListener("input", function () {
        if (inputSurname.checkValidity()) {
            surnameErrorContainer.style.display = "none";
        } else {
            surnameErrorContainer.style.display = "none";
        }
    });

    // Keresztnév ellenőrzése
    var inputFirstName = document.getElementById("InputFirstName");
    var firstNameErrorContainer = errorContainers[1];

    if (!inputFirstName.value.trim() || /\d/.test(inputFirstName.value)) {
        firstNameErrorContainer.style.display = "block";
    } else {
        firstNameErrorContainer.style.display = "none";
    }

    inputFirstName.addEventListener("input", function () {
        if (inputFirstName.checkValidity()) {
            firstNameErrorContainer.style.display = "none";
        } else {
            firstNameErrorContainer.style.display = "none";
        }
    });

    // Felhasználónév ellenőrzése
    var inputUsername = document.getElementById("InputUsername");
    var usernameErrorContainer = errorContainers[2];

    if (inputUsername.value.trim().length < 5 || inputUsername.value.trim().length > 12) {
        usernameErrorContainer.style.display = "block";
    } else {
        usernameErrorContainer.style.display = "none";
    }

    inputUsername.addEventListener("input", function () {
        if (inputUsername.checkValidity()) {
            usernameErrorContainer.style.display = "none";
        } else {
            usernameErrorContainer.style.display = "none";
        }
    });

    // Email ellenőrzése
    var inputEmail = document.getElementById("InputEmail");
    var emailErrorContainer = errorContainers[3];
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(inputEmail.value.trim()) || !inputEmail.checkValidity()) {
        emailErrorContainer.style.display = "block";
    } else {
        emailErrorContainer.style.display = "none";
    }

    inputEmail.addEventListener("input", function () {
        if (inputEmail.checkValidity()) {
            emailErrorContainer.style.display = "none";
        } else {
            emailErrorContainer.style.display = "none";
        }
    });

    // Születési dátum ellenőrzése
    var inputDateOfBirth = document.getElementById("InputDateOfBirth");
    var dateErrorContainer = errorContainers[4];

    var selectedDate = new Date(inputDateOfBirth.value);
    var minDate = new Date("1924-01-01");
    var maxDate = new Date("2008-01-01");

    if (!inputDateOfBirth.value.trim()) {
        dateErrorContainer.style.display = "block";
    } else if (selectedDate < minDate || selectedDate > maxDate) {
        dateErrorContainer.style.display = "block";
        inputDateOfBirth.value = "";
    } else {
        dateErrorContainer.style.display = "none";
    }

    inputDateOfBirth.addEventListener("input", function () {
        if (inputDateOfBirth.checkValidity()) {
            dateErrorContainer.style.display = "none";
        } else {
            dateErrorContainer.style.display = "none";
        }
    });

    // Telefonszám formátumának ellenőrzése
    var inputMobile = document.getElementById("InputMobile");
    var mobileErrorContainer = errorContainers[5];
    var mobilePattern = /^\+\d{11}$/;

    inputMobile.addEventListener("input", function () {
        if (mobilePattern.test(inputMobile.value)) {
            mobileErrorContainer.style.display = "none";
        } else {
            mobileErrorContainer.style.display = "none";
        }
    });

    if (!mobilePattern.test(inputMobile.value)) {
        mobileErrorContainer.style.display = "block";
        inputMobile.value = "";
    }

    // Jelszó ellenőrzése
    var password = document.getElementById("psw");
    var passwordErrorContainer = errorContainers[6];

    if (!password.value.trim()) {
        passwordErrorContainer.style.display = "block";
    } else if (!password.checkValidity()) {
        passwordErrorContainer.style.display = "block";
    } else {
        passwordErrorContainer.style.display = "none";
    }

    password.addEventListener("input", function () {
        if (password.checkValidity()) {
            passwordErrorContainer.style.display = "none";
        } else {
            passwordErrorContainer.style.display = "none";
        }
    });

    // Jelszó egyezőségének ellenőrzése
    var confirmPassword = document.getElementById("psw2");
    var passwordConfirmErrorContainer = errorContainers[7];

    if (!password.value.trim() || !confirmPassword.value.trim()) {
        passwordConfirmErrorContainer.style.display = "block";
        confirmPassword.value = "";
    } else if (password.value !== confirmPassword.value) {
        passwordConfirmErrorContainer.style.display = "block";
        confirmPassword.value = "";
    } else {
        passwordConfirmErrorContainer.style.display = "none";
    }

    confirmPassword.addEventListener("input", function () {
        if (password.value === confirmPassword.value) {
            passwordConfirmErrorContainer.style.display = "none";
        } else {
            passwordConfirmErrorContainer.style.display = "none";
        }
    });

    // Modal bezárása
    if (document.querySelectorAll('.error[style="display: block;"]').length === 0) {
        // Sikeres regisztráció esetén üzenet megjelenítése és a modal bezárása
        alert("Sikeres regisztráció!")

        document.querySelector('.accountlogin').style.display = 'block';
        document.querySelector('.accountoverview').style.display = 'block';
        document.querySelector('.button-visible').style.display = 'none';

        // Modal bezárása
        var modal = document.getElementById('register');
        var bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
    }
}