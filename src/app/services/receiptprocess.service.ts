import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { ReceiptProcessData,
    ReceiptProcessResults,
    initialReceiptResults } from '../state/receiptprocess.state';
import {Observable} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { UserStateStore } from '../state/store/user.state.store';
import { UserState } from '../state/user.state';
import { AppConfig } from '../app.config';
import { EventService } from '../events/services/event.service'
import { ToastEvent, ToastOptions } from '../events/eventbase';
import { AppSettingsService } from '../events/services/appsettings.service';

@Injectable()
export class ReceiptProcessService {
    private baseURL: string = '/tgw/api/receiptprocess';
    private _receiptProcessResults: BehaviorSubject<ReceiptProcessResults> =
    new BehaviorSubject(initialReceiptResults);
    private _userName;
    private _JWT;

    constructor(
      private appSettings: AppSettingsService,
      private eventService: EventService,
      private config: AppConfig,
      private http: Http,
      private userStateStore: UserStateStore){
          //this.baseURL = this.config.config.servicePath + this.baseURL;
          this.baseURL = this.config.config.servicePath + this.baseURL;
          // get the current user state settings
          this.userStateStore.userState.subscribe((user: UserState) => {
            this._JWT = user.authToken;
            this._userName = user.username;
          });
    }

    get receiptProcessResults() {
        return this._receiptProcessResults.asObservable();
    }

    clearReceipt(){
        this._receiptProcessResults.next({
            receiptData: [],
            processed: false,
            nPointsAwarded: null,
            szErrorDescription: null
        });
    }
    
    saveReceiptProcessResults (response: any){
        console.log ( 'Saving Results::' + response );
        this._receiptProcessResults.next({
            receiptData: response,
            processed: true,
            nPointsAwarded: response.nPointsAwarded,
            szErrorDescription: response.szErrorDescription
        });
    }

    handleHttpError(err: Response){
        // add notification here
        console.log('ERROR::' + err.statusText );
        if( err.status == 401){
            // send logout
            this.appSettings.logout();
        } else {
            var toastOptions: ToastOptions = {
                title: 'Error',
                msg: err.statusText,
                showClose: true
            };
            var successToastEvent = new ToastEvent({toastType: 'ERROR', options: toastOptions});
            this.eventService.publish<ToastEvent>(successToastEvent);
        }

    }

    processReceipt(receiptData: ReceiptProcessData){
        let postData = {};
        if(receiptData.receiptDate !== ''){
            postData = {
                playerId: receiptData.playerId,
                barcode: receiptData.barcode,
                receiptDate: receiptData.receiptDate
            }
        } else {
            postData = {
                playerId: receiptData.playerId,
                barcode: receiptData.barcode
            }
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this._JWT);
        Observable.forkJoin(
            this.http.post(`${this.baseURL}/lookupreceipt`, JSON.stringify(postData), { headers: headers })
                .map((res: Response) => res.json()),
            this.http.post(`${this.baseURL}/postreceipt`, JSON.stringify(postData), { headers: headers })
                .map((res: Response) => res.json())
        ).subscribe(
            data => this.saveReceiptProcessResults( data ),
            err => this.handleHttpError( err ),
            () => console.log ( 'Receipt Process HTTP Complete' )
        );
    }
}
