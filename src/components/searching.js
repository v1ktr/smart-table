import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(['skipEmptyTargetValues'],[rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)]);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        //console.log("action", action);
        //console.log("state", state);
        //return data;
        return data.filter(row => compare(row, state));
    }
}