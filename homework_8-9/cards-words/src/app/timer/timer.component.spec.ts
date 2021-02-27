import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
    let component: TimerComponent;
    let fixture: ComponentFixture<TimerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TimerComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
    });

    it('should create', ()=>{
        expect( component ).toBeDefined();
    });

    describe('HTML markup elements', ()=>{
        it('should contain "Ваше время истекло!", if time is up', ()=>{
            component.hours = 0;
            component.minutes = 0;
            component.seconds = 0;
            fixture.detectChanges();
            const timerEL: HTMLElement = fixture.nativeElement;
            const noteEl: Element = timerEL.querySelector( '.cw-blink' );
            expect( noteEl.textContent ).toContain( 'Ваше время истекло!' );
        })
        
        it('should hide contents if show is false', ()=>{
            const noteEl: DebugElement = fixture.debugElement.query( By.css('cw-blink') );
            expect( noteEl ).toBeNull();
        })

        it('should contain "hours, minutes, seconds"', ()=>{
            component.hours = 11;
            component.minutes = 42;
            component.seconds = 0;
            fixture.detectChanges();
            const timerEL: Element = fixture.nativeElement.querySelector( '.cw-timer' );
            expect( timerEL.textContent ).toContain( '11 ч : 42 мин : 0 сек' );
        })

        it('play button is disabled if the timer has started', ()=>{
            component.timerStarted = true;
            fixture.detectChanges();
            let playBtn: DebugElement = fixture.debugElement.query( By.css('button.cw-form__btn_start') );
            expect( playBtn.nativeElement.disabled ).toBe( true );
        })

        it('stop button is disabled if the timer not started', ()=>{
            component.timerStarted = false;
            fixture.detectChanges();
            let stopBtn: DebugElement = fixture.debugElement.query( By.css('button.cw-form__btn_stop') );
            expect( stopBtn.nativeElement.disabled ).toBe( true );
        })
    })

    describe('Performance of functions', ()=>{
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should be timer start and stop since time is zero',()=>{
            component.hours = 0;
            component.minutes = 0;
            component.seconds = 0;
            component.start();
            expect( component.timerStarted ).toBe( true );
            expect( component.minutes ).toBe( 5 );
        })
        it('should be the timer will start and stop after a minute', fakeAsync(()=>{
            component.minutes = 1;
            component.start();
            expect( component.timerStarted ).toBe( true );
            setTimeout(()=> { console.log('Timer has stoped')}, 60000)
            tick(60000);
            expect( component.minutes ).toBe( 0 );
            discardPeriodicTasks()
        }))
        it('should be the timer will start and stop after a hour', fakeAsync(()=>{
            component.hours = 1;
            component.minutes = 0;
            component.start();
            expect( component.timerStarted ).toBe( true );
            setTimeout(()=> { console.log('Timer has stoped')}, 3600000)
            tick(3600000);
            expect( component.hours ).toBe( 0 );
            expect( component.minutes ).toBe( 0 );
            discardPeriodicTasks()
        }))
        it('pause() should be pause timer', ()=>{
            component.pause();
            expect( component.timerStarted ).toBe( false );
        })
        it('stop() should be stop timer and time is null', ()=>{
            component.stop();
            expect( component.timerStarted ).toBe( false );
            expect( component.hours ).toBe( 0 );
            expect( component.minutes ).toBe( 0 );
            expect( component.seconds ).toBe( 0 );
        })
    })
});
