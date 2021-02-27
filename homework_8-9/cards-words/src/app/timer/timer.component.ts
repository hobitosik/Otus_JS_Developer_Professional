import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cw-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    @Input() hours = 0;
    @Input() minutes = 5;
    public seconds = 0;
    public timerStarted = false;

    private initialHours:number;
    private initialMinutes:number;
    private timeInt: any;

    constructor() { }

    ngOnInit(): void {
        this.initialHours = this.hours;
        this.initialMinutes = this.minutes;
    }

    public start(){
        this.timerStarted = true;
        if( this.hours == 0 && this.minutes == 0 && this.seconds == 0 ){
            this.hours = this.initialHours;
            this.minutes = this.initialMinutes;
        }
        this.timeInt = setInterval(()=>{
            if( this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0 )
                this.pause();
            else{
                if( this.seconds == 0 ){
                    this.seconds = 59;
                    if( this.minutes == 0 ){
                        this.minutes = 59;
                        this.hours--
                    }else
                        this.minutes--;
                }else
                    this.seconds--;
            }
        }, 1000);
    }
    public pause(){
        clearInterval( this.timeInt );
        this.timerStarted = false;
    }
    public stop(){
        clearInterval( this.timeInt );
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timerStarted = false;
    }
}
