import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import getName from "../../../utils/name";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetNameAction, SetUserAction } from "./types";


export const AuthActionCreators = {
    setIsAuth: (auth:boolean): SetAuthAction => ({type:AuthActionEnum.SET_AUTH, payload:auth}),
    setName: (name:string) : SetNameAction => ({type:AuthActionEnum.SET_NAME, payload:name}),
    setUser: (user:IUser): SetUserAction => ({type:AuthActionEnum.SET_USER, payload:user}),
    setIsLoading: (isLoading:boolean): SetIsLoadingAction => ({type:AuthActionEnum.SET_IS_LOADING, payload:isLoading}),
    setError: (error:string): SetErrorAction => ({type:AuthActionEnum.SET_ERROR, payload:error}),
    login:(username:string,password:string) => async (dispatch:AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout( async()=>{
                const response = await UserService.getUsers()      
                const mockUser = response.data.find(user=>user.username === username && user.password === password)
                if(mockUser){
                    let name:string = '';
                    if (mockUser.name && mockUser.fullname) {
                        name = getName(mockUser.name, mockUser.fullname)
                    } else {
                        name = getName(mockUser.username)
                    }
                    localStorage.setItem('name', name)
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setName(name))
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Invalid login or password'))
                }
            dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('An error occurred while logging in'))
            
        }
    }, 
    logout:()=> async (dispatch:AppDispatch)=>{
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}