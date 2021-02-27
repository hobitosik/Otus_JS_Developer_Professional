import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TermPipe } from '../terms/term.pipe';
import { StateService } from '../services/state.service';
import { StorageService } from '../services/storage.service';
import { TimerComponent } from '../timer/timer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PraxisComponent } from './praxis.component';
import { IWord } from '../types';

describe('PraxisComponent', ()=>{
    let component: PraxisComponent;
    let fixture: ComponentFixture<PraxisComponent>;
    let testForm = <NgForm>{
        resetForm: () => null,
        value: { translatedWord: '' }
    };
    const dict:IWord[] = [{
        id: 0,
        native: 'привет',
        learning: 'hello'
    }]

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PraxisComponent, TermPipe, TimerComponent ],
            imports: [ FormsModule ],
            providers: [StateService, StorageService],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent( PraxisComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect( component ).toBeTruthy();
    });
    
    describe('HTML markup elements', ()=>{
        it('should render title', ()=>{
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            component.state.lang = 'en';
            expect( compiled.querySelector('h2').textContent ).toContain( `Проверь свои знания! Английский` );
        });
        it('should render button "Start" if no timer is running', ()=>{
            const timer = fixture.debugElement.nativeElement.querySelector('cw-timer');
            timer.timerStarted = false;
            fixture.detectChanges();
            const btnEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-btn_start');
            expect( btnEl.textContent ).toMatch( 'Начать' );
        })

        describe('should be executed when the timer is running', ()=>{

            beforeEach(() => {
                const timer = fixture.debugElement.nativeElement.querySelector('cw-timer');
                timer.timerStarted = false;
                fixture.detectChanges();
    
                const btnStartEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-btn_start');
                btnStartEl.click();
                fixture.detectChanges();
            });

            it('should render button "Stop" and form if timer is running', ()=>{    
                const btnStopEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-btn_stop');
                const formEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-form');
                expect( btnStopEl.textContent ).toMatch( 'Завершить' );
                expect( formEl ).not.toBeNull();
            })
            it('an error message should be displayed if the translation is not correct', ()=>{
                component.formSubmitted = true;
                component.isTranslatedWord = false;
                fixture.detectChanges();
                const noteEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-form-control__note');
                expect( noteEl.textContent ).toMatch( 'Неверный перевод' );
            })
            it('an success message should be displayed if the translation is correct', ()=>{
                component.formSubmitted = true;
                component.isTranslatedWord = true;
                fixture.detectChanges();
                const noteEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-note_done');
                expect( noteEl.textContent ).toMatch( 'Правильно!' );
            })
            it('should display the number of errors', ()=>{
                component.errCounter = 3;
                fixture.detectChanges();
                const noteEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-form + .cw-note');
                expect( noteEl.textContent ).toMatch( '3' );
            })
        })
    })

    describe('Performance of functions', ()=>{
        beforeEach(() => {
            fixture.detectChanges();
        });

        describe('submitAnswer() should be check the answer against the value in the dictionary...', ()=>{
            
            beforeEach(() => {
                component.errCounter = 0
                component.counterWord = 0;
                component['dictanory'] = dict;
                component.nextWord();
            });

            it('...correct answer', ()=>{
                testForm.value.translatedWord = 'привет';
                component.submitAnswer( testForm );
                expect( component.isTranslatedWord ).toBeTruthy();
            })
            it('...incorrect answer, the error counter will increase', ()=>{
                testForm.value.translatedWord = 'здравствуйте';
                component.submitAnswer( testForm );
                expect( component.isTranslatedWord ).toBeFalsy();
                expect( component.errCounter ).toBe( 1 );
            })
        })
        describe('nextWord() should...', ()=>{
            it('...increase the word count and add a random word to the exercise', ()=>{
                component.counterWord = 0;
                component['dictanory'] = dict;
                component.nextWord();
                expect( component.counterWord ).toEqual( 1 );
                expect( component.learningLangWord$.getValue() ).not.toBeNull;
            })
            it('nothing should change when the word count is equal to the number of words being studied', ()=>{
                component.state.wordsAmount = 5
                component.counterWord = 5;
                component.nextWord();
                expect( component.counterWord ).toEqual( 5 );
            })
        })
        it('reset() should be form reseted and submitted', ()=>{
            component.formSubmitted = false;
            component.reset( testForm );
            expect( component.isTranslatedWord ).toBeTruthy();
            expect( component.formSubmitted ).toBeTruthy();
        })
    })
});
