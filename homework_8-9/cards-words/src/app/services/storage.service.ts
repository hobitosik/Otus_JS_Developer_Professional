import { Injectable } from '@angular/core';
import { IWord } from '../types';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(){ }

    public setDictToLS( key:string, dict: IWord[] ){
        let _dict = JSON.stringify( dict )
        localStorage.setItem( key, _dict )
    }
    public getDictFromLS( key:string ): any{
        return localStorage.getItem( key ) !== null ? JSON.parse( localStorage.getItem( key )) : {}
    }
}
