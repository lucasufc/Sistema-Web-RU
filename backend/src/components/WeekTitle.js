import Div from "./Div"

export default function WeekTitle () {
    const header = document.createElement('header')
    header.classList.add('flex-row')
    const title = Div('title')
    weekDay(title)

    header.append(title)
    return header 
}

function weekDay(place) {
    const date = new Date()
    const day = date.toLocaleDateString('pt-br')
    const title = document.createElement('h1')
    const dayOfWeek  = document.createElement('span')
    dayOfWeek.innerText = day
    switch (date.getDay()) {
        case 1:
            title.innerText= 'Segunda-Feira'
            break
        case 2:
            title.innerText= 'Terça-Feira'
            break
        case 3:
            title.innerText= 'Quarta-Feira'
            break
        case 4:
            title.innerText= 'Quinta-Feira'
            break
        case 5:
            title.innerText= 'Sexta-Feira'
            break
        default:
            title.innerText= 'Final de Semana'
            break
    }
    place.append(title)
    place.append(dayOfWeek)
}
