document.addEventListener("DOMContentLoaded", function() {
    let currentUrl = window.location.pathname; // Ambil path URL saat ini

    document.querySelectorAll(".nav-sidebar a").forEach((link) => {
        // Cek apakah href link sesuai dengan URL yang sedang dibuka
        if (link.getAttribute("href") === currentUrl) {
            // Tambahkan class active ke link yang sesuai
            link.classList.add("active");

            // Dapatkan parent <li class="nav-item">
            let parentNavItem = link.closest(".nav-item");

            if (parentNavItem) {
                parentNavItem.classList.add("menu-open");

                // Cek apakah parent ini ada di dalam menu lebih tinggi (untuk menu yang punya dropdown)
                let parentTreeView = parentNavItem.closest(".nav-treeview");
                if (parentTreeView) {
                    let mainMenu = parentTreeView.closest(".nav-item");
                    if (mainMenu) {
                        mainMenu.classList.add("menu-open");
                        mainMenu.querySelector("a").classList.add("active");
                    }
                }
            }
        }
    });
});