import { Injectable, OnInit } from '@angular/core';
import { EventBase } from '../eventbase';
import { AppComponent } from '../../app.component';

@Injectable()
export class EventService {
    private testVar: string = 'default';
    private _subscriptions: Array<Array<ISubscription<EventBase>>>;
    private appName: string;
    private config: any;
    constructor() {
        this._subscriptions = new Array<Array<ISubscription<EventBase>>>();
        /**let appConfig = new AppConfig();
        this.config = appConfig.getConfig();*/
        this.appName = AppComponent.name;
        if (window.addEventListener) {
            window.addEventListener('message', (event) => {
                if (event.data !== '') {
                    if (event.data.sourceApp) {
                        console.log(`${event.data.sourceApp}
                        received ${event.data.type} message from ${event.data.sourceApp},
                        data:${JSON.stringify(event.data)}`);
                        // Send message to event handler to iterate through potiential 
                        // subscriptions.
                        this.event(event.data);
                    }
                }
            }, false);
        }
    }

    get Subscriptions(): Array<Array<ISubscription<EventBase>>> {
        return this._subscriptions;
    }

    // Add action to subscriptions for given message type.
    subscribe<TEvent extends EventBase>(type: string, action: IAction<TEvent>) {
        console.log(`${this.appName} subscribed to event: ${type}`);
        let subcription = new Subscription<TEvent>(<IEventAggregator>this, action);

        if (!(typeof this._subscriptions[type] === 'undefined')) {
            this._subscriptions[type].push(subcription);
        } else {
            this._subscriptions[type] = new Array<ISubscription<EventBase>>(subcription);
        }

        return subcription;
    };

    // Send message to embedded iFrame via browser postMessage.
    publish<TEvent extends EventBase>(message: TEvent) {
        console.log(`publishing from ${this.appName},
        event: ${message.type}, message ${JSON.stringify(message)}`);
        window.parent.postMessage(message, '*');
    };

    // Iterate through subscriptions to given message based on type.
    event<TEvent extends EventBase>(message: TEvent) {
        if (!(typeof this._subscriptions[message.type] === 'undefined')) {
            this._subscriptions[message.type].forEach(subscription => {
                subscription.Action(message);
            });
        }
    }

    unsubscribe<TEvent extends EventBase>(subscription: ISubscription<TEvent>) {
        // todo:
        return null;
    };

    clearAll(): void {
        // todo:
    };

    clearAllForEventType(types: Array<any>): void {
        // todo:
    };

    // This section used to test the idea of a singleton instance of EventService
    get TestVar(): string {
        return this.testVar;
    }
    updateTestVar(): void {
        this.testVar = 'newVal';
    }
    // -------------END TEST SECTION-----------------------
}

export interface IAction<TEvent> {
    <TEvent extends EventBase>(message: TEvent): void;
}

export interface ISubscription<TEvent extends EventBase> {
    Action: IAction<TEvent>;
    EventAggregator: IEventAggregator;
}

export class Subscription<TEvent extends EventBase> implements ISubscription<TEvent> {
    private _eventAggregator: IEventAggregator;
    private _action: IAction<TEvent>;

    constructor(eventAggregator: IEventAggregator, action: IAction<TEvent>) {
        if (eventAggregator == null) throw new Error('eventAggregator');
        if (action == null) throw new Error('action');

        this.EventAggregator = eventAggregator;
        this.Action = action;
    }

    get Action(): IAction<TEvent> {
        return this._action;
    }

    set Action(value) {
        this._action = value;
    }

    get EventAggregator(): IEventAggregator {
        return this._eventAggregator;
    }

    set EventAggregator(value) {
        this._eventAggregator = value;
    }
}

export interface IEventAggregator {
    publish<TEvent extends EventBase>(type: string, message: TEvent): void;
    subscribe<TEvent extends EventBase>(type: string, action: IAction<TEvent>): ISubscription<TEvent>;
    unsubscribe<TEvent extends EventBase>(subscription: ISubscription<TEvent>);
    clearAll(): void;
    clearAllForEventType(types: Array<any>);
}
