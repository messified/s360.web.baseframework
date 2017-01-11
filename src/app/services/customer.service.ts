import { Injectable } from '@angular/core';
import { CustomerContext, GetCustomerContext } from 'stations-events/eventbase';
import { EventService } from 'stations-events/services/event.service';
import { CustomerState, initialCustomerState } from '../state/customer.state';
import { CustomerStateStore } from '../state/store/customer.state.store';

@Injectable()
export class CustomerService {
	private config: any;

	constructor(
		private eventService: EventService,
		private customerStateStore: CustomerStateStore) {
		// Subscribe to CustomerContext event to get an existing customer
		this.eventService.subscribe<CustomerContext>(
			'CustomerContext', (message: CustomerContext) => {
				console.log('Updating Customer State:' + JSON.stringify(message.customer));
				let customer: CustomerState;
				if (message.customer != null) {
					customer = {
						playerID: message.customer.PatronId,
						firstName: message.customer.PatronProfile.FirstName,
						lastName: message.customer.PatronProfile.LastName,
						dob: message.customer.PatronProfile.Dob,
						address: message.customer.PatronProfile.PatronAddress
					};
				} else {
					customer = initialCustomerState;
				}
				this.customerStateStore.updateCustomerState(customer);
			});

		// Publish get GetCustomerContext event to pull the existing customer
		this.eventService.publish<GetCustomerContext>(new GetCustomerContext());
	}

	public lookupCustomer(): void {
		// Publish get GetCustomerContext event to pull the existing customer
		this.eventService.publish<GetCustomerContext>(new GetCustomerContext());
	}
}