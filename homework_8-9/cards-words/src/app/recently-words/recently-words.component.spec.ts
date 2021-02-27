import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from '../services/app.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IWord } from '../types';

import { RecentlyWordsComponent } from './recently-words.component';
import { By } from '@angular/platform-browser';

@Injectable()
class AppServiceMock {
    public dictanory: IWord[] = [
        {id: 0, native: 'привет', learning: 'hello'},
        {id: 1, native: 'мир', learning: 'world'}
    ];
    public dictanory$: BehaviorSubject<IWord[]> = new BehaviorSubject( this.dictanory );

    constructor(){}
}

describe('RecentlyWordsComponent', () => {
    let component: RecentlyWordsComponent;
    let fixture: ComponentFixture<RecentlyWordsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RecentlyWordsComponent ],
            providers: [{ provide: AppService, useClass: AppServiceMock }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent( RecentlyWordsComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect( component ).toBeTruthy();
    });

    it('should set recentlyWords value in OnInit', () => {
        component.ngOnInit();
        expect( component.recentlyWords[0].native ).toEqual('привет');
        expect( component.recentlyWords[0].learning ).toEqual('hello');
        expect( component.recentlyWords[1].native ).toEqual('мир');
        expect( component.recentlyWords[1].learning ).toEqual('world');
    });

    describe('HTML markup elements', ()=>{

        it('the first element of the list should be contain content from the last element of the recently word array', ()=>{
            const listItemFirst = fixture.nativeElement.querySelector( '.cw-list li:first-child' );
            expect( listItemFirst.textContent ).toMatch( 'world' );
            expect( listItemFirst.textContent ).toMatch( 'мир' );
        })
    })
});
