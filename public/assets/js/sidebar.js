document.addEventListener("DOMContentLoaded", function() {
    let currentUrl = window.location.pathname; // Ambil path URL saat ini

    document.querySelectorAll(".nav-sidebar a").forEach((link) => {
        let linkHref = link.getAttribute("href");

        // Pastikan href bukan null dan cocok dengan path saat ini
        if (linkHref && (currentUrl.startsWith(linkHref) || currentUrl === linkHref)) {
            link.classList.add("active");

            let parentNavItem = link.closest(".nav-item");
            if (parentNavItem) {
                parentNavItem.classList.add("menu-open");

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
