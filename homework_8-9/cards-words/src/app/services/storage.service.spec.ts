import { TestBed } from '@angular/core/testing';
import { IWord } from '../types';

import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;
    const dict: IWord[] = [{
        id: 1,
        native: 'привет',
        learning: 'hello'
    },{
        id: 2,
        native: 'мир',
        learning: 'world'
    }]

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject( StorageService );
    });

    it('should be created', () => {
        expect( service ).toBeTruthy();
    });

    describe('getDictFromLS() should be return...', ()=>{
        it('...a dictionary from local storage', () => {
            service.setDictToLS( 'test_dict', dict );
            expect( service.getDictFromLS( 'test_dict' ) ).toEqual( dict )
        });

        it('...an empty object', () => {
            expect( service.getDictFromLS( 'nonexistentKey' ) ).toEqual( {} )
        });
    })
    it('setDictToLS() should be a dictionary to local storage', () => {
        service.setDictToLS( 'test_dict', dict );
        expect( localStorage.getItem( 'test_dict' ) ).not.toEqual( null )
    });
});
