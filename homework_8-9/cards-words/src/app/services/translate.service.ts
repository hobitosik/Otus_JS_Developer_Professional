import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StateService } from './state.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ITranslateRes {
    responseData: {
        translatedText: string,
        match: number
    },
    quotaFinished: boolean,
    mtLangSupported: any,
    responseDetails: string,
    responseStatus: number,
    responderId: string,
    exception_code: any,
    matches: any[]
}

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(
        private http: HttpClient,
        private state: StateService
    ){ console.log('[TRANSLATE][INIT]', this) }

    public getTranslateWord$( word:string ): Observable<string>{
        return this.http.get(
            'https://api.mymemory.translated.net/get',
            {
                params: new HttpParams()
                    .set( 'q', word )
                    .set( 'langpair', `ru|${this.state.lang}` )
            }
        ).pipe(
            map( response =>{
                // console.log('[TRANSLATE][TRANSLATE DATA]', response);
                let translatedWord;
                try{
                    translatedWord = response['responseData']['translatedText'];
                }catch( e ){
                    console.error('[TRANSLATE][ERROR]', e);
                    translatedWord = '';
                }
                return translatedWord
            }),
            catchError( err => {
                console.error( err );
                throw 'error in source. Details: ' + err;
            })
        );
    }
}
