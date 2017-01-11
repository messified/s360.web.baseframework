import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { initialNavRoute, NavRoute } from '../route.state';

@Injectable()
export class NavRouteStateStore {
	private _routeState: BehaviorSubject<NavRoute> =
	new BehaviorSubject(initialNavRoute);

	get routeState(): Observable<NavRoute> {
		return this._routeState.asObservable();
	}

	public updateRouteState(route: NavRoute): void {
		console.log('Updating route State:' + JSON.stringify(route));
		this._routeState.next(route);
	}
}
