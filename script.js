document.addEventListener('DOMContentLoaded', () => {
    const dotsMenu = document.querySelector(".dots-menu");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const dropdowns = document.querySelectorAll(".dropdown a");

    // เปิดเมนู
    dotsMenu.addEventListener("click", () => {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // ปิดเมนูด้วย overlay
    menuOverlay.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // Toggle dropdown arrows
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", (e) => {
            e.preventDefault();
            const arrow = dropdown.querySelector("i");
            arrow.style.transform = arrow.style.transform === "rotate(180deg)" 
                ? "rotate(0deg)" 
                : "rotate(180deg)";
        });
    });
});