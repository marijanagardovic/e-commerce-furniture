const toggleBtn = document.querySelector('.navbar-toggle');
const collapse = document.querySelector('.navbar-collapse');

toggleBtn.addEventListener('click', () => {
    collapse.classList.toggle('show-navbar');
})