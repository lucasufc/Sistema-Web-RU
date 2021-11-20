const desjejum = {
    bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
    paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
    frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],
    especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']
}


function main () {
    weekTitle()
    menuGenerator(desjejum, 'desjejum')
    menuGenerator(desjejum, 'almoco')
    menuGenerator(desjejum, 'jantar')
}

main()

function weekTitle () {
    const title = document.querySelector('h1.title')
    title.innerText = weekDay()
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
    return `${dayOfWeek} ( ${day} )`
}

function menuGenerator(data, property) {
    const sectionMenu = document.querySelector('main > section.content')
    let aux = menuTitle(property)
    sectionMenu.appendChild(aux)
    aux = menuItens(data, property)
    sectionMenu.appendChild(aux)
    
}

function menuTitle (string) {
    let tag = document.createElement('h2')
    let text = `${string.charAt(0).toUpperCase()+ string.slice(1)}`
    text= text.replace('c', 'ç')
    tag.innerText = text
    return tag
}
function menuItens (data, property) {
    let div = document.createElement('div')
    div.classList.add(property)
    let tag
    for(category in data) {
        data[category].forEach((value, index) => {
            if(index == 1 ) {
                tag = document.createElement('h3')
                tag.innerText = String.fromCodePoint(data[category][0])
                tag.innerText += `${value}`
            } else {
                tag = document.createElement('p')
                tag.innerText = `${value}`
            }
            if(index > 0) div.appendChild(tag)
        })
    }
    return div
}