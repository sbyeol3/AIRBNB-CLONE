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

const handleMinusButton = (childNodes) => {
    const minusButton = childNodes[0]
    const numElement = childNodes[1]
    if (+numElement.getAttribute('value') === 0) {
        minusButton.setAttribute('disabled', true)
    } else if (minusButton.getAttribute('disabled')) {
        minusButton.removeAttribute('disabled')
    }
}

const onClickMinus = (numElement) => {
    const currentValue = +numElement.getAttribute('value')
    numElement.setAttribute('value', currentValue - 1)
    numElement.innerHTML = currentValue - 1
}

const onClickPlus = (numElement) => {
    const currentValue = +numElement.getAttribute('value')
    numElement.setAttribute('value', currentValue + 1)
    numElement.innerHTML = currentValue + 1
}

for (let countElement of guestCountElements) {
    const { childNodes } = countElement
    const minusButton = childNodes[0]
    const numElement = childNodes[1]
    const plusButton = childNodes[2]

    handleMinusButton(childNodes)
    minusButton.addEventListener('click', () => {
        onClickMinus(numElement)
        handleMinusButton(childNodes)
    })
    plusButton.addEventListener('click', () => {
        onClickPlus(numElement)
        handleMinusButton(childNodes)
    })
}