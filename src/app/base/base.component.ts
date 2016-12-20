import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../app.service';

@Component({
    selector: 'base',
    templateUrl: './base.template.html',
    encapsulation: ViewEncapsulation.None,
})

export class BaseComponent {
    // Set our default values
    localState = { value: 'src/app/base/base.component.ts' };
    // TypeScript public modifiers
    constructor(public appState: AppState) {
        appState._state = this.localState;
    }

    ngOnInit() {
        console.log('hello `Base` component');
        // this.title.getData().subscribe(data => this.data = data);
    }
}