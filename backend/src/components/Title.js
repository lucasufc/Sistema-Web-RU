export default function Title (text, type = 'h2'){
    const title = document.createElement(type)
    title.innerText = text
    return title
}