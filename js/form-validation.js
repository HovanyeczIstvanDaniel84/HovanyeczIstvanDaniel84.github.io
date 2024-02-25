(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (form.classList.contains("valid")) {
                const myModal = new bootstrap.Modal("#negativeFeedbackModal", {
                    keyboard: false
                });
                myModal.show();
                event.preventDefault()
            }
            else {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    document.querySelector(".reach-out").classList.add("expand-height");
                }
                else {
                    event.preventDefault()
                    const myModal = new bootstrap.Modal('#exampleModal', {
                        keyboard: false
                    });
                    myModal.show();
                    form.classList.add("valid");
                    document.querySelector(".reach-out").classList.remove("expand-height");
    
                }
    
                form.classList.add('was-validated');
            }
        }, false)
    })
})()