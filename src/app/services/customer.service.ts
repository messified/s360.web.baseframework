import { Injectable } from '@angular/core';
import { EventService } from 'stations-events/services/event.service';
import { CustomerContext, GetCustomerContext } from 'stations-events/eventbase';
import { CustomerStateStore } from '../state/store/customer.state.store';
import { CustomerState, initialCustomerState } from '../state/customer.state';

@Injectable()
export class CustomerService {
    private config: any;

    constructor (private eventService: EventService,
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

    lookupCustomer () {
        // Publish get GetCustomerContext event to pull the existing customer
        this.eventService.publish<GetCustomerContext>(new GetCustomerContext());
    }
}
// "customer":{"PatronId":"3071344","PatronProfile":{"FirstName":"WILLIAM","LastName":"SMITH","Dob":{"DT":"1960-01-01T00:00:00","UtcOffsetMinutes":0}},"BoardingPass":[{"CardNumber":"3071344"}],"PatronAddress":[{"AddressLineList":["413 BIBBON RD"],"City":"WILLIAMS LAKE","State":"British Columbia","PostalCode":"V2G3N4"}]}}