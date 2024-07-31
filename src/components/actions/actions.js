export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SET_GENDER_FILTER = 'SET_GENDER_FILTER';
export const SET_COUNTRY_FILTER = 'SET_COUNTRY_FILTER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action Creators
export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (data) => ({
    type: FETCH_USERS_SUCCESS,
    payload: data,
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
});

export const setGenderFilter = (gender) => ({
    type: SET_GENDER_FILTER,
    payload: gender,
});

export const setCountryFilter = (country) => ({
    type: SET_COUNTRY_FILTER,
    payload: country,
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page,
});
