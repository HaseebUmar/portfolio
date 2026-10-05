/* =========================================================
   MUHAMMAD HASEEB — PORTFOLIO JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const html = document.documentElement;

const header = document.getElementById("header");

const navMenu = document.getElementById("navMenu");

const menuToggle = document.getElementById("menuToggle");

const themeToggle = document.getElementById("themeToggle");

const mobileThemeToggle =
    document.getElementById("mobileThemeToggle");

const currentYear =
    document.getElementById("currentYear");

const backTop =
    document.getElementById("backTop");

const contactForm =
    document.getElementById("contactForm");

const formFeedback =
    document.getElementById("formFeedback");


/* =========================================================
   PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 350);
    }

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   THEME
   ========================================================= */

function updateThemeIcons() {

    const theme =
        html.getAttribute("data-theme");

    const icons =
        document.querySelectorAll(".theme-icon");

    icons.forEach(icon => {

        icon.textContent =
            theme === "dark" ? "☀" : "☾";

    });

}


function setTheme(theme) {

    html.setAttribute("data-theme", theme);

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

    updateThemeIcons();

}


function toggleTheme() {

    const currentTheme =
        html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    setTheme(newTheme);

}


themeToggle?.addEventListener(
    "click",
    toggleTheme
);


mobileThemeToggle?.addEventListener(
    "click",
    toggleTheme
);


updateThemeIcons();


/* =========================================================
   SYSTEM THEME CHANGE
   ========================================================= */

const systemTheme =
    window.matchMedia("(prefers-color-scheme: dark)");


systemTheme.addEventListener("change", event => {

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (!savedTheme) {

        setTheme(
            event.matches ? "dark" : "light"
        );

    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMenu() {

    navMenu.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMenu() {

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuToggle?.addEventListener(
    "click",
    () => {

        const isOpen =
            navMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }
);


/* =========================================================
   NAVIGATION LINKS
   ========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* =========================================================
   HEADER SCROLL STATE
   ========================================================= */

function updateHeader() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT FILTER
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

                requestAnimationFrame(() => {

                    card.style.opacity = "1";
                    card.style.transform = "";

                });

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================================
   CONTACT FORM VALIDATION
   ========================================================= */

function setFieldError(
    fieldId,
    errorId,
    message
) {

    const field =
        document.getElementById(fieldId);

    const error =
        document.getElementById(errorId);


    if (!field || !error) {
        return;
    }


    const group =
        field.closest(".form-group");


    if (message) {

        group.classList.add("invalid");

        error.textContent = message;

    } else {

        group.classList.remove("invalid");

        error.textContent = "";

    }

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


function validateContactForm() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    let valid = true;


    setFieldError(
        "name",
        "nameError",
        ""
    );

    setFieldError(
        "email",
        "emailError",
        ""
    );

    setFieldError(
        "subject",
        "subjectError",
        ""
    );

    setFieldError(
        "message",
        "messageError",
        ""
    );


    if (name.length < 2) {

        setFieldError(
            "name",
            "nameError",
            "Please enter your name."
        );

        valid = false;

    }


    if (!validateEmail(email)) {

        setFieldError(
            "email",
            "emailError",
            "Please enter a valid email address."
        );

        valid = false;

    }


    if (subject.length < 3) {

        setFieldError(
            "subject",
            "subjectError",
            "Please enter a subject."
        );

        valid = false;

    }


    if (message.length < 10) {

        setFieldError(
            "message",
            "messageError",
            "Message should contain at least 10 characters."
        );

        valid = false;

    }


    return valid;

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        formFeedback.textContent = "";

        formFeedback.className =
            "form-feedback";


        if (!validateContactForm()) {

            formFeedback.textContent =
                "Please correct the highlighted fields.";

            formFeedback.classList.add(
                "error"
            );

            return;

        }


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        /*
            This is a frontend-only portfolio.

            Instead of pretending the message was sent,
            create a real email draft using mailto.
        */

        const body =
            `Hello Muhammad Haseeb,

My name is ${name}.

${message}

My email: ${email}`;


        const mailto =
            `mailto:m.haseeb.umer@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        formFeedback.textContent =
            "Your email draft is ready to open.";

        formFeedback.classList.add(
            "success"
        );


        window.location.href = mailto;

    }
);


/* =========================================================
   CLEAR FORM ERRORS WHILE TYPING
   ========================================================= */

const formInputs =
    contactForm?.querySelectorAll(
        "input, textarea"
    );


formInputs?.forEach(input => {

    input.addEventListener("input", () => {

        const group =
            input.closest(".form-group");

        const error =
            group.querySelector(".form-error");


        group.classList.remove("invalid");

        if (error) {
            error.textContent = "";
        }

    });

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* =========================================================
   CLOSE MOBILE MENU OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   PREVENT BROKEN IMAGE DISPLAY
   ========================================================= */

const profileImage =
    document.querySelector(".profile-image");


profileImage?.addEventListener(
    "error",
    () => {

        profileImage.style.display = "none";

        const frame =
            profileImage.closest(".profile-frame");


        if (frame) {

            frame.style.background =
                "linear-gradient(135deg, var(--accent-soft), var(--card))";

            const placeholder =
                document.createElement("div");

            placeholder.className =
                "profile-placeholder";

            placeholder.textContent =
                "MH";

            placeholder.style.cssText = `
                position:absolute;
                inset:12px;
                display:grid;
                place-items:center;
                font-family:var(--font-heading);
                font-size:clamp(4rem,10vw,7rem);
                font-weight:800;
                color:var(--accent);
                background:var(--bg);
            `;

            frame.appendChild(placeholder);

        }

    }
);