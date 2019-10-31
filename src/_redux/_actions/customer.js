import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getCustomer = (Token) => {
    return {
        type: types.GET_CUSTOMERS,
        payload:  axios.get(`${ip}/api/v2/customers`,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}

export const addCustomer  = (customer, Token) => {
    return {    
        type: types.POST_CUSTOMERS,
        payload: axios.post(`${ip}/api/v2/customer`, customer,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}

export const editCustomer = (customer, id, Token) => {
    return {
        type: types.PUT_CUSTOMERS,
        payload: axios.put(`${ip}/api/v2/customer/${id}`, customer,{
            headers:{
                'Authorization': 'Bearer '+ Token
            }
        })
    }
}