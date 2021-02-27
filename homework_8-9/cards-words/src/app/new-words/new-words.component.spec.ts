import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NewWordsComponent } from './new-words.component';

describe('NewWordsComponent', () => {
    let component: NewWordsComponent;
    let fixture: ComponentFixture<NewWordsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NewWordsComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewWordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect( component ).toBeTruthy();
    });

    describe('It should be rendered component', ()=>{
        it('AddWordsComponent', ()=>{
            const addWordsComp = fixture.debugElement.nativeElement.querySelector('cw-add-words-form');
            expect( addWordsComp ).not.toBeNull();
        })
        it('RecentlyWordsComponent', ()=>{
            const recentlyComp = fixture.debugElement.nativeElement.querySelector('cw-recently-words');
            expect( recentlyComp ).not.toBeNull();
        })
    })
});
