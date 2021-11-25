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
    porangabucu: ['Porangabuçu', '100', '90']
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
    card.classList.add(unit.replace(' ', '').replace('ç','c').toLowerCase())
    let h2 = document.createElement('h2')
    h2.innerText = unit
    setCapacity(maxOcupation, currentOcupation, card)
    card.appendChild(h2)
    cards.appendChild(card)

}

function setCapacity (max, current, card){
    let capacity = ((current / max)*100).toFixed(0)
    let h3 = document.createElement('h3')
    let div = document.createElement('div')
    let circular = document.createElement('div')
    let circularValue = document.createElement('div')
    div.classList.add('capacity')
    circularValue.classList.add('value-container')

    div.appendChild(circular)
    if(capacity < 25) {
        card.classList.add('mild')
    } else if(capacity < 50) {
        card.classList.add('moderate')
    } else if(capacity < 75) {
        card.classList.add('busy')
    } else {
        card.classList.add('very-busy')
    }
    circularValue.innerText = '0%'
    circular.appendChild(circularValue)
    circular.classList.add('circular-progress')
    div.appendChild(circular)
    card.appendChild(div)
    generateProgressBar(circular, circularValue, capacity)
}

toggler.onclick = function(){
    const toggler = document.getElementById('toggler')
    toggler.classList.toggle('active')
    document.body.classList.toggle('dark')
}

function generateProgressBar(circular, circularValue, progressEndValue) {
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