if(!localStorage.getItem('darkMode')){
    localStorage.setItem('darkMode', '')
}

toggler.onclick = function toggleDarkMode(){
    const toggler = document.getElementById('toggler')
    toggler.classList.toggle('active')
    document.body.classList.toggle('dark')
    let valor = !localStorage.getItem('darkMode') ? ' ' : ''
    localStorage.setItem('darkMode', valor)
}

if(!localStorage.getItem('darkMode')) {
    const toggler = document.getElementById('toggler')
    toggler.classList.toggle('active')
    document.body.classList.toggle('dark')
}
