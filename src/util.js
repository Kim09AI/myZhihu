function wrapText(target, str, maxLine = 3) {
    let targetWidth = parseInt(window.getComputedStyle(target).width)
    let arrText = str.split('')
    let text = ''
    let line = 0
    let wrap = false
    let div = document.createElement('div')
    div.style.display = 'inline-block'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    for (let i = 0; i < arrText.length; i++) {
        let temp = text + arrText[i]
        div.innerText = temp
        if (div.clientWidth > targetWidth) {
            line++
            text = arrText[i]
        } else {
            text += arrText[i]
        }
        if (line === maxLine) {
            wrap = true
            text = str.substr(0, i - 1) + '...'
            break
        }
    }
    document.body.removeChild(div)
    return wrap ? text : str
}
