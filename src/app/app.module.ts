import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { AppSettingsService } from 'stations-events/services/appsettings.service';
import { EventService } from 'stations-events/services/event.service';
// App is our top level component
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { ROUTES } from './app.routes';
import { AppState, InternalStateType } from './app.service';
import { ENV_PROVIDERS } from './environment';
import { CustomerService } from './services/customer.service';
import { CustomerStateStore } from './state/store/customer.state.store';
import { NavRouteStateStore } from './state/store/route.state.store';
import { UserStateStore } from './state/store/user.state.store';

// Application wide providers
const APP_PROVIDERS = [
	...APP_RESOLVER_PROVIDERS,
	AppState,
	AppConfig,
	AppSettingsService,
	CustomerService,
	CustomerStateStore,
	UserStateStore,
	EventService,
	NavRouteStateStore,
];

type StoreType = {
	state: InternalStateType,
	restoreInputValues: () => void,
	disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
	],
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		AlertModule.forRoot(),
		DatepickerModule.forRoot(),
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {
	constructor(public appRef: ApplicationRef, public appState: AppState) {
	}

	public hmrOnInit(store: StoreType): void {
		if (!store || !store.state) { return; };
		console.log('HMR store', JSON.stringify(store, null, 2));
		// set state
		this.appState._state = store.state;
		// set input values
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}

		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}

	public hmrOnDestroy(store: StoreType): void {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// save state
		const state = this.appState._state;
		store.state = state;
		// recreate root elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: StoreType): void {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}

}

