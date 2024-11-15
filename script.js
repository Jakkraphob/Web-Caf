const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// เพิ่ม index ให้กับแต่ละ menu item สำหรับ animation
navLinks.forEach((link, index) => {
    link.style.setProperty('--i', index);
});

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// เพิ่ม hover effect สำหรับ logo
const logo = document.querySelector(".logo");
logo.addEventListener("mouseover", () => {
    logo.style.transform = "scale(1.1)";
});
logo.addEventListener("mouseout", () => {
    logo.style.transform = "scale(1)";
});
