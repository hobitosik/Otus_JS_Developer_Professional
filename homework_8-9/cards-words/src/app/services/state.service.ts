import { Injectable } from '@angular/core';

export interface ITime {
    hours: number,
    minutes: number
}

@Injectable({
    providedIn: 'root'
})
export class StateService {

    public lang = 'en';
    public wordsAmount = 5;
    public time:ITime = { hours: 0, minutes: 2 }

    constructor() { }

    setState( lang?:string, wordsAmount?:number, time?:ITime ){
        if( lang ) this.lang = lang;
        if( wordsAmount ) this.wordsAmount = wordsAmount;
        if( time ){
            this.time.hours = time.hours;
            this.time.minutes = time.minutes;
        }

        console.log('[NEW][STATE]', 'lang: ->', lang, 'wordsAmount: ->', wordsAmount, 'time: ->', time)
    }

    setStateDefault(){
        this.setState( 'en', 5, { hours: 0, minutes: 2 } )
    }
}
