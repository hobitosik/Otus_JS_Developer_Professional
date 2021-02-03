import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { StorageService } from './storage.service';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from './state.service';
import { IWord } from '../types';

@Injectable({
    providedIn: 'root'
})
export class AppService{

    public dictanory: IWord[] = this.storage.getDictFromLS( `${this.state.lang}_Dict` );
    public dictanory$: BehaviorSubject<IWord[]> = new BehaviorSubject(this.dictanory);

    constructor(
        private translateSrv: TranslateService,
        private storage: StorageService,
        private state: StateService
    ){ }

    public sliceSentence$( sentence:string | null ): Observable<string[]>{
        return sentence != null
                ? forkJoin(
                    sentence.split(' ').map( word=> this.translateSrv.getTranslateWord$( word ))
                )
                : of([]).pipe( map( v=>v ))
    }

    public saveToDct( nativeLangWord:string, learningLangWord:string ){
        let nativeLangWordArr = nativeLangWord.split(' ');
        let learningLangWordArr = learningLangWord.split('\n');
        if( nativeLangWordArr.length === learningLangWordArr.length ){
            for( let i=0; i < nativeLangWordArr.length; i++ ){

                if( this.dictanory.length == 0 || this.dictanory.some( _word => _word.native != nativeLangWordArr[i].toLowerCase() )){
                    let word: IWord = {
                        id: this.dictanory.length,
                        native: nativeLangWordArr[i].toLowerCase(),
                        learning: learningLangWordArr[i].toLowerCase()
                    }
                    this.dictanory.push( word )
                }
            }
            this.storage.setDictToLS( `${this.state.lang}_Dict`, this.dictanory )
            this.dictanory$.next( this.dictanory )
        }
    }
}
