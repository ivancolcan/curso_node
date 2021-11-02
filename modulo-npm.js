// import fetch from "node-fetch";
import axios from "axios";


const api_names = "https://api.namefake.com/";



// fetch(api_names)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result);
//     });


// axios.get(api_names).then(response => {
//     console.log(response.data);
// });


export const get_random_name = async () =>
    axios.get(api_names).then(response => {
        return response.data.name;
    });


export default {
    get_random_name,
    api_names
};

