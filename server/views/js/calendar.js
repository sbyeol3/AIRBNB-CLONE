const calendars = document.getElementsByClassName('calendar')

for (let calendar of calendars) {
    const calendarLayer = document.getElementById("calendar")
    calendar.addEventListener("click", () => {
        if (calendarLayer.style.visibility === "hidden") calendarLayer.style.visibility = "visible"
        else calendarLayer.style.visibility = "hidden"
    })
}

const thirty = [4,6,9,11]
const picker = document.getElementsByClassName('month')

for (let m of picker) {
    const month = m.getAttribute("month")
    let days = 31
    if (month === 2) days = 28
    else if (thirty.includes(+month)) days = 30

    const firstDay = new Date(2020, month-1, 1).getDay()
    const today = new Date().getDate()
    const thisMonth = new Date().getMonth() + 1

    let day = 0
    for (let i=0; i<6; i++) {
        let innerOfRow = ''
        for (let j=0; j<7; j++) {
            if (day === days) break
            else {
                if (i === 0 && day === 0 && firstDay !== j) innerOfRow += '<span class="day disable"></span>'
                else if (day < today - 1 && +month === thisMonth) innerOfRow += `<span class="day disable past">${day++ + 1}</span>`
                else innerOfRow += `<span class="day able" month=${month} day=${day+1}>${day++ + 1}</span>`
            }
        }
        const row = `<div class="week">${innerOfRow}</div>`
        m.innerHTML += row
    }
}

const ableElements = document.getElementsByClassName('able')
const selectedDate = {
    checkin: null,
    checkout: null
}

const getDateFormat = (el) => {
    const day = el.getAttribute('day')
    const month = el.getAttribute('month')
    return `2020-${+month < 10 ? '0' : ''}${month}-${+day < 10 ? '0' : ''}${day}`
}

const resetClassSelected = () => {
    const checkinElement = document.getElementsByClassName('sel-checkin')[0]
    checkinElement.classList.remove('sel-checkin')

    const checkoutElement = document.getElementsByClassName('sel-checkout')[0]
    if (checkoutElement) {
        checkoutElement.classList.remove('sel-checkout')
    }
}

const removeBgColor = () => {
    const dayElements = document.getElementsByClassName('sel-between')
    for (let i=0; i<dayElements.length;) {
        const el = dayElements[i]
        el.classList.remove('sel-between')
    }
}

const addBgColor = () => {
    const { checkin, checkout } = selectedDate
    const dayElements = document.getElementsByClassName('day')
    for (let el of dayElements) {
        const classOfElement = el.className.split(' ')
        const date = getDateFormat(el)
        if (checkin < date && date < checkout && !classOfElement.includes('disable')) {
            el.classList.add('sel-between')
        }
    }
}

const changeInner = () => {
    const inInput = document.getElementById('checkin-input')
    const outInput = document.getElementById('checkout-input')
    const {checkin, checkout} = selectedDate

    if (checkin) {
        inInput.innerHTML = checkin
        inInput.style.color = '#222'
    } else {
        inInput.innerHTML = '날짜 추가'
        inInput.style.color = '#777'
    }

    if (checkout) {
        outInput.innerHTML = checkout
        outInput.style.color = '#222'
    } else {
        outInput.innerHTML = '날짜 추가'
        outInput.style.color = '#777'
    }
}

const changeSelectedDate= (el) => {
    const date = getDateFormat(el)

    if (!selectedDate.checkin) {
        selectedDate.checkin = date
        el.classList.add('sel-checkin')
    } else if (!selectedDate.checkout && selectedDate.checkin < date) {
        selectedDate.checkout = date
        el.classList.add('sel-checkout')
        addBgColor()
    } else if (selectedDate.checkin === date) {
        selectedDate.checkin = null
        selectedDate.checkout = null
        resetClassSelected()
        removeBgColor()
    } else {
        selectedDate.checkin = date
        selectedDate.checkout = null
        resetClassSelected()
        removeBgColor()
        el.classList.add('sel-checkin')
    }
    changeInner()
    console.log(selectedDate)
}

for (let el of ableElements) {
    el.addEventListener('click', () => changeSelectedDate(el))
}