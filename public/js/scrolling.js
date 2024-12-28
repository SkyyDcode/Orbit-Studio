// scrolling.js

/**
 * Smooth scroll to target element with animation.
 * @param {string} targetSelector - The CSS selector of the target element.
 * @param {number} duration - Duration of the scroll animation in milliseconds.
 */
function smoothScrollTo(targetSelector, duration) {
  const targetElement = document.querySelector(targetSelector);

  if (!targetElement) {
    console.error(`Target element not found: ${targetSelector}`);
    return;
  }

  const startPosition = window.pageYOffset;
  const targetPosition =
    targetElement.getBoundingClientRect().top + startPosition;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress; // Easing function
    const scrollTo = startPosition + distance * easeInOutQuad;

    window.scrollTo(0, scrollTo);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-scroll-to]");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const target = button.getAttribute("data-scroll-to");
      const duration =
        parseInt(button.getAttribute("data-duration"), 10) || 1000;
      smoothScrollTo(target, duration);
    });
  });
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Fungsi helper untuk mengecek keberadaan elemen
    const animateIfExists = (selector, animation) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            animation(elements);
        }
    };

    // Text split animation dengan responsive handling
    const initTextSplit = () => {
        let typeSplit;

        const createSplit = () => {
            // Revert existing split jika ada
            if (typeSplit) {
                typeSplit.revert();
            }

            // Buat split baru
            typeSplit = new SplitType('[animate]', {
                types: 'lines, words, chars',
                tagName: 'span'
            });

            // Reset dan jalankan animasi
            gsap.set('[animate] .word', { 
                y: '110%',
                opacity: 0,
                rotationZ: '10'
            });

            gsap.to('[animate] .word', {
                y: '0%',
                opacity: 1,
                rotationZ: '0',
                duration: 0.3,
                ease: 'power1.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '[animate]',
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                }
            });
        };

        // Initial split
        createSplit();

        // Debounce function untuk resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                createSplit();
            }, 250);
        });
    };

    // Animasi untuk header
    animateIfExists("header h1", (elements) => {
        gsap.from(elements, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: "header",
                start: "top center",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });

    // Animasi untuk feature cards
    animateIfExists(".feature-card", (elements) => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.from(elements, {
                x: -100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });
    });

    // Animasi untuk step cards
    animateIfExists(".step-card", (elements) => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.from(elements, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: {
                    each: 0.2,
                    from: "start"
                },
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.from(elements, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });
    });

    // Animasi untuk judul section
    animateIfExists(".fade-in", (elements) => {
        gsap.from(elements, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: elements,
                start: "top center+=100",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });

    // Animasi untuk testimonial cards
    animateIfExists(".testimonial-card", (elements) => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.from(elements, {
                y: 30,
                scale: 0.95,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: elements,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
        });
    });

    // Animasi untuk social icons
    animateIfExists(".social-icon", (elements) => {
        gsap.from(elements, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".social-icons",
                start: "top center+=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animasi untuk footer links
    animateIfExists(".footer-links ul", (elements) => {
        gsap.from(elements, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".footer-menu",
                start: "top center+=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animasi untuk footer (ditambahkan di sini)
    const initFooterAnimations = () => {
        // Animasi untuk header footer
        animateIfExists("footer header", (elements) => {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: "footer",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        });

        // Animasi untuk judul "INTERESTED IN LEARNING MORE?"
        animateIfExists("footer h2", (elements) => {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: "footer",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.2
            });
        });

        // Animasi untuk "Connect with us"
        animateIfExists("footer h1", (elements) => {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: "footer",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.4
            });
        });

        // Animasi untuk setiap kolom footer
        animateIfExists("footer main > div > div", (elements) => {
            elements.forEach((column, index) => {
                gsap.from(column, {
                    scrollTrigger: {
                        trigger: column,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2 * (index + 1)
                });
            });
        });

        // Animasi hover untuk link-link di footer
        const footerLinks = document.querySelectorAll("footer a, footer p");
        footerLinks.forEach(link => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, {
                    x: 10,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });

            link.addEventListener("mouseleave", () => {
                gsap.to(link, {
                    x: 0,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
        });
    };

    // Initialize text split animation
    initTextSplit();
    
    // Initialize footer animations
    initFooterAnimations();
});
