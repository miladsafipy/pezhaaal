

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.querySelector(".overlay");

    // تمام دکمه های باز کننده
    const toggles = document.querySelectorAll(".panel-toggle");

    // تمام پنل ها
    const panels = document.querySelectorAll(
        ".search-bar, .mobile-menu, .cart-drawer, .auth"
    );

    //--------------------------------------------------
    // بستن همه پنل ها
    //--------------------------------------------------
    function closeAllPanels() {

        panels.forEach(panel => {
            panel.classList.remove("active");
        });

        overlay.classList.remove("active");
    }

    //--------------------------------------------------
    // باز کردن یک پنل
    //--------------------------------------------------
    function openPanel(panel) {

        closeAllPanels();

        panel.classList.add("active");
        overlay.classList.add("active");
    }

    //--------------------------------------------------
    // کلیک روی آیکون ها
    //--------------------------------------------------
    toggles.forEach(btn => {

        btn.addEventListener("click", () => {

            const panel = document.querySelector(btn.dataset.target);

            if (!panel) return;

            // اگر باز بود، ببند
            if (panel.classList.contains("active")) {
                closeAllPanels();
            }

            // اگر بسته بود، باز کن
            else {
                openPanel(panel);
            }

        });

    });

    //--------------------------------------------------
    // بستن با Overlay
    //--------------------------------------------------
    overlay.addEventListener("click", closeAllPanels);

    //--------------------------------------------------
    // دکمه های Close
    //--------------------------------------------------
    document.addEventListener("click", e => {

        if (
            e.target.closest(".close-btn") ||
            e.target.closest(".close-cart") ||
            e.target.closest(".close-mobile")
        ) {
            closeAllPanels();
        }

    });

});