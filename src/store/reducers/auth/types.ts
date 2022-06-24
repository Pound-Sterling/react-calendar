import { IUser } from "../../../models/IUser";

export interface AuthState{
    isAuth:boolean;
    user: IUser;
    name:string;
    isLoading:boolean;
    error:string;
}

export enum AuthActionEnum{
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_NAME = "SET_NAME",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR"
}

export interface SetAuthAction{
    type:AuthActionEnum.SET_AUTH;
    payload:boolean;
}
export interface SetUserAction{
    type:AuthActionEnum.SET_USER;
    payload:IUser;
}
export interface SetNameAction{
    type:AuthActionEnum.SET_NAME;
    payload:string;
}
export interface SetIsLoadingAction{
    type:AuthActionEnum.SET_IS_LOADING;
    payload:boolean;
}
export interface SetErrorAction{
    type:AuthActionEnum.SET_ERROR;
    payload:string;
}

export type AuthAction = SetAuthAction | SetUserAction | SetNameAction | SetIsLoadingAction | SetErrorAction
