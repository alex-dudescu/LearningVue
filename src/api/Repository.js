import axios from 'axios'

const baseDomain = 'http://numbersapi.com/';
const baseURl = `${baseDomain}`;

export const repository = axios.create({
    baseURL: baseURl
})