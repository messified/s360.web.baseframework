import { inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe('App', () => {

	let _classUnderTest: AppComponent;

	// Configure component
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			AppState,
			AppComponent
		]
	}));

	// Initialize dependencies
	beforeEach(inject([AppComponent], (appComponent) => {
		_classUnderTest = appComponent;
	}));


	it('should have a url', (done) => {

		expect(_classUnderTest.url).toEqual('https://s360.development.stationcasinos.net/desktop');

		done();
	});

});