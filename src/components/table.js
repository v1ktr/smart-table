import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);
    //console.log("root", root);
    
    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
    //console.log("before.reverse",before.reverse());
    before.reverse().forEach(subName => {                  // перебираем нужный массив идентификаторов
        //console.log("before subname", subName);
        root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
        root.container.prepend(root[subName].container);   // добавляем к таблице до (prepend)
    }); 
    //console.log("after",after);
    after.forEach(subName => {                             // перебираем нужный массив идентификаторов
        //console.log("after subname", subName);
        root[subName] = cloneTemplate(subName);            // клонируем и получаем объект, сохраняем в таблице
        root.container.append(root[subName].container);    // добавляем к таблице после (append)
    }); 
    
    // @todo: #1.3 —  обработать события и вызвать onAction()
    const rootContainer = root.container;
    //change
    rootContainer.addEventListener('change', () => {
        onAction();
    });
    //reset
    rootContainer.addEventListener('reset', () => {
        setTimeout(onAction);
    });
    //submit
    rootContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });


    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
        //const nextRows = [];
        //console.log("data 1.1", data);
        const nextRows = data.map(item => { 
            //получили мы, значится, какой-то объект
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => { 
                //console.log("key", key);
                //проверить, что key существует в row.elements
                if (Object.hasOwn(row.elements, key)) {
                    //true то в его textContent присвойте данные item[key]
                    //Если это input или select, то присвойте значение в value, а не в textContent
                    row.elements[key].textContent = item[key];
                }                
            }) 
            //console.log("item", item);
            //console.log("row", row); 
            return row.container;
         })
        //console.log("nextRows 1.1", nextRows)
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}