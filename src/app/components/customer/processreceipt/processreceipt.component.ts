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
  constructor(private receiptProcessService: ReceiptProcessService){
    this.receiptProcessService.receiptProcessResults.subscribe(
      (receiptprocess: ReceiptProcessResults) => {
        console.log('Received Results::'+receiptprocess.processed);
      if (receiptprocess.processed){
        this.processFormShow = false;
        this.processResultsShow = true;
      } else {
        this.processFormShow = true;
        this.processResultsShow = false;
      }
    });
  }
}
