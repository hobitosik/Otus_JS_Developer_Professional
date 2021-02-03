import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewWordsComponent } from './new-words/new-words.component';
import { PraxisComponent } from './praxis/praxis.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'new-words', component: NewWordsComponent },
    { path: 'praxis', component: PraxisComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '',   redirectTo: '/new-words', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
