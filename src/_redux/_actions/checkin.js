import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getCheckin = (Token) =>{
    return {
        type: types.GET_ORDERS,
        payload:  axios.get(`${ip}/api/v2/checkin`,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}

export const addCheckin = (checkin, Token)=> {
    return {
        type: types.POST_ORDERS,
        payload: axios.post(`${ip}/api/v2/checkin`, checkin, Token)
    }
}

export const Checkout = (checkout, Token)=>{
    return {
        type: types.PUT_ORDERS,
        payload: axios.put(`${ip}/api/v2/orders`, checkout, Token)
    }
}
