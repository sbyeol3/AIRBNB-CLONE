const hamburger = document.getElementById('hamburger')
const register = document.getElementById('register-open')
const login = document.getElementById('login-open')

const toggleUserMenu = () => {
    const userMenu = document.getElementById('user-menu')
    if (userMenu.style.display === "none") userMenu.style.display = "block"
    else userMenu.style.display = "none"
}

const openRegisterModal = () => {
    const registerModal = document.getElementById('register-modal')
    registerModal.style.display = 'block'
}

const openLoginModal = () => {
    const loginModal = document.getElementById('login-modal')
    loginModal.style.display = 'block'
}

hamburger.addEventListener("click", (e) => toggleUserMenu())
register.addEventListener("click", () => openRegisterModal())
login.addEventListener("click", () => openLoginModal())