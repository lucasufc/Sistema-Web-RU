if(!localStorage.getItem('fontSize')){
    localStorage.setItem('fontSize', '16')
} else {
    setFont()
}

function aumentarFonte() {
    let valor = parseInt(localStorage.getItem('fontSize'))
    if(valor < 20) {
        valor +=2
        localStorage.setItem('fontSize', `${valor}`)
    }
    setFont()
}
function diminuirFonte() {
    let valor = parseInt(localStorage.getItem('fontSize'))
    if(valor > 14) {
        valor -=2
        localStorage.setItem('fontSize', `${valor}`)
    }
    setFont()
}

function setFont(){
    document.getElementsByTagName('html')[0].style.fontSize = `${localStorage.getItem('fontSize')}px`
}