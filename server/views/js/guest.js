const guestInput = document.getElementById('guest')

const controlGuestLayer = () => {
    const guestLayer = document.getElementById('guest-layer')
    const calendarLayer = document.getElementById("calendar")
    if (guestLayer.style.visibility === "hidden") {
        guestLayer.style.visibility = "visible"
        calendarLayer.style.visibility = "hidden"
    } else guestLayer.style.visibility = "hidden"
}
guestInput.addEventListener('click', () => controlGuestLayer())

const guestCountElements = document.getElementsByClassName('guest-count')
const guestCount = {
    adults: 0,
    children: 0,
    infants: 0
}

const handleMinusButton = (childNodes) => {
    const minusButton = childNodes[0]
    const numElement = childNodes[1]
    if (+numElement.getAttribute('value') === 0) {
        minusButton.setAttribute('disabled', true)
    } else if (minusButton.getAttribute('disabled')) {
        minusButton.removeAttribute('disabled')
    }
}

const onClickMinus = (numElement, type) => {
    const currentValue = +numElement.getAttribute('value')
    numElement.setAttribute('value', currentValue - 1)
    numElement.innerHTML = currentValue - 1
    guestCount[type] -= 1
    changeGuestText()
}

const onClickPlus = (numElement, type) => {
    const currentValue = +numElement.getAttribute('value')
    numElement.setAttribute('value', currentValue + 1)
    numElement.innerHTML = currentValue + 1
    guestCount[type] += 1
    changeGuestText()
}

const onClickPlusMinors = (adultElement, numElement, type) => {
    const numElementOfAdults = adultElement.childNodes[1]
    const adultsCount = +numElementOfAdults.getAttribute('value')
    if (adultsCount === 0) {
        onClickPlus(numElementOfAdults, 'adults')
        handleMinusButton(adultElement.childNodes)
    }
    onClickPlus(numElement, type)
}

const changeGuestText = () => {
    const guest = guestCount.adults + guestCount.children
    const { infants } = guestCount
    const guestInput = document.getElementById('guest-input')

    if (!guest && !infants) {
        guestInput.innerHTML = '게스트 추가'
        guestInput.style.color = '#777'
    }
    else if (guest && !infants) {
        guestInput.innerHTML = `게스트 ${guest}명`
        guestInput.style.color = '#222'
    } else {
        guestInput.innerHTML = `게스트 ${guest}명, 유아 ${infants}명`
        guestInput.style.color = '#222'
    }
}

for (let countElement of guestCountElements) {
    const { childNodes } = countElement
    const guestType = countElement.getAttribute('guestType')
    const minusButton = childNodes[0]
    const numElement = childNodes[1]
    const plusButton = childNodes[2]

    handleMinusButton(childNodes)
    minusButton.addEventListener('click', () => {
        onClickMinus(numElement, guestType)
        handleMinusButton(childNodes)
    })
    plusButton.addEventListener('click', () => {
        if (guestType !== 'adults') {
            onClickPlusMinors(guestCountElements[0], numElement, guestType)
        } else onClickPlus(numElement, guestType)
        handleMinusButton(childNodes, guestType)
    })
}

export {guestCount}