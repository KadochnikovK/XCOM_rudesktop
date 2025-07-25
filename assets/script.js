document.addEventListener('DOMContentLoaded', function () {
    const gallerySwiper = new Swiper('.gallery__slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,

        simulateTouch: true,
        grabCursor: true,

        touchRatio: 0.6,
        touchAngle: 45,

        freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 2,
            momentumBounce: true,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 2,
            sticky: true
        },

        speed: 600,
        resistanceRatio: 0.6,

        navigation: {
            nextEl: '.gallery__button-next',
            prevEl: '.gallery__button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
                freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 3,
                    sticky: true
                },
                speed: 800
            },
            640: {
                slidesPerView: 2,
                freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 2
                }
            },
            1000: {
                slidesPerView: 3,
                freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 2
                }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector('.header__hamburger')
    const wrapper = document.querySelector('.offer__wrapper')
    const menu = document.querySelector('.header__menu')
    const links = document.querySelectorAll('.header__link')

    const changeActiveMenu = () => {
        hamburger.classList.toggle('active')
        wrapper.classList.toggle('offer__wrapper--hidden')
        menu.classList.toggle('header__menu--active')

    }
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('header__menu--active')) {
                changeActiveMenu()
            }
        })

    })
    hamburger.addEventListener('click', changeActiveMenu)

})

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("main-form");
    const formItems = form.querySelectorAll(".form__item");
    const privacyCheckbox = document.querySelector("#privacy-policy");
    const privacyError = document.querySelector(".form__item--checkbox .error-message");
    const registrationButton = document.querySelector('#registration-button');

    const modalForm = document.createElement('form')
    const originalFormInputs = document.getElementById("main-form").querySelector('.form__inputs').cloneNode(true);
    const originalFormButton = document.getElementById("main-form").querySelector('.form__button').cloneNode(true);
    modalForm.append(originalFormInputs, originalFormButton);
    modalForm.id = "modal-form";


    const formModal = document.createElement("div");
    formModal.className = "modal animate__animated";
    formModal.style.display = "none";
    formModal.innerHTML = `
            <div class="modal__window modal__window--full animate__animated">
                <div class="modal__close">
                    <span></span>
                    <span></span>
                </div>
                <div class="modal__content">
                  
                </div>
            </div>
        `;

    const modalContent = formModal.querySelector(".modal__content");
    modalContent.appendChild(modalForm);


    document.body.appendChild(formModal);


    function openFormModal() {
        const modalWindow = formModal.querySelector(".modal__window");

        formModal.style.display = "flex";
        modalWindow.classList.add("animate__fadeInUp");
        formModal.classList.add("animate__fadeIn");


        initFormValidation(modalForm);
    }

    function initFormValidation(form) {
        const formItems = form.querySelectorAll(".form__item");
        const privacyCheckbox = form.querySelector("#privacy-policy");
        const privacyError = form.querySelector(".form__item--checkbox .error-message");

        function clearErrors() {
            formItems.forEach((item) => {
                item.classList.remove("form__item--not-valid");
                const errorElement = item.querySelector(".error-message");
                if (errorElement) {
                    errorElement.style.display = "none";
                }
            });
        }

        function addError(element, message) {
            const formItem = element.closest(".form__item");
            formItem.classList.add("form__item--not-valid");
        }

        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });

        function handleInputFocus(e) {
            const formItem = e.target.closest(".form__item");
            if (formItem) {
                formItem.classList.add("form__item--focused");
                const label = formItem.querySelector("label");
                if (label) {
                    label.classList.add("label--focused");
                }
            }
        }

        function handleInputBlur(e) {
            const formItem = e.target.closest(".form__item");
            if (formItem) {
                formItem.classList.remove("form__item--focused");
                const label = formItem.querySelector("label");
                if (label) {
                    label.classList.remove("label--focused");
                }
            }
        }

        function validateField(field) {
            const value = field.value.trim();
            const name = field.name;

            if (field.type === "checkbox") {
                if (!field.checked) {
                    addError(field, "Необходимо ваше согласие");
                    return false;
                }
                return true;
            }

            if (!value) {
                addError(field, "Это поле обязательно для заполнения");
                return false;
            }

            switch (name) {
                case "email":
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        addError(field, "Введите корректный email");
                        return false;
                    }
                    break;
            }

            return true;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            clearErrors();

            let isValid = true;
            const fields = form.querySelectorAll("input:not([type=submit]), textarea");

            fields.forEach((field) => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!privacyCheckbox.checked) {
                addError(privacyCheckbox, "Необходимо ваше согласие");
                isValid = false;
            }

            if (isValid) {
                const formData = {
                    name: form.elements.name.value.trim(),
                    email: form.elements.email.value.trim(),
                };

                console.log("Данные формы:", formData);
                showModal("Регистрация прошла успешно", "Мы свяжемся с вами в ближайшее время", "Хорошо");
                closeFormModal();
            }
        });

        privacyCheckbox.addEventListener("change", function () {
            if (this.checked) {
                this.closest(".form__item").classList.remove("form__item--not-valid");
                if (privacyError) privacyError.style.display = "none";
            }
        });

        form.addEventListener("input", function (e) {
            if (e.target.tagName === "INPUT") {
                const formItem = e.target.closest(".form__item");
                formItem.classList.remove("form__item--not-valid");
                const errorElement = formItem.querySelector(".error-message");
                if (errorElement) {
                    errorElement.style.display = "none";
                }
            }
        });
    }

    initFormValidation(originalFormInputs);


    function closeFormModal() {
        const modalWindow = formModal.querySelector(".modal__window");

        modalWindow.classList.remove("animate__fadeInUp");
        modalWindow.classList.add("animate__fadeOutDown");
        formModal.classList.remove("animate__fadeIn");
        formModal.classList.add("animate__fadeOut");

        setTimeout(() => {
            formModal.style.display = "none";
            modalWindow.classList.remove("animate__fadeOutDown");
            formModal.classList.remove("animate__fadeOut");
        }, 500);
    }

    const modalClose = formModal.querySelector(".modal__close");
    modalClose.addEventListener("click", closeFormModal);

    formModal.addEventListener("click", (e) => {
        if (e.target === formModal) {
            closeFormModal();
        }
    });

    registrationButton.addEventListener('click', (e) => {

        e.preventDefault();
        openFormModal();

    })

    function clearErrors() {
        formItems.forEach((item) => {
            item.classList.remove("form__item--not-valid");
            const errorElement = item.querySelector(".error-message");
            if (errorElement) {
                errorElement.style.display = "none";
            }
        });
    }

    function addError(element, message) {
        const formItem = element.closest(".form__item");
        formItem.classList.add("form__item--not-valid");

    }

    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });

    function handleInputFocus(e) {
        const formItem = e.target.closest(".form__item");
        if (formItem) {
            formItem.classList.add("form__item--focused");

            const label = formItem.querySelector("label");
            if (label) {
                label.classList.add("label--focused");
            }
        }
    }

    function handleInputBlur(e) {
        const formItem = e.target.closest(".form__item");
        if (formItem) {
            formItem.classList.remove("form__item--focused");
            const label = formItem.querySelector("label");
            if (label) {
                label.classList.remove("label--focused");
            }
        }
    }

    function validateField(field) {
        const value = field.value.trim();
        const name = field.name;

        if (field.type === "checkbox") {
            if (!field.checked) {
                addError(field, "Необходимо ваше согласие");
                return false;
            }
            return true;
        }

        if (!value) {
            addError(field, "Это поле обязательно для заполнения");
            return false;
        }

        switch (name) {
            case "taxId":
                if (!/^\d{10,12}$/.test(value)) {
                    addError(field, "ИНН должен содержать 10 или 12 цифр");
                    return false;
                }
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    addError(field, "Введите корректный email");
                    return false;
                }
                break;
            case "phone":
                if (!/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value)) {
                    addError(field, "Введите корректный номер телефона");
                    return false;
                }
                break;
        }

        return true;
    }



    function showModal(title, text, buttonText) {
        const modal = document.querySelector(".modal");
        const modalWindow = modal.querySelector(".modal__window");
        const modalHeadline = modal.querySelector(".modal__headline");
        const modalText = modal.querySelector(".modal__text");
        const modalButton = modal.querySelector(".modal__button");
        const modalButtonTextFields = modalButton.querySelectorAll('.button__text')
        const modalClose = modal.querySelector(".modal__close");

        modalHeadline.textContent = title;
        if (typeof text === 'string') {
            modalText.textContent = text
        }
        else modalText.insertAdjacentElement('afterbegin', text);
        modalButtonTextFields.forEach(textField => {
            textField.textContent = buttonText;
        })


        modal.style.display = "flex";

        modalWindow.classList.add("animate__fadeInUp");
        modal.classList.add("animate__fadeIn");

        function closeModal() {
            modalWindow.classList.remove("animate__fadeInUp");
            modalWindow.classList.add("animate__fadeOutDown");
            modal.classList.remove("animate__fadeIn");
            modal.classList.add("animate__fadeOut");

            setTimeout(() => {
                modal.style.display = "none";
                modalWindow.classList.remove("animate__fadeOutDown");
                modal.classList.remove("animate__fadeOut");

                modalHeadline.textContent = "";
                modalText.textContent = "";
                modalButtonTextFields.forEach(textField => {
                    textField.textContent = '';
                })
            }, 500);
        }

        modalButton.addEventListener("click", closeModal);
        modalClose.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        let isValid = true;
        const fields = form.querySelectorAll("input:not([type=submit]), textarea");

        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!privacyCheckbox.checked) {
            addError(privacyCheckbox, "Необходимо ваше согласие");
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: form.elements.name.value.trim(),
                email: form.elements.email.value.trim(),
            };

            console.log("Данные формы:", formData);
            showModal("Регистрация прошла успешно", "Мы свяжемся с вами в ближайшее время", "Хорошо");


        }
    });

    privacyCheckbox.addEventListener("change", function () {
        if (this.checked) {
            this.closest(".form__item").classList.remove("form__item--not-valid");
            if (privacyError) privacyError.style.display = "none";
        }
    });

    form.addEventListener("input", function (e) {
        if (e.target.tagName === "INPUT") {
            const formItem = e.target.closest(".form__item");
            formItem.classList.remove("form__item--not-valid");
            const errorElement = formItem.querySelector(".error-message");
            if (errorElement) {
                errorElement.style.display = "none";
            }
        }
    });
});