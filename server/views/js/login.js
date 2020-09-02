const modal = document.getElementById('modal')
const closeButton = document.getElementsByClassName('close-button')[0]

closeButton.addEventListener('click', () => {
    modal.style.display = "none"
})