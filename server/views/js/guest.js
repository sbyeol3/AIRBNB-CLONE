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