import { Component } from '@angular/core';
import { Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomerStateStore } from '../../../../state/store/customer.state.store';
import { CustomerState } from '../../../../state/customer.state';
import { ReceiptProcessService } from '../../../../services/receiptprocess.service';
import {
    ReceiptProcessResults,
    initialReceiptResults,
    ResponseDataModel
} from '../../../../state/receiptprocess.state';

@Component({
    selector: '[processresults]',
    templateUrl: './processresults.template.html',
    styleUrls: ['./processresults.style.scss']
})

export class ProcessResults {

    errorMessageShow = false;
    receipts: any;
    pointsEarned: number = 0;
    processMessage: string;

    constructor (private customerStateStore: CustomerStateStore,
                 private receiptProcessService: ReceiptProcessService) {

        this.receiptProcessService.receiptProcessResults.subscribe(
            (results: ReceiptProcessResults) => {
                if (results.receiptData.length === 2) {

                    let receiptData = results.receiptData[0];
                    let pointsData = results.receiptData[1];
                    if (receiptData.length > 0) {
                        let receipts = [];
                        results.receiptData[0].forEach(function (data) {
                            let receipt = new ResponseDataModel();
                            receipt.checkNumber = data.Check_No;
                            receipt.storeName = data.store_name;
                            receipt.closeDate = data.Close_Dttime;
                            receipt.receiptTotal = receipt.formatPrice(data.Total_Check);
                            receipt.totalPerGameCode = receipt.formatPrice(data.Sales_Amount_Per_GameCode);
                            receipt.cashCredit = receipt.formatPrice(data.Cash_or_Credit);
                            receipt.compAmount = receipt.formatPrice(data.Comp);
                            receipt.boardingPassPointsUsed = data.Boarding_Pass_Points_Used;
                            receipt.boardingPassCount = data.BoardingPassCount;
                            receipt.boardingPass = data.BoardingPass;
                            receipt.roomCharge = receipt.formatPrice(data.RoomCharge);
                            receipt.roomNumber = data.RoomNumber;
                            receipt.ratingGameCode = data.RatingGameCode;
                            receipt.revenueCategory = data.Revenue_Category;
                            receipt.ratingPoints = data.RatingPoints;
                            receipt.ratingPointsPerAccount = data.Rating_Points_Per_Account;
                            receipt.ratingTransaction = data.RatingTransaction;
                            receipt.responseMessage = data.ErrorDesc;
                            receipt.percentOfTotal = data.Percent_Of_total * 100;

                            receipts.push(receipt);
                        });

                        this.receipts = receipts;
                        this.pointsEarned = pointsData.nPointsAwarded;
                        if (pointsData.nPointsAwarded > 0) {
                            this.processMessage = 'Boarding Pass Points have been updated!'
                        } else {
                            this.processMessage = 'Receipt has already been processed.';
                        }
                    } else {
                        this.receipts = null;
                        this.errorMessageShow = true;
                    }
                }
            }
        );
    }

    get activeCustomer () {
        return this.customerStateStore.customerState;
    }

    get processResults () {
        return this.receiptProcessService.receiptProcessResults;
    }

    reset () {
        this.receiptProcessService.clearReceipt();
    }
}
