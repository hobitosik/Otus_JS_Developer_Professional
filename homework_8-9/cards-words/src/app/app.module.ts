import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewWordsComponent } from './new-words/new-words.component';
import { SettingsComponent } from './settings/settings.component';
import { PraxisComponent } from './praxis/praxis.component';
import { AddWordsComponent } from './add-words/add-words.component';
import { RecentlyWordsComponent } from './recently-words/recently-words.component';
import { TimerComponent } from './timer/timer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TermService } from './terms/term.service';
import { TermPipe } from './terms/term.pipe';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        NewWordsComponent,
        SettingsComponent,
        PraxisComponent,
        AddWordsComponent,
        RecentlyWordsComponent,
        TimerComponent,

        TermPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [TermService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule { }
