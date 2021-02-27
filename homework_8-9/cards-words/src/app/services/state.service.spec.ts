import { TestBed } from '@angular/core/testing';
import { StateService, ITime } from './state.service';

describe('StateService', () => {
    let service: StateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject( StateService );
    });

    it('should be created', ()=>{
        expect( service ).toBeTruthy();
    });

    describe('setState() should...', ()=>{
        it('...save the selected language, the number of words in the exercise and the time allotted for the exercise', ()=>{
            let time:ITime = { hours: 0, minutes: 10 }
            service.setState( 'de', 10, time );
    
            expect( service.lang ).toMatch( 'de' );
            expect( service.wordsAmount ).toBe( 10, 'should be 10' );
            expect( service.time ).toEqual( time );
        })
        it('...the state is not updated, new parameters are not transferred', ()=>{
            let time:ITime = { hours: 0, minutes: 2 }
            service.setState();
    
            expect( service.lang ).toMatch( 'en' );
            expect( service.wordsAmount ).toBe( 5, 'should be 5' );
            expect( service.time ).toEqual( time );
        })
    })

    it('setStateDefault() should be set state values to initial', ()=>{
        service.time = { hours: 1, minutes: 46 }
        service.lang = 'de';
        service.wordsAmount = 20;
        
        service.setStateDefault();

        expect( service.lang ).toMatch( 'en' );
        expect( service.wordsAmount ).toBe( 5, 'should be 5' );
        expect( service.time ).toEqual({ hours: 0, minutes: 2 });
    })
});
