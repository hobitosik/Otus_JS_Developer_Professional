import { Pipe, PipeTransform } from '@angular/core';
import { TermService } from './term.service';

@Pipe({
    name: 'term'
})
export class TermPipe implements PipeTransform {
    constructor(
        private termSe: TermService
    ){ }

    transform( code: string, override?: any ): any {
        return this.termSe.getTerm( code, override ) || code;
    }

}
