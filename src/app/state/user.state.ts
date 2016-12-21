export class UserState {
	constructor (public authToken: string, public username: string) {}
}

export const initialUserState = {
	authToken: null,
	username: null
};
