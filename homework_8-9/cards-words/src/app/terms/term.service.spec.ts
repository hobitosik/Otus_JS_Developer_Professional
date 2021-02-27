import { TestBed } from '@angular/core/testing';

import { TermService } from './term.service';

describe('TermService', () => {
    let service: TermService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TermService);
    });

    it('should be created', ()=>{
        expect( service ).toBeTruthy();
    });

    it('getTerm() will return the overridden value by key', ()=>{
        let overrideObj = {
            'en': 'Анг',
            'ru': 'Рус',
            'de': 'Нем',
            'fr': 'Франц'
        }
        service.currentOverride = overrideObj;
        expect( service.getTerm( 'de', overrideObj )).toBe( 'Нем' )
        expect( service.getTerm( 'it', 'Итальянский' )).toBe( 'Итальянский' )
        expect( service.getTerm( 'fr' )).toBe( 'Франц' )
    })
    it('getTerm() will return the value by key', ()=>{
        expect( service.getTerm( 'en' )).toBe( 'Английский' )
    })
});
