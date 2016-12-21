export abstract class EventBase {
    config: any;
    type: string;
    sourceApp: string;
    constructor(type: string) {
        this.type = type;
        this.sourceApp = 's360.web.app';
    }

}

export class GetCustomerContext extends EventBase {
    constructor() {
        super('GetCustomerContext');
    }
}

export class CustomerContext extends EventBase {
    constructor(customer?: any) {
        super('CustomerContext');
        this.customer = customer;
    }

    customer: any;
}

export class NavigationClickEvent extends EventBase {
    constructor(data?: any) {
        super('NavigationClickEvent');
        this.route = data && data.route || null;
    }

    route: string;
}

export class IFrameLoadingEvent extends EventBase {
    constructor() {
        super('IFrameLoadingEvent');
    }
}

export class IFrameLoadedEvent extends EventBase {
    constructor() {
        super('IFrameLoadedEvent');
    }
}

export class AppLoadedEvent extends EventBase {
    constructor(data?: any) {
        super('AppLoadedEvent');
        this.name = data && data.name || null;
    }

    name: string;
}

export class AppStartEvent extends EventBase {
    constructor(data?: any) {
        super('AppStartEvent');
        this.name = data && data.name || null;
    }

    name: string;
}

export class AuthTokenEvent extends EventBase {
    authToken: string;
    username: string;
    constructor(data?: any) {
        super('AuthTokenEvent');
        this.authToken = data && data.authToken || null;
        this.username = data && data.username || null;
    }
}

export class AuthExpiredEvent extends EventBase {

    constructor(data?: any) {
        super('AuthExpiredEvent');
    }
}

export class LoggedOutEvent extends EventBase {
    constructor(data?: any) {
        super('LoggedOutEvent');
    }
}

export class GetClaimsEvent extends EventBase {
    constructor(data?: any) {
        super('GetClaimsEvent');
        this.claims = data && data.claims || null;
    }

    claims: string;
}

export class PatronGetEvent extends EventBase {
    constructor(data?: any) {
        super('PatronGetEvent');
        this.patron = data && data.patron || null;
    }

    patron: any;
}

export class PatronChangedEvent extends EventBase {
    constructor(data?: any) {
        super('PatronChangedEvent');
        this.patron = data && data.patron || null;
    }

    patron: any;
}

export class GetPropertyEvent extends EventBase {
    constructor(data?: any) {
        super('GetPropertyEvent');
        this.property = data && data.property || null;
    }

    property: any;
}

export class ToastEvent extends EventBase {
    options: ToastOptions;
    toastType: string;
    constructor(data?: any) {
        super('ToastEvent');
        this.options = data && data.options || null;
        this.toastType = data && data.toastType || null;
    }
}

export interface ToastOptions {
  title: string;
  msg?: string;
  showClose?: boolean;
  theme?: string;
  timeout?: number;
  onAdd?: Function;
  onRemove?: Function;
}



export type IConfirmCallback = (confirmed: boolean, notes: string) => void;

export class ConfirmRequest extends EventBase {

    prompt: string;
    ok: string;
    cancel: string;
    callbackKey: number;
    textInput: boolean;

    constructor(callbackKey: number, prompt: string, textInput: boolean, ok?: string, cancel?: string) {
        super('ConfirmRequest');
        this.prompt = prompt;
        this.textInput = textInput;
        this.ok = ok;
        this.cancel = cancel;
        this.callbackKey = callbackKey;
    }
}

export class ConfirmResponse extends EventBase {

    confirmed: boolean;
    text: string;
    callbackKey: number;

    constructor(callbackKey: number, confirmed: boolean, text: string) {
        super('ConfirmResponse');
        this.confirmed = confirmed;
        this.text = text;
        this.callbackKey = callbackKey;
    }
}

export class ContentResizeEvent extends EventBase {
    height: number;
    constructor(height: number) {
        super('ContentResizeEvent');
        this.height = height;
    }
}