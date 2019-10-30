import axios from 'axios'
import {ip} from '../../source/domain'
import * as types from '../type'

export const getCustomer = () => {
    return {
        type: types.GET_CUSTOMERS,
        payload:  axios.get(`${ip}/api/v2/customers`)
    }
}

export const addCustomer  = (customer) => {
    return {    
        type: types.POST_CUSTOMERS,
        payload: axios.post(`${ip}/api/v2/customer`, customer)
    }
}

export const editCustomer = (customer, id) => {
    return {
        type: types.PUT_CUSTOMERS,
        payload: axios.put(`${ip}/api/v2/customer/${id}`, customer)
    }
}