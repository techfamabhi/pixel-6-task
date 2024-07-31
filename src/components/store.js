import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../components/reducers/reducers';

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;
