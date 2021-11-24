const desjejum = {
    bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
    paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
    frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],
    especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']
}
const restaurants =  {
    pici1: ['Pici I', '100','15'],
    pici2: ['Pici II', '100', '45'],
    benfica: ['Benfica', '100', '60'],
    porangabucu: ['Porangabucu', '100', '90']
}

function main () {
    weekTitle()
    RUCads()
    menuGenerator(desjejum, 'desjejum')
    menuGenerator(desjejum, 'almoco')
    menuGenerator(desjejum, 'jantar')
}

main()

function weekTitle () {
    const title = document.querySelector('h1.title')
    title.innerHTML = weekDay()
}
function weekDay() {
    const date = new Date()
    const day = date.toLocaleDateString('pt-br')
    let dayOfWeek  = ''
    switch (date.getDay()) {
        case 1:
            dayOfWeek = 'Segunda-Feira'
            break
        case 2:
            dayOfWeek = 'Terça-Feira'
            break
        case 3:
            dayOfWeek = 'Quarta-Feira'
            break
        case 4:
            dayOfWeek = 'Quinta-Feira'
            break
        case 5:
            dayOfWeek = 'Sexta-Feira'
            break
        default:
            dayOfWeek = 'Final de Semana'
            break
    }
    return `${dayOfWeek} </br><p>${day}</p>`
}

function menuGenerator(data, property) {
    const sectionMenu = document.querySelector('main > section.food-menu')
    menuTitle(property, sectionMenu)
    menuItens(data, property, sectionMenu)  
}

function menuTitle (string, sectionMenu) {
    let tag = document.createElement('h2')
    let text = `${string.charAt(0).toUpperCase()+ string.slice(1)}`
    text= text.replace('c', 'ç')
    tag.innerText = text
    sectionMenu.appendChild(tag)
}

function menuItens (data, property, sectionMenu) {
    let div = document.createElement('div')
    div.classList.add('card-itens')
    div.classList.add(property)
    div.classList.add('flex-row')
    for(category in data) {
        getFood(data[category], div)
    }
    sectionMenu.appendChild(div)
}

function getFood(data, div) {
    let path = './assets/img/'
    let menuCard = document.createElement('div')
    menuCard.classList.add('ru-item')
    menuCard.classList.add('flex-column')
    let parentheses
    let tag

    data.forEach((value, index) => {
        if(index == 1 ) {
            tag = document.createElement('span')
            tag.classList.add('food-title')
            tag.classList.add('flex-row')

            tag.innerHTML += `<h2>${value}</h2>`
            tag.innerHTML += String.fromCodePoint(data[0])
            //tag.innerHTML = `<img src="${path}${value}.png"></img>`
            
        } else {
            parentheses = value.indexOf('(')
            tag = document.createElement('span')
            tag.classList.add('food')
            tag.classList.add('flex-column')
            if(parentheses > 0) {
                tag.innerHTML += `<h3>${value.slice(0, parentheses)}</h3>`
                tag.innerHTML += `<p>${value.slice(parentheses)}</p>`
            } else {
                tag.innerHTML += `<h3>${value}</h3>`
                tag.innerHTML += `<p></p>`
            }
        }
        if(index > 0) menuCard.appendChild(tag)
    })
    div.appendChild(menuCard)
}

// Cartões RU

function RUCads () {
    const cards = document.querySelector('main > section.cards')
    cards.classList.add('flex-column')
    let title = document.createElement('h2')
    title.innerText = 'Unidades'
    let exteralDiv = document.createElement('div')
    exteralDiv.classList.add('flex-row')
    cards.appendChild(title)
    cards.appendChild(exteralDiv)
    for(unit in restaurants) {
        getUnit(restaurants[unit], exteralDiv)
    }
}

function getUnit( units, cards ) {
    let card = document.createElement('div')
    card.classList.add('card')
    let unit = units[0]
    let maxOcupation = Number(units[1])
    let currentOcupation = Number(units[2])
    card.classList.add(unit.replace(' ', '').toLowerCase())
    let h2 = document.createElement('h2')
    h2.innerText = unit
    card.appendChild(h2)
    setCapacity(maxOcupation, currentOcupation, card)
    cards.appendChild(card)

}

function setCapacity (max, current, card){
    let capacity = ((current / max)*100).toFixed(2)
    let h3 = document.createElement('h3')
    let span = document.createElement('span')
    let emoji = document.createElement('p')
    span.classList.add('capacity')
    
    if(capacity < 25) {
        card.classList.add('mild')
        h3.innerText = 'Vazio'
        emoji.innerHTML = '&#x1F929;'
    } else if(capacity < 50) {
        card.classList.add('moderate')
        h3.innerText = 'Moderado'
        emoji.innerHTML = '&#x1F914;'
    } else if(capacity < 75) {
        card.classList.add('busy')
        h3.innerText = 'Cheio'
        emoji.innerHTML = '&#x1F614;'
    } else {
        card.classList.add('very-busy')
        h3.innerText = 'Lotado'
        emoji.innerHTML = '&#x1F62D;'
    }
    span.appendChild(h3)
    span.appendChild(emoji)
    card.appendChild(span)
}

const toggler = document.getElementById('toggler')
toggler.onclick = function(){
    toggler.classList.toggle('active')
    document.body.classList.toggle('dark')
}