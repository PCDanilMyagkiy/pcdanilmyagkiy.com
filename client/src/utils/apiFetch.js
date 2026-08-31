import { fetchRefresh } from "./fetchRefresh.js";



const API_URL = import.meta.env.VITE_API_URL;
console.log(`API_URL: ${API_URL}`);


const apiFetch = (endpoint, type, options = {}) => {
    switch (type) {
        case "normal":
            return fetch(`${API_URL}${endpoint}`, {
                ...options,
                credentials: "include"
            });
        case "refresh":
            return fetchRefresh(`${API_URL}${endpoint}`, options);
    }
}


export default apiFetch;