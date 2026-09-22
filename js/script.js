/* =========================================================
   TRIDEV PATEL — PORTFOLIO SCRIPT
   Premium Gold × White × Deep Forest Theme
========================================================= */

"use strict";

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initActiveNavigation();
    initRippleEffect();
    initHeroParallax();
    initTiltCards();
    initNetworkAnimation();

    // HERO TYPING ANIMATION
    initTypingEffect();

    document.body.classList.add("page-loaded");
});


/* =========================================================
   HERO TYPING ANIMATION
========================================================= */

function initTypingEffect() {

    const typingText = document.querySelector("#typingText");

    if (!typingText) return;

    const roles = [
        "Embedded Systems",
        "AI Solutions",
        "IoT Systems",
        "Smart Devices",
        "Firmware",
        "Automation Projects"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;
            }

            setTimeout(typeEffect, 80);

        } else {

            typingText.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;

                setTimeout(typeEffect, 500);

                return;
            }

            setTimeout(typeEffect, 45);
        }
    }

    typeEffect();
}


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        preloader.classList.add("loaded");

        setTimeout(() => {

            preloader.style.display = "none";

        }, 500);

    });
}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const currentScroll =
            window.pageYOffset ||
            document.documentElement.scrollTop;

        if (currentScroll > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

        if (
            currentScroll > lastScroll &&
            currentScroll > 150
        ) {

            navbar.classList.add("nav-hidden");

        } else {

            navbar.classList.remove("nav-hidden");

        }

        lastScroll = currentScroll;

    }, { passive: true });
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const nav =
        document.querySelector(".nav-menu") ||
        document.querySelector(".nav-links") ||
        document.querySelector(".nav ul");

    if (!nav) return;

    let toggle =
        document.querySelector(".menu-toggle");

    if (!toggle) {

        toggle =
            document.createElement("button");

        toggle.className = "menu-toggle";

        toggle.setAttribute(
            "aria-label",
            "Toggle navigation"
        );

        toggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        const navbar =
            document.querySelector(".navbar");

        if (navbar) {

            navbar.appendChild(toggle);

        }
    }

    function closeMenu() {

        nav.classList.remove(
            "open",
            "active"
        );

        toggle.classList.remove(
            "open",
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }

    toggle.addEventListener("click", (event) => {

        event.stopPropagation();

        nav.classList.toggle("open");
        nav.classList.toggle("active");

        toggle.classList.toggle("open");
        toggle.classList.toggle("active");

        document.body.classList.toggle(
            "menu-open"
        );

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });

    document.addEventListener("click", (event) => {

        if (!nav.contains(event.target) &&
            !toggle.contains(event.target)
        ) {

            closeMenu();

        }

    });

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .fade-up, .animate-on-scroll, section"
        );

    if (!elements.length) return;

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible",
                            "active",
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

    elements.forEach(element => {

        observer.observe(element);

    });
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (!targetId ||
                        targetId === "#"
                    ) return;

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const navbar =
                        document.querySelector(
                            ".navbar"
                        );

                    const navHeight =
                        navbar ?
                        navbar.offsetHeight :
                        0;

                    const targetPosition =
                        target.getBoundingClientRect()
                        .top +
                        window.pageYOffset -
                        navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (!sections.length ||
        !links.length
    ) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const id =
                        entry.target.getAttribute(
                            "id"
                        );

                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            }, {
                threshold: 0.35
            }
        );

    sections.forEach(section => {

        observer.observe(section);

    });
}


/* =========================================================
   RIPPLE EFFECT
========================================================= */

function initRippleEffect() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".btn, button, .ripple"
                );

            if (!button) return;

            const rect =
                button.getBoundingClientRect();

            const ripple =
                document.createElement(
                    "span"
                );

            ripple.className =
                "ripple-effect";

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX -
                    rect.left -
                    size / 2}px`;

            ripple.style.top =
                `${event.clientY -
                    rect.top -
                    size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 650);

        }
    );
}


/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;

    if (window.innerWidth <= 768)
        return;

    const heroContent =
        document.querySelector(
            ".hero-content"
        );

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    if (!heroContent &&
        !heroVisual
    ) return;

    let ticking = false;

    window.addEventListener(
        "mousemove",
        event => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);

                if (heroContent) {

                    heroContent.style.transform =
                        `translate3d(${x * -8}px, ${y * -6}px, 0)`;

                }

                if (heroVisual) {

                    heroVisual.style.transform =
                        `translate3d(${x * 10}px, ${y * 8}px, 0)`;

                }

                ticking = false;

            });

        }, { passive: true }
    );
}


/* =========================================================
   TILT CARDS
========================================================= */

function initTiltCards() {

    if (
        window.innerWidth <= 768 ||
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) return;

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .service-card, .tilt-card"
        );

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    centerY *
                    -4;

                const rotateY =
                    (x - centerX) /
                    centerX *
                    4;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });
}


/* =========================================================
   NETWORK BACKGROUND
========================================================= */

function initNetworkAnimation() {

    const canvas =
        document.createElement("canvas");

    canvas.id = "network-canvas";

    const glow =
        document.createElement("div");

    glow.className =
        "network-glow";

    document.body.prepend(canvas);
    document.body.prepend(glow);

    const ctx =
        canvas.getContext(
            "2d", {
                alpha: true,
                desynchronized: true
            }
        );

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes = [];

    let animationFrame = null;

    let running = true;

    const mouse = {
        x: null,
        y: null
    };

    const isMobile = () =>
        window.innerWidth <= 768;

    const settings = {

        desktopNodes: 42,

        mobileNodes: 18,

        desktopDistance: 165,

        mobileDistance: 125,

        speed: 0.12

    };


    function resize() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                1.5
            );

        canvas.width =
            Math.floor(
                width * dpr
            );

        canvas.height =
            Math.floor(
                height * dpr
            );

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createNodes();
    }


    function createNodes() {

        const total =
            isMobile() ?
            settings.mobileNodes :
            settings.desktopNodes;

        nodes = [];

        for (
            let i = 0; i < total; i++
        ) {

            nodes.push({

                x: Math.random() *
                    width,

                y: Math.random() *
                    height,

                vx:
                    (Math.random() - 0.5) *
                    settings.speed,

                vy:
                    (Math.random() - 0.5) *
                    settings.speed,

                radius: Math.random() *
                    1.2 +
                    0.8,

                pulse: Math.random() *
                    Math.PI *
                    2,

                pulseSpeed: Math.random() *
                    0.015 +
                    0.008

            });

        }
    }


    window.addEventListener(
        "mousemove",
        event => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        }, {
            passive: true
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;

            mouse.y = null;

        }
    );


    function updateNodes() {

        for (const node of nodes) {

            node.x += node.vx;

            node.y += node.vy;

            node.pulse +=
                node.pulseSpeed;


            if (
                node.x < -10 ||
                node.x > width + 10
            ) {

                node.vx *= -1;

            }


            if (
                node.y < -10 ||
                node.y > height + 10
            ) {

                node.vy *= -1;

            }

        }
    }


    function drawConnection(
        a,
        b,
        distance,
        maxDistance
    ) {

        const opacity =
            1 -
            distance /
            maxDistance;

        if (opacity <= 0)
            return;

        ctx.beginPath();

        ctx.moveTo(
            a.x,
            a.y
        );

        ctx.lineTo(
            b.x,
            b.y
        );

        ctx.strokeStyle =
            `rgba(
                212,
                175,
                55,
                ${opacity * 0.28}
            )`;

        ctx.lineWidth =
            0.65;

        ctx.stroke();
    }


    function drawNode(node) {

        const pulse =
            Math.sin(
                node.pulse
            ) * 0.35;

        const radius =
            node.radius +
            pulse;

        ctx.beginPath();

        ctx.arc(
            node.x,
            node.y,
            Math.max(
                0.7,
                radius
            ),
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#f5d76e";

        ctx.fill();
    }


    function drawMouseConnections() {

        if (
            mouse.x === null
        ) return;

        const mouseDistance =
            isMobile() ?
            0 :
            190;

        for (
            const node of nodes
        ) {

            const dx =
                mouse.x -
                node.x;

            const dy =
                mouse.y -
                node.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance <
                mouseDistance
            ) {

                const opacity =
                    1 -
                    distance /
                    mouseDistance;

                ctx.beginPath();

                ctx.moveTo(
                    node.x,
                    node.y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );

                ctx.strokeStyle =
                    `rgba(
                        245,
                        215,
                        110,
                        ${opacity * 0.35}
                    )`;

                ctx.lineWidth =
                    0.7;

                ctx.stroke();
            }
        }
    }


    function animate() {

        if (!running) {

            animationFrame =
                null;

            return;
        }

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateNodes();

        const maxDistance =
            isMobile() ?
            settings.mobileDistance :
            settings.desktopDistance;


        for (
            let i = 0; i < nodes.length; i++
        ) {

            for (
                let j = i + 1; j < nodes.length; j++
            ) {

                const a =
                    nodes[i];

                const b =
                    nodes[j];

                const dx =
                    a.x -
                    b.x;

                const dy =
                    a.y -
                    b.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    maxDistance
                ) {

                    drawConnection(
                        a,
                        b,
                        distance,
                        maxDistance
                    );

                }

            }
        }


        drawMouseConnections();


        for (
            const node of nodes
        ) {

            drawNode(node);

        }


        animationFrame =
            requestAnimationFrame(
                animate
            );
    }


    document.addEventListener(
        "visibilitychange",
        () => {

            running = !document.hidden;

            if (
                running &&
                !animationFrame
            ) {

                animate();

            }

        }
    );


    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        resize();

                    },
                    150
                );

        }, {
            passive: true
        }
    );


    resize();

    animate();
}


/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "Portfolio JS error:",
            event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        console.warn(
            "Portfolio promise error:",
            event.reason
        );

    }
);