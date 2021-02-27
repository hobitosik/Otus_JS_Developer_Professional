import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;
    let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PageNotFoundComponent ],
            providers: [
                { provide: Router, useValue: routerSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent( PageNotFoundComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect( component ).toBeTruthy();
    });

    it(`should navigate to Home page (new-words)`, () => {
        component.goToMain();
        expect( routerSpy.navigateByUrl ).toHaveBeenCalledWith('/new-words');
    });
});
