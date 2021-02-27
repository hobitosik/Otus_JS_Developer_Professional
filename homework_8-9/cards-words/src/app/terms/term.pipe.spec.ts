import { TestBed } from '@angular/core/testing';
import { TermPipe } from './term.pipe';
import { TermService } from './term.service';

describe('TermPipe', () => {
    let termSrvSpy = jasmine.createSpyObj( 'AppService', {
        getTerm: 'fr'
    })
    const pipe = new TermPipe( termSrvSpy );

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: TermService, useValue: termSrvSpy }]
        });
    });

    it('create an instance', ()=>{
        expect( pipe ).toBeTruthy();
    });

    it('should by key return the corresponding value from the dictionary', ()=>{
        termSrvSpy.getTerm.and.returnValue( 'Французский' );
        expect( pipe.transform( 'fr' ) ).toBe( 'Французский' );
        termSrvSpy.getTerm.and.stub()
    })

    it('should return the key if there is no value in the dictionary', ()=>{
        termSrvSpy.getTerm.and.returnValue( 'uk' );
        expect( pipe.transform( 'uk' ) ).toBe( 'uk' );
    })
});
