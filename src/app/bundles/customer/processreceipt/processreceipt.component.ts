import { Component } from '@angular/core';
import { Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReceiptProcessService } from '../../../services/receiptprocess.service';
import { ReceiptProcessResults } from '../../../state/receiptprocess.state';

@Component({
    selector: '[processreceipt]',
    templateUrl: './processreceipt.template.html',
    styleUrls: ['./processreceipt.style.scss'],
    providers: [ReceiptProcessService]
})

export class ProcessReceipt {
    processFormShow: boolean = false;
    processResultsShow: boolean = true;

    constructor (private receiptProcessService: ReceiptProcessService) {
        this.receiptProcessService.receiptProcessResults.subscribe(
            (receiptProcess: ReceiptProcessResults) => {
                console.log('Received Results::' + receiptProcess.processed);
                if (receiptProcess.processed) {
                    this.processFormShow = false;
                    this.processResultsShow = true;
                } else {
                    this.processFormShow = true;
                    this.processResultsShow = false;
                }
            });
    }
}
