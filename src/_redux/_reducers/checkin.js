import * as types from '../type'

const initialState = {
    checkin:[],
    error: null,
    isLoading: true
}

const checkin = (state = initialState, action) => {
    switch(action.type){
        case `${types.GET_ORDERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_ORDERS}_FULFILLED`:
            return{
                ...state,
                checkin: action.payload.data,
                isLoading: false
            }
        case `${types.GET_ORDERS}_REJECTED`:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.POST_ORDERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.POST_ORDERS}_FULFILLED`:
            return{
                ...state,
                checkin: action.payload.data,
                isLoading: false
            }
        case `${types.POST_ORDERS}_REJECTED`:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.PUT_ORDERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.PUT_ORDERS}_FULFILLED`:
            return{
                ...state,
                checkin: action.payload.data,
                isLoading: false
            }
        case `${types.PUT_ORDERS}_REJECTED`:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        default:
            return state

    }
}

export default checkin