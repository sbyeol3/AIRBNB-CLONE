import {guestCount} from '/js/guest.js';

const searchButton = document.getElementById('search-button')
const handleInvalidLocation = () => {

}

searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    const location = document.getElementById('location').value
    if (!location) return handleInvalidLocation()

    let queryString = `?location=${location}`
    const checkin = document.getElementById('checkin-input').innerHTML
    const checkout = document.getElementById('checkout-input').innerHTML
    const query = {checkin, checkout, ...guestCount}

    for (let [key, value] of Object.entries(query)) {
        if (value && value !== '날짜 추가') queryString += `&${key}=${value}`
    }
    window.location.href = `/search${queryString}`
})