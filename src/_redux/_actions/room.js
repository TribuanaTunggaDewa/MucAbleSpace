import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getRoom = () => {
    return {
        type: types.GET_ROOMS,
        payload:  axios.get(`${ip}/api/v2/rooms`)
    }
}

export const addRoom = (name) => {
    return {    
        type: types.POST_ROOMS,
        payload: axios.post(`${ip}/api/v2/room`, {name})
    }
}

export const editRoom = (name, id) => {
    return {
        type: types.PUT_ROOMS,
        payload: axios.put(`${ip}/api/v2/room/${id}`, {name})
    }
}
