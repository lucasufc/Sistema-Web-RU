import MenuPage from "./MenuPage"
import '../assets/css/index.css'

function main () {
    const page = document.body
    page.append(MenuPage())
}

toggler.onclick = function(){
    const toggler = document.getElementById('toggler')
    toggler.classList.toggle('active')
    document.body.classList.toggle('dark')
}

main()
