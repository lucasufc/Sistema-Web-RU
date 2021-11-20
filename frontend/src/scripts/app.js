const desjejum = {
    bebidas: [ '&#x1F964 Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
    paes: [ '&#x1F35E Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
    frutas: ['&#x1F34E Frutas', 'Laranja', 'Melão Espanhol'],
    especial: ['&#x1F31F Especial', 'Achocolatado (Contém Lactose), Bolo (Contém Lactose e Glúten)']
}


function main () {
    const title = document.querySelector('h1.title')
    title.innerText = weekDay()
    const sectionMenu = document.querySelector('main > section.content')
    let menu = '' 
    menu += menuGenerator(desjejum, 'desjejum')
    sectionMenu.innerHTML = menu

}

main()

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
    let content = `<div class="${property}">`
    content += `<h2>${property.charAt(0).toUpperCase()+ property.slice(1)}</h2></br>`
    for(category in data) {
        data[category].forEach((value, index) => {
            if(index == 0 ) {
                content += `<h3>${value}<h2>`
            } else {
                content += `<p>${value}</p>`
            }
        })
    }
    content += '</div>'
    return content
}