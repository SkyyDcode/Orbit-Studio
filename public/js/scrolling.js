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
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeInOutQuad = progress < 0.5
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

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const target = button.getAttribute("data-scroll-to");
            const duration = parseInt(button.getAttribute("data-duration"), 10) || 1000;
            smoothScrollTo(target, duration);
        });
    });
});
