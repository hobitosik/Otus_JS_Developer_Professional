import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
    selector: 'cw-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public settingsIsSave: boolean;
    public langs = ['en', 'de', 'fr'];
    public lang = '';
    public wordsAmount = 0;
    public hours = 0;
    public minutes = 0;

    constructor(
        public state: StateService
    ){ }

    ngOnInit(): void {
        this.lang = this.state.lang;
        this.wordsAmount = this.state.wordsAmount;
        this.hours = this.state.time.hours;
        this.minutes = this.state.time.minutes;
    }

    public submit(){
        this.state.setState( this.lang, this.wordsAmount, { hours: this.hours, minutes: this.minutes } );
        console.log('[SETTINGS] submit', this.state)
    }

}
