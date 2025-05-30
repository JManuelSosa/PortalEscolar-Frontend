export class CssHelper{

    static getVarColor(nameVar){
        return getComputedStyle(document.documentElement).getPropertyValue(nameVar).trim();
    }
}