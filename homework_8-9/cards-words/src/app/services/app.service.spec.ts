import { TestBed } from '@angular/core/testing';
import { TranslateService } from './translate.service';
import { IWord } from '../types';

import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;
    let translateSrvSpy = jasmine.createSpyObj('TranslateService', { getTranslateWord$: 'Hello' });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: TranslateService, useValue: translateSrvSpy }]
        });
        service = TestBed.inject( AppService );
    });

    it('should be created', ()=>{
        expect( service ).toBeTruthy();
    });

    describe('sliceSentence$() should return...', () => {
        it('...the translation of each word from the sentence, the method of service translate will be called', ()=>{
            service.sliceSentence$( 'Привет мир' ).subscribe( value =>{
                expect( translateSrvSpy.getTranslateWord$ ).toHaveBeenCalled();
                expect( translateSrvSpy.getTranslateWord$.calls.count() ).toBe(2);
            })
        });
        it('...a flow with an empty array if passed "null"', ()=>{
            service.sliceSentence$( null ).subscribe( value =>{
                expect( value ).toEqual( [] )
            })
        });
    });

    describe('saveToDct() should be...', () => {
        beforeEach(()=>{
            service.dictanory = [];
            service.dictanory$.next( service.dictanory );
        })

        it('...nothing added to the dictionary if the number of words does not match the number of their translation', ()=>{
            service.saveToDct('Привет мир', 'Hello');
            expect( service.dictanory$.getValue() ).toEqual( [] )
        });
        it('...add a new value to the dictionary', ()=>{
            service.saveToDct('Привет', 'Hello')
            expect( service.dictanory$.getValue()[0].native ).toEqual( 'привет' )
            expect( service.dictanory$.getValue()[0].learning ).toEqual( 'hello' )
        });
        it('...a word that is already in the dictionary will not be added', ()=>{
            let word:IWord = { id: 0, native: 'привет', learning: 'hello' };
            service.dictanory.push( word );
            service.dictanory$.next( service.dictanory );
            service.saveToDct('привет', 'hello');
            expect( service.dictanory$.getValue().length ).toBe( 1 )
        });
    });
});
