document.addEventListener('DOMContentLoaded', () => {
    const dotsMenu = document.querySelector(".dots-menu");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const dropdowns = document.querySelectorAll(".dropdown a");

    // เปิดเมนู
    dotsMenu?.addEventListener("click", () => {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // ปิดเมนูด้วย overlay
    menuOverlay?.addEventListener("click", () => {
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

    // สร้างตะกร้าเริ่มต้นถ้ายังไม่มี
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({
            items: [],
            subtotal: 0,
            shipping: 0,
            total: 0
        }));
    }
});

// ฟังก์ชันเพิ่มสินค้าลงตะกร้า
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    
    // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือไม่
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push(product);
    }
    
    // คำนวณยอดรวมใหม่
    cart.total = calculateTotal(cart.items);
    
    // บันทึกลง localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // อัพเดทจำนวนในไอคอนตะกร้า
    updateCartCount();
    
    // แสดง notification
    showNotification('Added to cart!');
}

// คำนวณยอดรวม
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// อัพเดทจำนวนในไอคอนตะกร้า
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// แสดง notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// เรียกใช้ตอนโหลดหน้า
document.addEventListener('DOMContentLoaded', updateCartCount);
// ฟังก์ชันเพิ่มสินค้าลงตะกร้า (ประกาศนอก DOMContentLoaded)
function addToCart(data) {
    try {
        // ดึงข้อมูลตะกร้าปัจจุบัน
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart || !cart.items) {
            cart = {
                items: [],
                subtotal: 0,
                shipping: 0,
                total: 0
            };
        }

        // เพิ่มสินค้าใหม่หรือเพิ่มจำนวน
        const existingItem = cart.items.find(item => item.id === data.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({...data, quantity: 1});
        }

        // คำนวณยอดรวม
        cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.shipping = cart.subtotal > 0 ? 30 : 0;
        cart.total = cart.subtotal + cart.shipping;

        // บันทึกลง localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // อัพเดทจำนวนในไอคอนตะกร้า
        updateCartCount();

        // แจ้งเตือน
        Swal.fire({
            title: 'เพิ่มสินค้าสำเร็จ!',
            text: `เพิ่ม ${data.name} ลงในตะกร้าแล้ว`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'ไปที่ตะกร้า',
            cancelButtonText: 'เลือกซื้อต่อ'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'cart.html';
            }
        });

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด!',
            text: error.message
        });
    }
}

// ฟังก์ชันอัพเดทจำนวนในตะกร้า
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// เรียกใช้ updateCartCount เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', updateCartCount);