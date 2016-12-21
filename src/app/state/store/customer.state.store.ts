import { Injectable } from '@angular/core';
import { CustomerState, initialCustomerState } from '../customer.state';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class CustomerStateStore {
    private _customerState: BehaviorSubject<CustomerState> = new BehaviorSubject(initialCustomerState);

    get customerState() {
        return this._customerState.asObservable();
    }

    updateCustomerState( customer: CustomerState ) {
        console.log('Updating Customer State:' + JSON.stringify(customer));
        this._customerState.next( customer );
    }
}
