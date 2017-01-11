/*
 * App Component
 * Top Level Component
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

@Component({
	selector: 'app',
	styleUrls: ['../assets/scss/global.scss'],
	encapsulation: ViewEncapsulation.None,
	templateUrl: './app.component.html',
})
export class AppComponent {
	public name: string = 'S360 Base Framework';
	public url: string = 'https://s360.development.stationcasinos.net/desktop';

	constructor(public appState: AppState) {

	}

	public ngOnInit(): void {
		console.log('Initial App State', this.appState.state);
	}

}
