import { Injectable } from '@angular/core';
import { NavRoute, initialNavRoute } from '../route.state';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class NavRouteStateStore {
    private _routeState: BehaviorSubject<NavRoute> =
        new BehaviorSubject(initialNavRoute);

    get routeState () {
        return this._routeState.asObservable();
    }

    updateRouteState (route: NavRoute) {
        console.log('Updating route State:' + JSON.stringify(route));
        this._routeState.next(route);
    }
}
