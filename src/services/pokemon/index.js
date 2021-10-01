import axios from "axios";

const api = process.env.VUE_APP_API_POKEMON
const path = "/pokemon"

export default {

    findAll() {
        return axios.get(`${api + path}`);
    },

    findByName(name){
        return axios.get(`${api + path}/${name}`);
    }
}