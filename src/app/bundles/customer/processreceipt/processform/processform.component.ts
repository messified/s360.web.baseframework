import {
    Component, ViewEncapsulation, AfterContentInit,
    AfterViewChecked, AfterViewInit, ViewChild, ViewChildren
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReceiptProcessService } from '../../../../services/receiptprocess.service';
import { CustomerState } from '../../../../state/customer.state';
import { CustomerStateStore } from '../../../../state/store/customer.state.store';
declare var jQuery: any;

@Component({
    selector: '[processform]',
    templateUrl: './processform.template.html',
    styleUrls: ['./processform.style.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProcessForm implements AfterViewInit {
    @ViewChildren('input') vc;
    @ViewChildren('datepicker') dp;

    datepickerOpts: any = {autoclose: true, icon: 'fa fa-calendar', format: 'yyyy-mm-dd'};
    formValid: any;
    barcode: string;
    playerID: string;
    receiptDate: any = null;
    formattedDate: string = null;

    constructor (private receiptProcessService: ReceiptProcessService,
                 private customerStateStore: CustomerStateStore) {
        this.customerStateStore.customerState.subscribe(
            (customerState: CustomerState) => {
                this.playerID = customerState.playerID;
            }
        );
    }

    ngOnInit (): void {
        jQuery('.parsleyjs').parsley();
        this.formValid = jQuery('.parsleyjs').parsley();
        //jQuery('#datetimepicker1').datetimepicker();
    }

    ngAfterViewInit (): void {

    }

    validateForm () {
        console.log("validate form");

        jQuery('.parsleyjs').parsley().validate();

        if (this.formValid.isValid()) {
            if (this.receiptDate !== null) {
                let selectedDate = new Date(this.receiptDate.formatted).getTime() / 1000;
                let timestamp = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
                if (selectedDate < timestamp) {
                    console.log('Receipt is older than 7 days.');
                    jQuery('.date-error').toggle();

                    return 0;
                }

                this.formattedDate = this.receiptDate.formatted;
            }

            this.processForm();
        }
    }

    processForm () {
        console.log({
            'playerId': this.playerID,
            'receiptDate': this.formattedDate,
            'barcode': this.barcode
        });

        this.receiptProcessService.processReceipt({
            playerId: this.playerID,
            receiptDate: this.formattedDate,
            barcode: this.barcode
        });
    }

    clearForm () {
        this.playerID = null;
        this.barcode = null;
        this.receiptDate = null;
        this.formattedDate = null;
    }
}
