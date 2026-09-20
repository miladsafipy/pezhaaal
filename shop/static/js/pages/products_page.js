// ===========================
//         ELEMENTS
// ===========================
filterToggle = document.querySelector('.filter-toggle');
filterSidebar = document.querySelector('.filters');
filterOverlay = document.querySelector('.filter-overlay');





// ===========================
//         FUNCTIONS
// ===========================
function openFilter(){
    filterSidebar.clssList.add('active');
    filterOverlay.classList.add('active');
}

function closeFilter(){
    filterSidebar.clssList.remove('active');
    filterOverlay.classList.remove('active');
}






// ===========================
//         EVENTS
// ===========================
filterToggle.addEventListener("click", openFilter);
filterOverlay.addEventListener("click", closeFilter);