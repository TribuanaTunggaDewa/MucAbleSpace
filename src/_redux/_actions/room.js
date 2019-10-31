import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getRoom = (Token) => {
    return {
        type: types.GET_ROOMS,
        payload:  axios.get(`${ip}/api/v2/rooms`,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}

export const addRoom = (name, Token) => {
    return {    
        type: types.POST_ROOMS,
        payload: axios.post(`${ip}/api/v2/room`, {name} ,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}

export const editRoom = (name, id, Token) => {
    return {
        type: types.PUT_ROOMS,
        payload: axios.put(`${ip}/api/v2/room/${id}`, {name} ,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}
