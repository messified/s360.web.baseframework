import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserStateStore } from '../../state/store/user.state.store';
import { UserState, initialUserState } from '../../state/user.state';
import { NavRouteStateStore } from '../../state/store/route.state.store';
import { NavRoute, initialNavRoute } from '../../state/route.state';
import { EventService } from './event.service';
import { NavigationClickEvent, AppLoadedEvent, AppStartEvent, AuthTokenEvent, AuthExpiredEvent }
from '../eventbase';

@Injectable()
export class AppSettingsService {
    private config: any;

    constructor(
        private eventService: EventService,
        private navRouteStateStore: NavRouteStateStore,
        private userStateStore: UserStateStore){

        // Subscribe to AuthTokenEvent to save in local settings instance.
        // Our services will reference it there.
        this.eventService.subscribe<AuthTokenEvent>('AuthTokenEvent',
        (message: AuthTokenEvent) => {
            console.log('Recieved AuthTokenEvent Event: ' + JSON.stringify(message) );
            let user: UserState;
            if ( message == null){
                user = initialUserState;
            } else {
                user = {
                    authToken: message.authToken,
                    username: message.username
                };
            }
            this.userStateStore.updateUserState( user );

            // Can't accept a click event until we have our authToken
            this.eventService.subscribe<NavigationClickEvent>('NavigationClickEvent',
            (navMessage: NavigationClickEvent) => {
                console.log('Nav Event ' + navMessage.route);
                let navRoute: NavRoute;
                if ( navMessage == null ){
                    navRoute = initialNavRoute;
                } else {
                    navRoute = {
                        route: navMessage.route
                    };
                }
                this.navRouteStateStore.updateRouteState(navRoute);
            });

            // Now that we have our authToken for internal services calls,
            // let shell know we are ready!
            this.eventService.publish
            <AppLoadedEvent>(new AppLoadedEvent());
        });

    }
    public getAppSettings(){
        console.log('Loading App Settings');
        // Send the event saying our app has started.
        this.eventService.publish<AppStartEvent>(new AppStartEvent());
    }

    logout(){
        // add logout code here
        this.eventService.publish<AuthExpiredEvent>(new AuthExpiredEvent());
    }
}