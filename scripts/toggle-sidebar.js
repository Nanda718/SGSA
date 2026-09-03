const sidebar = document.getElementById("sidebar");
const sidebarToggle = sidebar.querySelector(".toggle");

sidebarToggle.addEventListener("click", () => {

    sidebar.classList.toggle("close");

    if (sidebar.classList.contains("close")) {

        sidebarToggle.classList.remove("fa-chevron-left");
        sidebarToggle.classList.add("fa-chevron-right");

    } else {

        sidebarToggle.classList.remove("fa-chevron-right");
        sidebarToggle.classList.add("fa-chevron-left");

    }

});