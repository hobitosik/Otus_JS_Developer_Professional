import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent( AppComponent );
    }));

    it('should create the app', ()=>{
        const app = fixture.componentInstance;
        expect( app ).toBeTruthy();
    });

    it(`should have as title 'Cards-Words'`, ()=>{
        const app = fixture.componentInstance;
        expect( app.title ).toEqual('Cards-Words');
    });

    it('should render title', ()=>{
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect( compiled.querySelector('h1.title').textContent ).toContain( `Приложение 'Cards-Words' для запоминания иностранных слов` );
    });
});
