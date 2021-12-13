export function Desjejum() {
    const desjejum = {
        bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
        paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
        frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],
        especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']
    }
    return(desjejum)
}

export function Almoco() {
    const almoco = {
        principal: [ '0x1F964','Princial', 'Isca de Carne ao Molho Mostarda', 'Peixada Cearense (Contém Lactose)', '0x1F35E',' Vegetariano',' Bobo de Legumes'],
        vegetariano: [ '0x1F35E',' Vegetariano',' Bobo de Legumes'],
        salada: ['0x1F34E',' Salada', 'Acelga', 'Repolho Roxo', 'Cenoura e Passas'],
        guarnicao: ['0x1F31F',' Guarnição', 'Farofa'],
        acompanhamento: ['0x1F31F',' Acompanhamento', 'Arroz Branco', 'Arroz Integral c/ Cenoura', 'Feijão Carioca'],
        suco: ['0x1F31F',' Suco', 'Siriguela'],
        sobremesa: ['0x1F31F',' Sobremesa', 'Mamão', 'Doce']
    }
    return(almoco)
}
export function Janta() {
    const janta = {
        principal: [ '0x1F964','Princial', 'Bisteca Suina Molho de Maracujá', 'Filé de Frango ao Molho de Ervas', '0x1F35E',' Vegetariano', ' Filé de Frango ao Molho de Ervas'],
        vegetariano: [ '0x1F35E',' Vegetariano',' Filé de Frango ao Molho de Ervas'],
        salada: ['0x1F34E',' Salada', 'Alface', 'Repolho', 'Rúcula e Tomate'],
        guarnicao: ['0x1F31F',' Guarnição', 'Purê  (Contém Lactose)'],
        acompanhamento: ['0x1F31F',' Acompanhamento', 'Baião c/ Feijão Corda', 'Arroz Integral', 'Feijão de Corda'],
        suco: ['0x1F31F',' Suco', 'Manga'],
        sobremesa: ['0x1F31F',' Sobremesa', 'Banana', 'Doce']
    }
    return(janta)
}