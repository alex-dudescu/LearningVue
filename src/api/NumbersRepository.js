import { repository } from "./Repository"

const randomResource = "/random";

export default {
    getRandomFact(category)
    {
        if(category === undefined)
            return repository.get(`${randomResource}/?json`);
        else
        return repository.get(`${randomResource}/${category}?json`);
    },  

    getNumberFact(number) {
        return repository.get(`${number}?json`);
    },
    
    getNumberFactByCategory(number, cat) {
        return repository.get(`${number}/${cat}?json`);
    }
}