document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    // Toggle menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
    });

    // ปิดเมนูเมื่อคลิก overlay
    menuOverlay.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // ปิดเมนูเมื่อคลิกที่ลิงก์
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });
});
