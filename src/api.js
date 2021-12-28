import * as Axios from 'axios';
const axios = Axios.create();

let config = {
    headers: {
        "Content-type" : "application/json",
        'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDEwNTkzOTYsImlkIjo2LCJpYXQiOjE2NDA0NTQ1OTZ9.V6QteXftfqgR60cGAYzSj-IiFzwq5ZOZwRMlXnJMXNMyB8hSGNdWosVmv4IVU3Jkyg2Km4py46H--NavqkTPFQ'
    }
}

const baseUrl = "http://65.1.209.132:8080/"

export const getVideo = async () => {
    try{
        const response = await axios.get(`${baseUrl}api/v1/category-posts?ids=4`, config);
        if(response.status === 200){
            return response.data
        }else{
            return "Error"
        }
    }catch(error){
        let er = {...error}
        if(!error.response){
            return "Error"
        }
        if(error.response.status === 400){
            return "Error"
        }else if(error.response.status === 404){
            return "Error"
        }else if(error.response.status === 500){
            return "Error"
        }
        return 'Error'
    }
}