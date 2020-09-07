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
                else innerOfRow += `<span class="day able">${day++ + 1}</span>`
            }
        }
        const row = `<div class="week">${innerOfRow}</div>`
        m.innerHTML += row
    }
}