export class SearchHelper{

    static normalizeTextWithoutAccents(text){
        return text.normalize("NFD") .replace(/[\u0300-\u036f]/g, ""); 
    }


}