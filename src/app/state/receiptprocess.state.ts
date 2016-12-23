export class ReceiptProcessResults {
    constructor(
        public processed: boolean,
        public receiptData: any = [],
        public nPointsAwarded: number = null,
        public szErrorDescription: string = null
    ) {}
}

/**
{
    "Check_No": 7115949,
    "store_name": "Fiesta Henderson",
    "Close_Dttime": "2016-09-28T19:48:06.000Z",
    "Total_Check": 29.55,
    "Sales_Amount_Per_GameCode": 5.5799856,
    "Cash_or_Credit": 4.7208,
    "Comp": 1.31993568,
    "Boarding_Pass_Points_Used": 0,
    "BoardingPassCount": 1,
    "BoardingPass": "4982705",
    "RoomCharge": 0,
    "RoomNumber": null,
    "RatingGameCode": "3I",
    "Revenue_Category": "Non-Alcoh Bev",
    "RatingPoints": 0,
    "Rating_Points_Per_Account": 0,
    "RatingTransaction": "42443799165",
    "ErrorDesc": "TRANSACTION COMPLETED SUCESSFULLY!!!",
    "Percent_Of_total": 0.188832
}
 */
export class ResponseDataModel {
    checkNumber: number;
    storeName: string;
    closeDate: Date;
    receiptTotal: string;
    totalPerGameCode: string;
    cashCredit: string;
    compAmount: string;
    boardingPassPointsUsed: number;
    boardingPassCount: number;
    boardingPass: number;
    roomCharge: string;
    roomNumber: number;
    ratingGameCode: string;
    revenueCategory: string;
    ratingPoints: number;
    ratingPointsPerAccount: number;
    ratingTransaction: string;
    responseMessage: string;
    percentOfTotal: number;

    public formatPrice(value) {
        return '$' + Math.round(value * 100) / 100;
    }
}

export class ReceiptProcessData {
    constructor(
        public playerId: string,
        public barcode: string,
        public receiptDate: string
    ) {}
}

export const initialReceiptResults = {
    processed: false,
    receiptData: null,
    nPointsAwarded: null,
    szErrorDescription: null
};
