const maxCleaning = 100000
const minCleaning = 80000
const rateService = 0.15
const rateFee = 0.04

const closeButton = document.getElementById('book-close')
const bookModal = document.getElementById('book-modal')

closeButton.addEventListener('click', () => {
    bookModal.style.visibility = 'hidden'
})

const calculateNights = (checkin, checkout) => {
    const day = 1000 * 60 * 60 * 24
    return Math.round((new Date(checkout) - new Date(checkin))/day)
}

const getPureNumber = (price) => {
    return +price.slice(1).replace(/,/g,'')
}

const getPriceFormat = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const [checkin, checkout, guest] = localStorage.getItem('condition').split(';')
const initializeBooking = () => {
    document.getElementById('date-checkin').innerHTML = checkin
    document.getElementById('date-checkout').innerHTML = checkout
    document.getElementById('book-guest').innerHTML = `게스트 ${guest}명`
}

initializeBooking()

const updateBooking = () => {
    const bookingPrice = document.getElementById('book-price')
    const bookingScore = document.getElementById('book-score')
    const bookingreview = document.getElementById('book-review')
    const price = localStorage.getItem('price')

    bookingPrice.innerHTML = price
    bookingScore.innerHTML = localStorage.getItem('score')
    bookingreview.innerHTML = ` (리뷰 ${localStorage.getItem('review')}개)`

    const nights = calculateNights(checkin, checkout)
    const multiplied = getPureNumber(price) * nights

    const cleaning = Math.floor(Math.random() * (maxCleaning - minCleaning)) + minCleaning
    const service = +(multiplied * rateService).toFixed(0)
    const fee = +(multiplied * rateFee).toFixed(0)
    const total = multiplied + cleaning + service + fee

    const costCalc = document.getElementById('cost-calc')
    const costMultiplied = document.getElementById('cost-multiplied')
    const costCleaning = document.getElementById('cost-cleaning')
    const costService = document.getElementById('cost-service')
    const costFee = document.getElementById('cost-fee')
    const costTotal = document.getElementById('cost-total')

    costCalc.innerHTML = `${price} x ${nights}박`
    costMultiplied.innerHTML = `₩${getPriceFormat(multiplied)}`
    costCleaning.innerHTML = `₩${getPriceFormat(cleaning)}`
    costService.innerHTML = `₩${getPriceFormat(service)}`
    costFee.innerHTML = `₩${getPriceFormat(fee)}`
    costTotal.innerHTML = `₩${getPriceFormat(total)}`
}

export {updateBooking, bookModal}