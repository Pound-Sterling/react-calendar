import { message } from "antd";
import moment, { Moment } from "moment";

export const rules = {
    required: (message:string='Обязательное поле!') => ({
        required: true, message
    }),
    isDateAfter: (message:string) => () => ({
        validator(_:any,value:Moment){
            if(value.isSameOrAfter(moment())){
                return Promise.resolve()
            } else {
                return Promise.reject(new Error(message))
            }
        }
    }),
    max: (max:number=15,message:string=`Максимальная длина ${max}`) => ({
        max: max, message
    }),
    min: (min:number=5,message:string=`Минимальная длина ${min}`) => ({
        min: min, message
    }),
}