const desjejum = {
    bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
    paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
    frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],
    especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']
}
const restaurants =  {
    velho: ['Velho', '200', '100'],
    novo: ['Novo', '100', '90']
}

function main () {
    weekTitle()
    RUCads()
    menuGenerator(desjejum, 'desjejum')
    menuGenerator(desjejum, 'almoco')
    menuGenerator(desjejum, 'jantar')
}

main()

function toggle () {
    document.body.classList.toggle('dark')
}

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
    const sectionMenu = document.querySelector('main > section.content')
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
    div.classList.add(property)
    for(category in data) {
        getFood(data[category], div)
    }
    sectionMenu.appendChild(div)
}

function getFood(data, div) {
    let tag
    data.forEach((value, index) => {
        if(index == 1 ) {
            tag = document.createElement('h3')
            tag.innerText = String.fromCodePoint(data[0])
            tag.innerText += `${value}`
        } else {
            tag = document.createElement('p')
            tag.innerText = `${value}`
        }
        if(index > 0) div.appendChild(tag)
    })
}

function RUCads () {
    const cards = document.querySelector('main > section.cards')
    for(unit in restaurants) {
        getUnit(restaurants[unit], cards)
    }
}

function getUnit( units, cards ) {
    let card = document.createElement('div')
    card.classList.add('card')

    let unit = units[0]
    let maxOcupation = Number(units[1])
    let currentOcupation = Number(units[2])
    card.classList.add(unit.toLowerCase())
    let h2 = document.createElement('h2')
    h2.innerText = unit
    card.appendChild(h2)
    setCapacity(maxOcupation, currentOcupation, card)
    cards.appendChild(card)

}

function setCapacity (max, current, card){
    let capacity = ((current / max)*100).toFixed(2)
    let h3 = document.createElement('h3')
    let icon = document.createElement('i')
    let span = document.createElement('span')
    span.classList.add('capacity')
    icon.classList.add('fas')
    
    if(capacity < 25) {
        card.classList.add('mild')
        h3.innerText = 'Vazio'
        icon.classList.add('fa-grin-stars')
    } else if(capacity < 50) {
        card.classList.add('moderate')
        h3.innerText = 'Moderado'
        icon.classList.add('fa-meh')
    } else if(capacity < 75) {
        card.classList.add('busy')
        h3.innerText = 'Cheio'
        icon.classList.add('fa-meh-rolling-eyes')
    } else {
        card.classList.add('very-busy')
        h3.innerText = 'Lotado'
        icon.classList.add('fa-sad-cry')
    }
    span.appendChild(h3)
    span.appendChild(icon)
    card.appendChild(span)
 
}