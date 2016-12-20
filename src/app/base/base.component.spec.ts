import {
    inject,
    TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { BaseComponent } from './base.component';
import { AppState } from '../app.service';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            AppState,
            BaseComponent
        ]}));

    it('should have a url', inject([ BaseComponent ], (app: BaseComponent) => {
        expect(app.localState).toEqual({ value: 'src/app/base/base.component.ts' });
    }));

});