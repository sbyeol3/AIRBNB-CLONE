import {guestCount} from '/js/guest.js';

const initializeSearch = () => {
    const searchButton = document.getElementById('search-button')

    searchButton.addEventListener('click', (event) => {
        event.preventDefault()
        const location = document.getElementById('location').value.trim()
        if (!location) return handleInvalidLocation()
    
        let queryString = `?location=${location}`
        const checkin = document.getElementById('checkin-input').innerHTML
        const checkout = document.getElementById('checkout-input').innerHTML
        const query = {checkin, checkout, ...guestCount}
    
        for (let [key, value] of Object.entries(query)) {
            if (value && value !== '날짜 추가') queryString += `&${key}=${value}`
        }
        localStorage.setItem('condition', `${checkin};${checkout};${guestCount.adults+guestCount.children}`)
        window.location.href = `/search${queryString}`
    })
}

initializeSearch()