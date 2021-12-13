/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Div.js":
/*!*******************************!*\
  !*** ./src/components/Div.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Div)\n/* harmony export */ });\nfunction Div(className = ''){\r\n    const div = document.createElement('div')\r\n    if(className !== ''){\r\n        className.split(' ').forEach(classe => {\r\n            div.classList.add(classe)\r\n        })\r\n    }\r\n    return div\r\n}\n\n//# sourceURL=webpack://backend/./src/components/Div.js?");

/***/ }),

/***/ "./src/components/MenuCards.js":
/*!*************************************!*\
  !*** ./src/components/MenuCards.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuCard)\n/* harmony export */ });\n/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Div */ \"./src/components/Div.js\");\n/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Title */ \"./src/components/Title.js\");\n\r\n\r\nfunction MenuCard (title ,meal) {\r\n    const sectionMenu = document.createElement('section')\r\n    sectionMenu.classList.add('food-menu', 'area')\r\n    sectionMenu.append(menuTitle(title))\r\n    sectionMenu.append(menuItems(meal))\r\n\r\n    return sectionMenu\r\n}\r\n\r\nfunction menuTitle(string){\r\n    let text = `${string.charAt(0).toUpperCase()+ string.slice(1)}`.replace('c', 'ç')\r\n    const title = (0,_Title__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(text)\r\n    return title\r\n}\r\n\r\nfunction menuItems(meal) {\r\n    const cards = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('card-itens property flex-row')\r\n    for(let category in meal) {\r\n        menuCard(meal[category], cards)\r\n    }\r\n    return cards\r\n}\r\n\r\nfunction menuCard(meal, place) {\r\n    const card = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('ru-item flex-column')\r\n    card.append(cardTitle(meal))\r\n    cardFoods(meal, card)\r\n    place.append(card)\r\n}\r\n\r\nfunction cardTitle(meal) {\r\n    const span = document.createElement('span')\r\n    span.classList.add('food-title', 'flex-row')\r\n    span.innerHTML = `<h2>${meal[1]}</h2> ${String.fromCodePoint(meal[0])}`\r\n    return span\r\n}\r\n\r\nfunction cardFoods(meal, place) {\r\n    let aux\r\n    let parentheses\r\n    for(let i = 2; i < meal.length; i++) {\r\n        aux = document.createElement('span')\r\n        aux.classList.add('food', 'flex-column')\r\n        parentheses = meal[i].indexOf('(')\r\n        if(meal[i][0] == '0') {\r\n            let title = [meal[i], meal[i+1]]\r\n            console.log(title)\r\n            place.appendChild(cardTitle(title))\r\n            i = i + 2\r\n        }\r\n        if(parentheses > 0) {\r\n            aux.innerHTML += `<h3>${meal[i].slice(0, parentheses)}</h3>`\r\n            aux.innerHTML += `<p>${meal[i].slice(parentheses)}</p>`\r\n        } else {\r\n            aux.innerHTML += `<h3>${meal[i]}</h3>`\r\n            aux.innerHTML += `<p></p>`\r\n        }\r\n        place.appendChild(aux)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://backend/./src/components/MenuCards.js?");

/***/ }),

/***/ "./src/components/RuCards.js":
/*!***********************************!*\
  !*** ./src/components/RuCards.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RuCards)\n/* harmony export */ });\n/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Div */ \"./src/components/Div.js\");\n/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Title */ \"./src/components/Title.js\");\n/* harmony import */ var _db_restaurants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../db/restaurants */ \"./src/db/restaurants.js\");\n\r\n\r\n\r\n\r\n\r\nfunction RuCards () {\r\n    const ruCards = document.createElement('section')\r\n    ruCards.setAttribute('class','ru-cards flex-row')\r\n    ruCards.append((0,_Title__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('Unidades'))\r\n    ruCards.append(Units())\r\n    return ruCards\r\n}\r\n\r\nfunction Units() {\r\n    const restaurants = (0,_db_restaurants__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\r\n    const units = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('')\r\n    for(let unit in restaurants){\r\n        //units.append(createUnit(unit))\r\n        capacityClass(units,unit)\r\n       // units.append(capacityIndicator(unit))\r\n    }\r\n    return units\r\n}\r\n\r\nfunction createUnit(unit) {\r\n    const unitName = unit[0]\r\n    const card = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(`${capacityClass()} ru-card`)\r\n    card.append((0,_Title__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(unitName))\r\n    card.setAttribute('class', unitName.replace(' ', '').replace('ç','c').toLowerCase())\r\n    \r\n    return card\r\n}\r\n\r\nfunction getCapacity(unit) {\r\n    const max = Number(unit[1])\r\n    const current = Number(unit[2])\r\n    return ((current / max)*100).toFixed(0)\r\n}\r\n\r\nfunction capacityClass(card,unit) {\r\n    const capacity = getCapacity(unit)\r\n    if(capacity < 25) {\r\n        return 'mild'\r\n    } else if(capacity < 50) {\r\n        return 'moderate'\r\n    } else if(capacity < 75) {\r\n        return 'busy'\r\n    } else {\r\n        return 'very-busy'\r\n    }\r\n}\r\n\r\nfunction capacityIndicator(unit){\r\n    const place = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('capacity')\r\n    const circular = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('circular-progress')\r\n    const circularValue = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('value-container')\r\n    place.append(circular)\r\n\r\n    circularValue.innerText = '0%'\r\n    circular.append(circularValue)\r\n    place.append(circular)\r\n    generateProgressBar(circular, circularValue, unit)\r\n    return place\r\n}\r\n\r\nfunction generateProgressBar(circular, circularValue, unit) {\r\n    const progressEndValue = getCapacity(unit)\r\n    let progressValue = 0\r\n    let speed = 30\r\n    let color = ''\r\n    let progress = setInterval(() => {\r\n        progressValue++\r\n        circularValue.innerHTML = `${progressValue}<span>%</span>`\r\n        if(progressValue < 25) {\r\n            color = `#00BB6D`\r\n        } else if(progressValue < 50) {\r\n            color = `#FFE733`\r\n        } else if(progressValue < 75) {\r\n            color = `#FF8C01`\r\n        } else {\r\n            color = `#ED2938`\r\n        }\r\n        circular.style.background = `conic-gradient(\r\n            ${color} ${progressValue * 3.6}deg,\r\n            var(--bg-progress-bar) ${progressValue * 3.6}deg\r\n        )`\r\n        if(progressValue == progressEndValue) {\r\n            clearInterval(progress)\r\n        }\r\n    }, speed)\r\n\r\n}\n\n//# sourceURL=webpack://backend/./src/components/RuCards.js?");

/***/ }),

/***/ "./src/components/Title.js":
/*!*********************************!*\
  !*** ./src/components/Title.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Title)\n/* harmony export */ });\nfunction Title (text, type = 'h2'){\r\n    const title = document.createElement(type)\r\n    title.innerText = text\r\n    return title\r\n}\n\n//# sourceURL=webpack://backend/./src/components/Title.js?");

/***/ }),

/***/ "./src/components/WeekTitle.js":
/*!*************************************!*\
  !*** ./src/components/WeekTitle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WeekTitle)\n/* harmony export */ });\n/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Div */ \"./src/components/Div.js\");\n\r\n\r\nfunction WeekTitle () {\r\n    const header = document.createElement('header')\r\n    header.classList.add('flex-row')\r\n    const title = (0,_Div__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('title')\r\n    weekDay(title)\r\n\r\n    header.append(title)\r\n    return header \r\n}\r\n\r\nfunction weekDay(place) {\r\n    const date = new Date()\r\n    const day = date.toLocaleDateString('pt-br')\r\n    const title = document.createElement('h1')\r\n    const dayOfWeek  = document.createElement('span')\r\n    dayOfWeek.innerText = day\r\n    switch (date.getDay()) {\r\n        case 1:\r\n            title.innerText= 'Segunda-Feira'\r\n            break\r\n        case 2:\r\n            title.innerText= 'Terça-Feira'\r\n            break\r\n        case 3:\r\n            title.innerText= 'Quarta-Feira'\r\n            break\r\n        case 4:\r\n            title.innerText= 'Quinta-Feira'\r\n            break\r\n        case 5:\r\n            title.innerText= 'Sexta-Feira'\r\n            break\r\n        default:\r\n            title.innerText= 'Final de Semana'\r\n            break\r\n    }\r\n    place.append(title)\r\n    place.append(dayOfWeek)\r\n}\r\n\n\n//# sourceURL=webpack://backend/./src/components/WeekTitle.js?");

/***/ }),

/***/ "./src/db/menu.js":
/*!************************!*\
  !*** ./src/db/menu.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Desjejum\": () => (/* binding */ Desjejum),\n/* harmony export */   \"Almoco\": () => (/* binding */ Almoco),\n/* harmony export */   \"Janta\": () => (/* binding */ Janta)\n/* harmony export */ });\nfunction Desjejum() {\r\n    const desjejum = {\r\n        bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],\r\n        paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],\r\n        frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],\r\n        especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']\r\n    }\r\n    return(desjejum)\r\n}\r\n\r\nfunction Almoco() {\r\n    const almoco = {\r\n        principal: [ '0x1F964','Princial', 'Isca de Carne ao Molho Mostarda', 'Peixada Cearense (Contém Lactose)', '0x1F35E',' Vegetariano',' Bobo de Legumes'],\r\n        vegetariano: [ '0x1F35E',' Vegetariano',' Bobo de Legumes'],\r\n        salada: ['0x1F34E',' Salada', 'Acelga', 'Repolho Roxo', 'Cenoura e Passas'],\r\n        guarnicao: ['0x1F31F',' Guarnição', 'Farofa'],\r\n        acompanhamento: ['0x1F31F',' Acompanhamento', 'Arroz Branco', 'Arroz Integral c/ Cenoura', 'Feijão Carioca'],\r\n        suco: ['0x1F31F',' Suco', 'Siriguela'],\r\n        sobremesa: ['0x1F31F',' Sobremesa', 'Mamão', 'Doce']\r\n    }\r\n    return(almoco)\r\n}\r\nfunction Janta() {\r\n    const janta = {\r\n        principal: [ '0x1F964','Princial', 'Bisteca Suina Molho de Maracujá', 'Filé de Frango ao Molho de Ervas', '0x1F35E',' Vegetariano', ' Filé de Frango ao Molho de Ervas'],\r\n        vegetariano: [ '0x1F35E',' Vegetariano',' Filé de Frango ao Molho de Ervas'],\r\n        salada: ['0x1F34E',' Salada', 'Alface', 'Repolho', 'Rúcula e Tomate'],\r\n        guarnicao: ['0x1F31F',' Guarnição', 'Purê  (Contém Lactose)'],\r\n        acompanhamento: ['0x1F31F',' Acompanhamento', 'Baião c/ Feijão Corda', 'Arroz Integral', 'Feijão de Corda'],\r\n        suco: ['0x1F31F',' Suco', 'Manga'],\r\n        sobremesa: ['0x1F31F',' Sobremesa', 'Banana', 'Doce']\r\n    }\r\n    return(janta)\r\n}\n\n//# sourceURL=webpack://backend/./src/db/menu.js?");

/***/ }),

/***/ "./src/db/restaurants.js":
/*!*******************************!*\
  !*** ./src/db/restaurants.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Restaurants)\n/* harmony export */ });\nfunction Restaurants() {\r\n    return(\r\n        {\r\n            pici1: ['Pici I', '100','15'],\r\n            pici2: ['Pici II', '100', '45'],\r\n            benfica: ['Benfica', '100', '60'],\r\n            porangabucu: ['Porangabuçu', '100', '90']\r\n        }\r\n    )\r\n}\n\n//# sourceURL=webpack://backend/./src/db/restaurants.js?");

/***/ }),

/***/ "./src/scripts/MenuPage.js":
/*!*********************************!*\
  !*** ./src/scripts/MenuPage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuPage)\n/* harmony export */ });\n/* harmony import */ var _components_RuCards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/RuCards */ \"./src/components/RuCards.js\");\n/* harmony import */ var _components_WeekTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/WeekTitle */ \"./src/components/WeekTitle.js\");\n/* harmony import */ var _db_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../db/menu */ \"./src/db/menu.js\");\n/* harmony import */ var _components_Div__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Div */ \"./src/components/Div.js\");\n/* harmony import */ var _components_MenuCards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/MenuCards */ \"./src/components/MenuCards.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction MenuPage() {\r\n    const menuPage = (0,_components_Div__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('wrapper')\r\n    menuPage.append((0,_components_WeekTitle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])())\r\n    menuPage.append((0,_components_RuCards__WEBPACK_IMPORTED_MODULE_0__[\"default\"])())\r\n    menuPage.append((0,_components_MenuCards__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('Desjejum', (0,_db_menu__WEBPACK_IMPORTED_MODULE_2__.Desjejum)()))\r\n    menuPage.append((0,_components_MenuCards__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('Almoco', (0,_db_menu__WEBPACK_IMPORTED_MODULE_2__.Almoco)()))\r\n    menuPage.append((0,_components_MenuCards__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('Janta', (0,_db_menu__WEBPACK_IMPORTED_MODULE_2__.Janta)()))\r\n    return menuPage\r\n}\n\n//# sourceURL=webpack://backend/./src/scripts/MenuPage.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MenuPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuPage */ \"./src/scripts/MenuPage.js\");\n\r\n\r\nfunction main () {\r\n    const page = document.body\r\n    page.append((0,_MenuPage__WEBPACK_IMPORTED_MODULE_0__[\"default\"])())\r\n}\r\nmain()\r\n\n\n//# sourceURL=webpack://backend/./src/scripts/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;