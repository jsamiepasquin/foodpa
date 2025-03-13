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

    const {userStorage, setUserStorage,setUserKey, setMealHistory, setMedical,fetchUserData} = mmkvController()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(navigatorReady){
            checkUserAuth()
        }
    }, [navigatorReady])


    const checkUserAuth = async () => {
        console.log('checking user', userStorage)
        if (!userStorage.auth || !userStorage.data ) {
            router.replace('/login')
        }

        fetchUserData()



    }
    const authUser = async () => {

    }

    const logout = async () => {
        console.log("username",userStorage.data.email)
        setUserStorage({
            auth: '',
            data: userStorage.data
        })
        setMealHistory([])
        router.replace('/login')

    }

    const updateUser = (data: typeof User) => {

    }

    return { isLoading, checkUserAuth, authUser, logout }
}