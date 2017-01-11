import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { CustomerState, initialCustomerState } from '../customer.state';

@Injectable()
export class CustomerStateStore {
	private _customerState: BehaviorSubject<CustomerState> = new BehaviorSubject(initialCustomerState);

	get customerState(): Observable<CustomerState> {
		return this._customerState.asObservable();
	}

	public updateCustomerState(customer: CustomerState): void {
		console.log('Updating Customer State:' + JSON.stringify(customer));
		this._customerState.next(customer);
	}
}
