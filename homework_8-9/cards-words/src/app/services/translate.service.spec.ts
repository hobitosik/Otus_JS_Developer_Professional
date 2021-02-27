import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from './translate.service';

describe('TranslateService - testing HTTP request method getTranslateWord$()', ()=>{
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: TranslateService;
    const wordUrlEncoding = '%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82';
    const urlGet = `https://api.mymemory.translated.net/get?q=${wordUrlEncoding}&langpair=ru%7Cen`

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ TranslateService ]
        });
        httpClient = TestBed.inject( HttpClient );
        httpTestingController = TestBed.inject( HttpTestingController );
        service = TestBed.inject( TranslateService );
    });


    it('should return the translation of the word / HttpClient.get', ()=>{
        const res = 'Hello';

        service.getTranslateWord$('Привет').subscribe(response => 
            response['responseData']
                ? expect( response['responseData']['translatedText'] ).toEqual( res )
                : expect( response ).toEqual( '' )
            , fail
        );
        const req = httpTestingController.expectOne( urlGet );
        expect( req.request.method ).toBe('GET');
    
        req.flush( res );
    });

    it('should turn network error into user-facing error', () => {
        const message = 'simulated network error';
  
        service.getTranslateWord$( 'Привет' ).subscribe(
            res => fail( 'expected to fail' ),
            ( err: HttpErrorResponse )=>{
                console.log('simulated network error', err )
                expect( err ).toContain( 'error in source. Details:', 'message' )
            }
        );
  
        const req = httpTestingController.expectOne( urlGet );
        const errorEvent = new ErrorEvent( 'Network error', {
            message: message,
            filename: 'translate.service.ts',
            lineno: 33,
            colno: 46
        });
  
        req.error( errorEvent );
    });

    it('should turn 404 into a user-friendly error', () => {
        const message = 'Deliberate 404';

        service.getTranslateWord$( 'Привет' ).subscribe(
            response => fail( 'expected to fail' ),
            error => expect( error ).toContain( 'error in source. Details:', 'message' )
        );
  
        const req = httpTestingController.expectOne( urlGet );
  
        req.flush( message, { status: 404, statusText: 'Not Found' });
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});
