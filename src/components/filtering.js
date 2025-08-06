import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    //console.log("elements", elements);
    //console.log("indexes", indexes);
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        //console.log("elementName", elementName);
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        //console.log("name",name);
                        const optionElement = document.createElement('option');
                        const optionText = document.createTextNode(name);
                        optionElement.appendChild(optionText);
                        optionElement.setAttribute('value', name);
                        
                        return optionElement;          // @todo: создать и вернуть тег опции
                      })
        )
        //console.log("appended elements", elements);
     })
     
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        //console.log("action", action);
        //console.log("state", state);
        if (action?.getAttribute('name') === 'clear'){
          //console.log("action.name", action.getAttribute('name'));
          const input = action.parentElement.querySelector('input');
          if (input) {
            //console.log("input",input);
            input.value = '';
            const stateName = action.dataset.field;
            //console.log("stateName", stateName);
            state[stateName] = '';
          }
          //console.log("action cleared", action);
          //console.log("state cleared", state);
        }
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        //return data;
        return data.filter(row => compare(row, state));
    }
}