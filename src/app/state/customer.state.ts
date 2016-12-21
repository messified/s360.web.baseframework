export class CustomerState {

    constructor(
    	public playerID: string,
        public firstName: string,
        public lastName: string,
        public dob: string,
        public address: any) {
    }

}

export const initialCustomerState = {
    playerID: null,
    firstName: null,
    lastName: null,
    dob: null,
    address: null
};
