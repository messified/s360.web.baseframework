import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataResolver implements Resolve<any> {
	constructor() {
		// empty
	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ res: string }> {
		return Observable.of({ res: 'I am data' });
	}
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
	DataResolver
];
