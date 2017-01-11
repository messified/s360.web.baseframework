import { Component, ViewEncapsulation } from '@angular/core';
import { CustomerState } from '../../state/customer.state';
import { CustomerStateStore } from '../../state/store/customer.state.store';

@Component({
	selector: 'customer',
	templateUrl: 'customer.template.html',
	encapsulation: ViewEncapsulation.None,
})

export class Customer {
	public noCustomerContextShow: boolean = false;

	constructor(private customerStateStore: CustomerStateStore) {
		this.customerStateStore.customerState.subscribe(
			(customerState: CustomerState) => {

				console.log('customer state::' + customerState.playerID);

				if (customerState.playerID === null) {
					this.noCustomerContextShow = true;
				}
			}
		);
	}
}
