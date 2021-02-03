import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
    selector: 'cw-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    public settingsIsSave: boolean;
    public langs = ['en', 'de', 'fr'];

    constructor(
        public state: StateService
    ){ }

    ngOnInit(): void {
    }

    public submit(){
        console.log('[SETTINGS] submit', this.state)
    }

}
