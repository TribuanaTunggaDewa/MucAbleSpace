import * as types from '../type';



const initialState = {
    customer : [],
    error: null,
    isLoading: true
}

const customer = (state = initialState, action) => {
    switch(action.type){
        case `${types.GET_CUSTOMERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_CUSTOMERS}_FULFILLED`:
            return {
                ...state,
                customer: action.payload.data,
                isLoading: false
            }
        case `${types.GET_CUSTOMERS}_REJECTED`:
            return {
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.POST_CUSTOMERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.POST_CUSTOMERS}_FULFILLED`:
            return{
                ...state,
                customer:  [...state.customer, action.payload.data],
                isLoading: false
            }
        case `${types.POST_CUSTOMERS}_REJECTED`:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.PUT_CUSTOMERS}_PENDING`:
            return{
                ...state,
                isLoading: true,
            }
        case `${types.PUT_CUSTOMERS}_FULFILLED`:
                      
            return{
                ...state,
                customer: action.payload.data,
                isLoading: false
            }
        case `${types.PUT_CUSTOMERS}_REJECTED`:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default customer