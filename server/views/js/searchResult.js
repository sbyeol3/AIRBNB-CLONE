import {initializeBooking} from '/js/book.js'

const conditionButtons = document.getElementsByClassName('condition')
const selected = {
    current: null
}

for (let btn of conditionButtons) {
    btn.addEventListener(('click'), () => {
        if (selected.current === btn) {
            selected.current = null
        } else  {
            if (selected.current) {
                const { current } = selected
                current.removeAttribute('selected')
            }
            selected.current = btn
        }
        btn.toggleAttribute('selected')
    })
}

const bookButtons = document.querySelectorAll('.booking')

const fetchAccommodation = (id) => {
    fetch(`/search/accommodation?id=${id}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        const {price, score, review} = data
        localStorage.setItem('price', price)
        localStorage.setItem('score', score)
        localStorage.setItem('review', review)
    })
    .then(() => {
        const bookModal = document.getElementById('book-modal')
        bookModal.style.visibility = 'visible'
        initializeBooking()
    })
    .catch((err) => console.log(err))
}

const checkin = localStorage.getItem('condition').split(';')[0]
bookButtons.forEach((btn) => {
    const id = btn.getAttribute('id')
    if (checkin === '날짜 추가') btn.setAttribute('disabled', true)
    btn.addEventListener('click', () => fetchAccommodation(id))
})