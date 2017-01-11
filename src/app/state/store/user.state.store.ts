import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { initialUserState, UserState } from '../user.state';

@Injectable()
export class UserStateStore {
	private _userState: BehaviorSubject<UserState> = new BehaviorSubject(initialUserState);

	get userState(): Observable<UserState> {
		return this._userState.asObservable();
	}

	public updateUserState(user: UserState): void {
		console.log('Updating user State:' + JSON.stringify(user));
		this._userState.next(user);
	}
}
