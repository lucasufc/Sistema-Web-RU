export default function Div(className = ''){
    const div = document.createElement('div')
    if(className !== ''){
        className.split(' ').forEach(classe => {
            div.classList.add(classe)
        })
    }
    return div
}