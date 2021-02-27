import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWordsComponent } from './add-words.component';
import { AppService } from '../services/app.service';
import { TermPipe } from '../terms/term.pipe';

describe('AddWordsComponent', () => {
    let component: AddWordsComponent;
    let fixture: ComponentFixture<AddWordsComponent>;
    let appSrvSpy = jasmine.createSpyObj( 'AppService', {
        sliceSentence$: 'Привет мир',
        saveToDct: ['Привет мир', 'Hello\nworld']
    })

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ AddWordsComponent, TermPipe ],
            providers: [{ provide: AppService, useValue: appSrvSpy }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent( AddWordsComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect( component ).toBeTruthy();
    });

    describe('HTML markup elements', ()=>{
        it('until the form is valid, a message should be displayed stating that the field must be filled', ()=>{
            component.addWordsForm.get('nativeLangWords').setValue( null )
            fixture.detectChanges();
            const noteEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-form-control__note');
            expect( noteEl.textContent ).toMatch( 'Поле обязательно для заполнения' );
        })
        it('the add to dictionary button should be disabled until the form is invalid', ()=>{
            component.addWordsForm.reset();
            fixture.detectChanges();
            const btnEl = fixture.debugElement.nativeElement.querySelector('.cw-form__btn_secondary + .cw-form__btn');
            expect( btnEl.disabled ).toBeTruthy();
        })
        it('should contain "Слово / слова добавлено в словарь!", if the word was added to the dictionary', ()=>{
            component.savedToDict$.next( true );
            fixture.detectChanges();
            const noteEl: HTMLElement = fixture.debugElement.nativeElement.querySelector('.cw-note_done');
            expect( noteEl.textContent ).toMatch( 'Слово / слова добавлено в словарь!' );
        })
    })

    describe('Performance of functions', ()=>{
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should set addWordsForm empty values and validators in OnInit', ()=>{
            component.ngOnInit();
            expect( component.addWordsForm.get('nativeLangWords').invalid ).toBeTrue();
            expect( component.addWordsForm.get('learningLangWords').invalid ).toBeTrue();
        })

        it('addStorage() should be should call the "AppService" save method', ()=>{
            component.addStorage();
            expect( appSrvSpy.saveToDct ).toHaveBeenCalled();
            expect( component.savedToDict$.getValue() ).toBeTrue();
        })
        it('reset() should be form reseted', ()=>{
            component.addWordsForm.get('nativeLangWords').setValue('привет');
            component.addWordsForm.get('learningLangWords').setValue('hello');
            component.reset();
            expect( component.savedToDict$.getValue() ).toBeFalsy();
            expect( component.addWordsForm.get('nativeLangWords').value ).toBeNull();
            expect( component.addWordsForm.get('learningLangWords').value ).toBeNull();
        })
    })
});

