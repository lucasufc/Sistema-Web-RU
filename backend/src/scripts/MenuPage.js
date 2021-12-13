import RuCards from "../components/RuCards"
import WeekTitle from "../components/WeekTitle"
import {Desjejum, Almoco, Janta} from "../db/menu"
import Div from "../components/Div"
import MenuCard from "../components/MenuCards"

export default function MenuPage() {
    const menuPage = Div('wrapper')
    menuPage.append(WeekTitle())
    menuPage.append(RuCards())
    menuPage.append(MenuCard('Desjejum', Desjejum()))
    menuPage.append(MenuCard('Almoco', Almoco()))
    menuPage.append(MenuCard('Janta', Janta()))
    return menuPage
}