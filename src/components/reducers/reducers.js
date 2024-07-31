

import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SET_GENDER_FILTER,
    SET_COUNTRY_FILTER,
    SET_CURRENT_PAGE,
} from '../actions/actions';

const initialState = {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    itemsPerPage: 10,
    genderFilter: '',
    countryFilter: '',
    isLoading: false,
    error: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                totalUsers: action.payload.totalUsers,
                isLoading: false,
            };
        case FETCH_USERS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case SET_GENDER_FILTER:
            return { ...state, genderFilter: action.payload, currentPage: 1 };
        case SET_COUNTRY_FILTER:
            return { ...state, countryFilter: action.payload, currentPage: 1 };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export default usersReducer;
