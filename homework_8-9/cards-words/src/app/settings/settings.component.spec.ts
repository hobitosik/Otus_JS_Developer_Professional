import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TermPipe } from '../terms/term.pipe';
import { StateService } from '../services/state.service';

import { SettingsComponent } from './settings.component';
import { DebugElement } from '@angular/core';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SettingsComponent, TermPipe ],
            imports: [ FormsModule ],
            providers: [ StateService ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect( component ).toBeTruthy();
    });

    describe('HTML markup elements, form elements changes', ()=>{
        
        it('should be the value of the "lang" field changed', fakeAsync(()=>{
            const langSelect = fixture.debugElement.query( By.css( 'select' )).nativeElement;
            const langOption = fixture.debugElement.queryAll( By.css( 'option' ) )[1];

            langSelect.value = 'de';
            langSelect.dispatchEvent( new Event( 'change' ));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                tick();
                expect( component.lang ).toEqual( 'de' );
                expect( langOption.nativeElement.selected ).toBe( true );
            });
        }))
        
        it('should be the value of the "wordsAmount" field changed', async(()=>{
            const wordsAmountField = fixture.debugElement.query( By.css( 'input[name="wordsAmount"]' )).nativeElement;
            wordsAmountField.value = 13;
            wordsAmountField.dispatchEvent( new Event( 'change' ));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect( component.wordsAmount ).toEqual( 13 )
            });
        }))

        it('should be the value of the "hours" field changed', async(()=>{
            const hoursField = fixture.debugElement.query( By.css( 'input[name="hours"]' )).nativeElement;
            hoursField.value = 1;
            hoursField.dispatchEvent( new Event( 'change' ));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect( component.hours ).toEqual( 1 )
            });
        }))

        it('should be the value of the "minutes" field changed', async(()=>{
            const minutesField = fixture.debugElement.query( By.css( 'input[name="minutes"]' )).nativeElement;
            minutesField.value = 25;
            minutesField.dispatchEvent( new Event( 'change' ));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect( component.minutes ).toEqual( 25 )
            });
        }))

        it('should be reset to default settings if you clicked the reset button', async(()=>{
            component.lang = 'de';
            component.wordsAmount = 30;
            component.hours = 1;
            component.minutes = 30;
            component.submit();
            fixture.detectChanges();

            const resetBtn = fixture.nativeElement.querySelector( '.cw-form__btn_secondary' )
            resetBtn.dispatchEvent( new Event( 'click' ));

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect( component.state.lang ).toEqual( 'en' )
                expect( component.state.wordsAmount ).toEqual( 5 )
                expect( component.state.time.hours ).toEqual( 0 )
                expect( component.state.time.minutes ).toEqual( 2 )
            })
        }))

        it('should contain "Ваши настройки сохранены!", if you clicked the reset/save button', async(()=>{
            component.settingsIsSave = true;
            fixture.detectChanges();
            const noteEl: Element = fixture.nativeElement.querySelector( '.cw-note_done' );
            expect( noteEl.textContent ).toMatch( 'Ваши настройки сохранены!' );
        }))

        it('should hide contents if show is false', ()=>{
            component.settingsIsSave = false;
            fixture.detectChanges();
            const noteEl: Element = fixture.nativeElement.querySelector( '.cw-note_done' );
            expect( noteEl ).toBeNull();
        })
    })

    describe('Performance of functions', ()=>{
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('submit () should save the state and logged it', ()=>{
            component.lang = 'de';
            component.wordsAmount = 30;
            component.hours = 1;
            component.minutes = 30;
            component.submit();
            fixture.detectChanges();
            expect( component.state.lang ).toEqual( 'de' )
            expect( component.state.wordsAmount ).toEqual( 30 )
            expect( component.state.time.hours ).toEqual( 1 )
            expect( component.state.time.minutes ).toEqual( 30 )
        })
    })
});
