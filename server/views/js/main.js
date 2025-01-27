const hamburger = document.getElementById('hamburger')
const register = document.getElementById('register-open')
const login = document.getElementById('login-open')
const userMenu = document.getElementById('user-menu')

const toggleUserMenu = () => {
    if (userMenu.style.visibility === "hidden") userMenu.style.visibility = "visible"
    else userMenu.style.visibility = "hidden"
}

const openRegisterModal = () => {
    const registerModal = document.getElementById('register-modal')
    registerModal.style.visibility = 'visible'
}

const openLoginModal = () => {
    const loginModal = document.getElementById('login-modal')
    loginModal.style.visibility = 'visible'
}

hamburger.addEventListener('click', () => toggleUserMenu())
register.addEventListener('click', () => openRegisterModal())
login.addEventListener('click', () => openLoginModal())
document.body.addEventListener('click', ({path}) => {
    if (!path.includes(hamburger) && !path.includes(userMenu)) {
        if (userMenu.style.visibility === 'visible') userMenu.style.visibility = "hidden"
    }
})