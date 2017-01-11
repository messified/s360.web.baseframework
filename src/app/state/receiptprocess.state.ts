export class ReceiptProcessResults {
	constructor(
		public processed: boolean,
		public receiptData: any = [],
		public nPointsAwarded: number = null,
		public szErrorDescription: string = null) {
	}
}

export class ResponseDataModel {
	public checkNumber: number;
	public storeName: string;
	public closeDate: Date;
	public receiptTotal: string;
	public totalPerGameCode: string;
	public cashCredit: string;
	public compAmount: string;
	public boardingPassPointsUsed: number;
	public boardingPassCount: number;
	public boardingPass: number;
	public roomCharge: string;
	public roomNumber: number;
	public ratingGameCode: string;
	public revenueCategory: string;
	public ratingPoints: number;
	public ratingPointsPerAccount: number;
	public ratingTransaction: string;
	public responseMessage: string;
	public percentOfTotal: number;

	public formatPrice(value: number): string {
		return '$' + Math.round(value * 100) / 100;
	}
}

export class ReceiptProcessData {
	constructor(
		public playerId: string,
		public barcode: string,
		public receiptDate: string) {
	}
}

export const initialReceiptResults = {
	processed: false,
	receiptData: null,
	nPointsAwarded: null,
	szErrorDescription: null
};
