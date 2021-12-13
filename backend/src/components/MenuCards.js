import Div from "./Div"
import Title from "./Title"
export default function MenuCard (title ,meal) {
    const sectionMenu = document.createElement('section')
    sectionMenu.classList.add('food-menu', 'area')
    sectionMenu.append(menuTitle(title))
    sectionMenu.append(menuItems(meal))

    return sectionMenu
}

function menuTitle(string){
    let text = `${string.charAt(0).toUpperCase()+ string.slice(1)}`.replace('c', 'ç')
    const title = Title(text)
    return title
}

function menuItems(meal) {
    const cards = Div('card-itens property flex-row')
    for(let category in meal) {
        menuCard(meal[category], cards)
    }
    return cards
}

function menuCard(meal, place) {
    const card = Div('ru-item flex-column')
    card.append(cardTitle(meal))
    cardFoods(meal, card)
    place.append(card)
}

function cardTitle(meal) {
    const span = document.createElement('span')
    span.classList.add('food-title', 'flex-row')
    span.innerHTML = `<h2>${meal[1]}</h2> ${String.fromCodePoint(meal[0])}`
    return span
}

function cardFoods(meal, place) {
    let aux
    let parentheses
    for(let i = 2; i < meal.length; i++) {
        aux = document.createElement('span')
        aux.classList.add('food', 'flex-column')
        parentheses = meal[i].indexOf('(')
        if(meal[i][0] == '0') {
            let title = [meal[i], meal[i+1]]
            console.log(title)
            place.appendChild(cardTitle(title))
            i = i + 2
        }
        if(parentheses > 0) {
            aux.innerHTML += `<h3>${meal[i].slice(0, parentheses)}</h3>`
            aux.innerHTML += `<p>${meal[i].slice(parentheses)}</p>`
        } else {
            aux.innerHTML += `<h3>${meal[i]}</h3>`
            aux.innerHTML += `<p></p>`
        }
        place.appendChild(aux)
    }
}
