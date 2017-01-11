import { Component, ViewEncapsulation } from '@angular/core';
import { CustomerStateStore } from '../../state/store/customer.state.store';
import { CustomerState } from '../../state/customer.state';

@Component({
    selector: 'customer',
    templateUrl: 'customer.template.html',
    styleUrls: ['customer.style.scss' ],
    encapsulation: ViewEncapsulation.None,
})

export class Customer {
    noCustomerContextShow: boolean = false;

    constructor (private customerStateStore: CustomerStateStore) {
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
