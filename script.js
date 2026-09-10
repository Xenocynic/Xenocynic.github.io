const sidebar = document.querySelector("#filter-sidebar");
const backdrop = document.querySelector("#filter-backdrop");

const openButton = document.querySelector("#open-filters");
const closeButton = document.querySelector("#close-filters");

const checkboxes = document.querySelectorAll(
    '#filter-sidebar input[type="checkbox"]'
);

const projectCards = document.querySelectorAll(".project-card");

const clearButton = document.querySelector("#clear-filters");


function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
}


function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
}


function getSelectedFilters() {
    return [...checkboxes]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}


function filterProjects() {

    const selectedFilters = getSelectedFilters();

    projectCards.forEach(card => {

        const projectTags =
            card.dataset.tags.split(" ");

        const matches =
            selectedFilters.every(filter =>
                projectTags.includes(filter)
            );

        card.hidden = !matches;
    });

    saveFilters(selectedFilters);
}


function saveFilters(filters) {
    localStorage.setItem(
        "portfolioFilters",
        JSON.stringify(filters)
    );
}


function restoreFilters() {

    const savedFilters =
        JSON.parse(
            localStorage.getItem("portfolioFilters")
        ) ?? [];

    checkboxes.forEach(checkbox => {
        checkbox.checked =
            savedFilters.includes(checkbox.value);
    });

    filterProjects();
}


function clearFilters() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    filterProjects();
}


openButton.addEventListener("click", openSidebar);
closeButton.addEventListener("click", closeSidebar);
backdrop.addEventListener("click", closeSidebar);

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", filterProjects);
});

clearButton.addEventListener("click", clearFilters);


restoreFilters();