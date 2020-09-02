const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
const registerForm = document.getElementById("register-form")
const inputs = document.getElementsByTagName("input")

console.log(inputs)

const condition = {
    email: {regexp: emailRegExp},
    name: {length: 1},
    lastName: {length: 1},
    password: {length: 6}
}

const checkCondition = (tag, name, value) => {
    const {regexp, length} = condition[name]
    if (regexp && !value.match(regexp)) tag.classList.add('wrong-input')
    else if (length && value.length < length) tag.classList.add('wrong-input')
    else tag.classList.remove('wrong-input')
}

for (let tag of inputs) {
    const { name } = tag
    tag.addEventListener("change", ({target}) => {
        const { value } = target
        console.log(tag, name, value)
        checkCondition(tag, name, value)
    })
}