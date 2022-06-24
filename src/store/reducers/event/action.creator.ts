import { AppDispatch } from "../.."
import UserService from "../../../api/UserService"
import { IEvent } from "../../../models/IEvent"
import { IUser } from "../../../models/IUser"
import { EventActionEnum, SetEventsAction, SetGuestsAction } from "./type"


export const  EventActionCreator = {
    setGuests : (payload:IUser[]) :SetGuestsAction => ({type:EventActionEnum.SET_GUESTS, payload }),
    setEvent : (payload:IEvent[]) :SetEventsAction => ({type:EventActionEnum.SET_EVENTS, payload }),
    fetchGuests : () => async (dispatch:AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreator.setGuests(response.data))            
        } catch (e) {
           console.log(e);
        }  
    },
    createEvents:(event:IEvent) => async (dispatch:AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event);
            dispatch(EventActionCreator.setEvent(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e);
            
        }
    },
    fetchEvents:(username:string) => async (dispatch:AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(ev=> ev.guest === username || ev.author === username)
            dispatch(EventActionCreator.setEvent(currentUserEvents))
        } catch (e) {
            console.log(e);
        }
    }
}