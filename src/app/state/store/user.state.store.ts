import { Injectable } from '@angular/core';
import { UserState, initialUserState } from '../user.state';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class UserStateStore {
    private _userState: BehaviorSubject<UserState> =
        new BehaviorSubject(initialUserState);

    get userState () {
        return this._userState.asObservable();
    }

    updateUserState (user: UserState) {
        console.log('Updating user State:' + JSON.stringify(user));
        this._userState.next(user);
    }
}
