import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { StateService } from '../services/state.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'cw-add-words-form',
    templateUrl: './add-words.component.html',
    styleUrls: ['./add-words.component.scss']
})
export class AddWordsComponent implements OnInit {

    addWordsForm: FormGroup;
    savedToDict$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        public state: StateService,
        private appSrv: AppService,
    ){
        this._createForm()
    }

    ngOnInit(): void {
        this.addWordsForm.get('nativeLangWords').setValidators( Validators.required );
        this.addWordsForm.get('learningLangWords').setValidators( Validators.required );
        this.reset();
        this.addWordsForm.get('nativeLangWords').valueChanges.pipe(
            debounceTime(500),
        ).subscribe(( word:string )=> {
            this.appSrv.sliceSentence$( word ).subscribe( result=>{
                console.log('[result]', result )
                this.addWordsForm.get('learningLangWords').setValue( result.join('\n') )
            })
        })
    }

    public addStorage(){
        console.log( 'addStorage', this.addWordsForm.get('learningLangWords').value );
        this.appSrv.saveToDct( this.addWordsForm.get('nativeLangWords').value, this.addWordsForm.get('learningLangWords').value );
        this.savedToDict$.next( true )
    }

    public reset(){
        this.addWordsForm.reset();
        this.savedToDict$.next( false );
    }

    private _createForm(){
        this.addWordsForm = new FormGroup({
            nativeLangWords: new FormControl({ value: '' }),
            learningLangWords: new FormControl({ value: '' }),
        });
    }
}
