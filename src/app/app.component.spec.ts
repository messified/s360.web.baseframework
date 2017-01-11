import { inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe('App', () => {

	let _classUnderTest: AppComponent;

	// Configure component
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			AppComponent,
			AppState,
		]
	}));

	// Initialize dependencies
	beforeEach(() => {
		_classUnderTest = TestBed.get(AppComponent);
	});


	it('should have a url', (done) => {

		expect(_classUnderTest.url).toEqual('https://s360.development.stationcasinos.net/desktop');

		done();
	});

	it('should have a name', (done) => {

		expect(_classUnderTest.name).toEqual('S360 Base Framework');

		done();
	});

});