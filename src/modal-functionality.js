const modalBtn = document.querySelector('#modal-btn');

modalBtn.addEventListener('click', function() {
    this.parentElement.classList.add('hide');
});