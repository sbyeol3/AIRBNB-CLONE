const modal = document.getElementById('register-modal')
if (modal.getAttribute("isDuplicated")) modal.style.visibility = "visible"
const submitButton = document.getElementById('register-button')
const { month, day, year } = document.getElementsByTagName("select")

const checkDisabled = () => {
    const errors = document.getElementsByClassName('wrong-input')
    if (errors.length > 0) submitButton.setAttribute("disabled", true)
    else {
        if (month.value !== '월' && day.value !== '일' && year.value !== '년') submitButton.removeAttribute('disabled')
        else submitButton.setAttribute("disabled", true)
    }
}

const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
const registerForm = document.getElementById("register-form")
const inputs = document.getElementsByClassName('register-input')

const condition = {
    email: {regexp: emailRegExp},
    name: {length: 1},
    lastName: {length: 1},
    password: {length: 6}
}

const birthday = [
    {tag: month, text: '월', add: '월', start: 1, end: 12},
    {tag: day, text: '일', start: 1, end: 31, minus: [2,4,6,9,11]},
    {tag: year, text: '년', start: 2020, end: 1900, reverse: true},
]

const checkCondition = (tag, name, value) => {
    const {regexp, length} = condition[name]
    if (regexp && !value.match(regexp)) tag.classList.add('wrong-input')
    else if (length && value.length < length) tag.classList.add('wrong-input')
    else tag.classList.remove('wrong-input')
    checkDisabled()
}

for (let tag of inputs) {
    const { name } = tag
    tag.addEventListener("change", ({target}) => {
        const { value } = target
        checkCondition(tag, name, value)
    })
}

for (let item of birthday) {
    const {tag, text, add='', start, end, reverse = false} = item
    if (reverse) {
        for (let i = start+1; i > end - 1; i--) {
            const inner = (i === start+1) ? `<option disabled selected>${text}</option>` : `<option value=${i}>${i}${add}</option>`
            tag.innerHTML += inner
        }
    } else {
        for (let i = start-1; i<= end; i++) {
            const inner = (i === start-1) ? `<option disabled selected>${text}</option>` : `<option value=${i}>${i}${add}</option>`
            tag.innerHTML += inner
        }
    }
    tag.addEventListener("change", () => checkDisabled())
}
