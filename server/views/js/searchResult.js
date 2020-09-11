import {updateBooking, bookModal} from '/js/book.js'

const conditionButtons = document.getElementsByClassName('condition')
const selected = { current: null }

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

const fetchAccommodation = async (id) => {
    const rawResponse = await fetch(`/search/accommodation?id=${id}`)
    const jsonData = await rawResponse.json()

    const {price, score, review} = jsonData
    await localStorage.setItem('price', price)
    await localStorage.setItem('score', score)
    await localStorage.setItem('review', review)

    bookModal.style.visibility = 'visible'
    updateBooking()
}

const bookButtons = document.querySelectorAll('.booking')
const checkin = localStorage.getItem('condition').split(';')[0]
const guest = localStorage.getItem('condition').split(';')[2]

bookButtons.forEach((btn) => {
    const id = btn.getAttribute('id')
    if (checkin === '날짜 추가' || guest === '0') btn.setAttribute('disabled', true)
    btn.addEventListener('click', () => fetchAccommodation(id))
})