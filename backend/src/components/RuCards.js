import Div from "./Div"
import Title from "./Title"
import Restaurants from "../db/restaurants"


export default function RuCards () {
    const ruCards = document.createElement('section')
    ruCards.classList.add('ru-cards','flex-row', 'area')
    ruCards.append(Title('Unidades'))
    ruCards.append(Units())
    return ruCards
}

function Units() {
    const restaurants = Restaurants()
    const units = Div('')
    for(let unit in restaurants){
        units.append(createUnit(unit))
        capacityClass(units,unit)
       // units.append(capacityIndicator(unit))
    }
    return units
}

function createUnit(unit) {
    const unitName = unit[0]
    const card = Div(`${capacityClass()} ru-card`)
    card.append(Title(unitName))
    card.setAttribute('class', unitName.replace(' ', '').replace('ç','c').toLowerCase())
    
    return card
}

function getCapacity(unit) {
    const max = Number(unit[1])
    const current = Number(unit[2])
    return ((current / max)*100).toFixed(0)
}

function capacityClass(card,unit) {
    const capacity = getCapacity(unit)
    if(capacity < 25) {
        return 'mild'
    } else if(capacity < 50) {
        return 'moderate'
    } else if(capacity < 75) {
        return 'busy'
    } else {
        return 'very-busy'
    }
}

function capacityIndicator(unit){
    const place = Div('capacity')
    const circular = Div('circular-progress')
    const circularValue = Div('value-container')
    place.append(circular)

    circularValue.innerText = '0%'
    circular.append(circularValue)
    place.append(circular)
    generateProgressBar(circular, circularValue, unit)
    return place
}

function generateProgressBar(circular, circularValue, unit) {
    const progressEndValue = getCapacity(unit)
    let progressValue = 0
    let speed = 30
    let color = ''
    let progress = setInterval(() => {
        progressValue++
        circularValue.innerHTML = `${progressValue}<span>%</span>`
        if(progressValue < 25) {
            color = `#00BB6D`
        } else if(progressValue < 50) {
            color = `#FFE733`
        } else if(progressValue < 75) {
            color = `#FF8C01`
        } else {
            color = `#ED2938`
        }
        circular.style.background = `conic-gradient(
            ${color} ${progressValue * 3.6}deg,
            var(--bg-progress-bar) ${progressValue * 3.6}deg
        )`
        if(progressValue == progressEndValue) {
            clearInterval(progress)
        }
    }, speed)

}