import axios from "axios"

const instance = axios.create({
    baseURL: 'https://e-commerce-backend-15em.onrender.com'
})

export default instance;