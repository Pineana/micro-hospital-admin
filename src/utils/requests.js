import axios from 'axios';

const instance = axios.create({
    baseURL:"http://127.0.0.1:8088",
    timeout:5000
})

export function get(url,params){
    return instance.get(url,{
        params
    })
}

export function post(url,params){
    return instance.post(url,params,{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    },)
}