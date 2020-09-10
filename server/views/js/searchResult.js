const conditionButtons = document.getElementsByClassName('condition')
const selected = {
    current: null
}

for (let btn of conditionButtons) {
    btn.addEventListener(('click'), () => {
        if (selected.current === btn) {
            selected.current = null
        } else  {
            if (selected.current) {
                const { current } = selected
                current.removeAttribute('selected')
            }
            selected.current = btn
        }
        btn.toggleAttribute('selected')
    })
}