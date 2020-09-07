const thirty = [4,6,9,11]
const picker = document.getElementsByClassName('month')

const getFirstDay = (year=2020, month) => {
    return new Date(year, month-1, 1).getDay()
}

for (let m of picker) {
    const month = m.getAttribute("month")
    let days = 31
    if (month === 2) days = 28
    else if (thirty.includes(+month)) days = 30

    const firstDay = getFirstDay(2020, month)
    console.log(firstDay)
    let day = 0
    for (let i=0; i<6; i++) {
        const row = m.insertRow(m.rows.length)
        for (let j=0; j<7; j++) {
            if (i === 0 && day === 0 && firstDay !== j) row.insertCell().innerHTML = '<div class="disabled"/>'
            else if (day === days) break
            else row.insertCell().innerHTML = `<div class="day">${day++ + 1}</div>`
        }
        
    }
}