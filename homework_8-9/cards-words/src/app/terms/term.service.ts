import { Injectable } from '@angular/core';

const TERM_DCT = {
    'en': 'Английский',
    'ru': 'Русский',
    'de': 'Немецкий',
    'fr': 'Франзуский'
}

@Injectable({
    providedIn: 'root'
})
export class TermService {
    currentOverride:{}

    getTerm( code:string, override? ): any {
        let term = null;
        if( override && typeof override === 'object' ) term = override[code];
        if( !term && this.currentOverride ) term = this.currentOverride[code];
        if( !term ) term = TERM_DCT[code] || ( typeof override === 'string' ? override : null );
        return term;
    }
}
