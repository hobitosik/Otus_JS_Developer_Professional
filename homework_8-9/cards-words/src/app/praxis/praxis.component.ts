import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../services/state.service';
import { StorageService } from '../services/storage.service';
import { IWord } from '../types';

@Component({
    selector: 'cw-praxis',
    templateUrl: './praxis.component.html',
    styleUrls: ['./praxis.component.scss']
})
export class PraxisComponent implements OnInit {

    public learningLangWord: BehaviorSubject<string> = new BehaviorSubject('');
    public isTranslatedWord = true;
    public formSubmitted = false;
    public errCounter = 0;
    public counterWord = 0;
    private dictanory: IWord[] = this.storage.getDictFromLS( `${this.state.lang}_Dict` );

    constructor(
        public state: StateService,
        private storage: StorageService
    ){ }

    ngOnInit(): void {
    }

    public submitAnswer( form ){
        let wordAnswer:string = form.value.translatedWord.toLowerCase();
        let wordFromDict:IWord = this.dictanory.find( word=>
            word.learning == this.learningLangWord.value
        )
        if( wordFromDict.native == wordAnswer ){
            this.isTranslatedWord = true;
        }else{
            this.isTranslatedWord = false;
            this.errCounter++;
        }
        this.formSubmitted = !this.formSubmitted
    }
    public nextWord(){
        if( this.counterWord < this.state.wordsAmount ){
            let randomWord:string = this.dictanory[ this.getRandomIntInclusive( 0, this.dictanory.length - 1 ) ].learning;
            this.learningLangWord.next( randomWord );
            this.counterWord ++;
            
            console.log('nextWord', randomWord );
        }
    }
    public reset( form ){
        form.reset();
        this.isTranslatedWord = true;
        this.formSubmitted = !this.formSubmitted
    }
    private getRandomIntInclusive( min:number, max:number ): number {
        min = Math.ceil( min );
        max = Math.floor( max );
        return Math.floor( Math.random() * ( max - min + 1 )) + min;
    }
}
