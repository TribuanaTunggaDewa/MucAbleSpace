import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getCheckin = () =>{
    return {
        type: types.GET_ORDERS,
        payload: axios.get(`${ip}/api/v2/checkin`)
    }
}

export const addCheckin = (checkin)=> {
    return {
        type: types.POST_ORDERS,
        payload: axios.post(`${ip}/api/v2/checkin`, checkin)
    }
}

export const Checkout = (checkout)=>{
    return {
        type: types.PUT_ORDERS,
        payload: axios.put(`${ip}/api/v2/orders`, checkout)
    }
}
