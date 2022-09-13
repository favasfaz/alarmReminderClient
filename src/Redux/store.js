import {configureStore} from '@reduxjs/toolkit'
import  usersSlice  from './UserDeteilsRedux'
const store = configureStore({
    reducer:{
     users:usersSlice 
    }
})

export default store