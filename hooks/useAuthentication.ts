import { useEffect, useState } from "react";
import settings from './../configs/settings.json'
import User from '../models/User';
import { router, useRootNavigationState } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAuth, setUser } from "@/store/userSlice";

import mmkvController from '@/store/mmkvController'

export default function () {
    const rootNavigationState = useRootNavigationState()
    const navigatorReady = rootNavigationState?.key != null
    
    const userState = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const {userStorage, setUserStorage,setUserKey} = mmkvController()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(navigatorReady){
            checkUserAuth()
        }
    }, [navigatorReady])


    const checkUserAuth = async () => {
        console.log('checking user', userStorage)
        dispatch(setUser(userStorage))
        if (!userStorage.auth) {
            router.replace('/login')
        }


    }
    const authUser = async () => {

    }

    const logout = async () => {
        console.log("username",userStorage.data.email)
        setUserKey("loggedout");
        setTimeout(()=>{
            dispatch(setUser({...userState,auth:''}))

        router.replace('/login')
        },1000)

    }

    const updateUser = (data: typeof User) => {

    }

    return { isLoading, checkUserAuth, authUser, logout }
}