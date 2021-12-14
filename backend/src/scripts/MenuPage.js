import RuCards from "../components/RuCards"
import WeekTitle from "../components/WeekTitle"
import {Desjejum, Almoco, Janta} from "../db/menu"
import Div from "../components/Div"
import MenuCard from "../components/MenuCards"
import Footer from "../components/Footer"

export default function MenuPage() {
    const menuPage = Div('wrapper')
    const main = document.createElement('main')
    menuPage.append(WeekTitle())
    main.append(RuCards())
    main.append(MenuCard('Desjejum', Desjejum()))
    main.append(MenuCard('Almoco', Almoco()))
    main.append(MenuCard('Janta', Janta()))
    main.append(Footer())
    menuPage.appendChild(main)
    return menuPage
}