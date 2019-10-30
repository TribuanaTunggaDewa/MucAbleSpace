import * as types from '../type';




const initialState = {
    room : [],
    error: null,
    isLoading: true
}

const room = (state = initialState, action) => {
    switch(action.type){
        case `${types.GET_ROOMS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_ROOMS}_FULFILLED`:
            return {
                ...state,
                room: action.payload.data,
                isLoading: false
            }
        case `${types.GET_ROOMS}_REJECTED`:
            return {
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.POST_ROOMS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.POST_ROOMS}_FULFILLED`:
            return{
                ...state,
                room:  [...state.room, action.payload.data],
                isLoading: false
            }
        case `${types.POST_ROOMS}_REJECTED`:
            return{
                ...state,
                error: true,
                isLoading: false
            }
        case `${types.PUT_ROOMS}_PENDING`:
            return{
                ...state,
                
                isLoading: true,
            }
        case `${types.PUT_ROOMS}_FULFILLED`:
            return{
                ...state,
                room: action.payload.data,
                isLoading: false
            }
        case `${types.PUT_ROOMS}_REJECTED`:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default room