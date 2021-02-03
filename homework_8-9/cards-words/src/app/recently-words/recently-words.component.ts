import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { IWord } from '../types';

@Component({
    selector: 'cw-recently-words',
    templateUrl: './recently-words.component.html',
    styleUrls: ['./recently-words.component.scss']
})
export class RecentlyWordsComponent implements OnInit {

    public recentlyWords: IWord[] = [];

    constructor(
        private appSrv: AppService
    ){ }

    ngOnInit(): void {
        // console.log('[RecentlyWordsComponent][INIT]')

        this.appSrv.dictanory$.subscribe( wordArr=>
            this.recentlyWords = wordArr
        )
    }

}
