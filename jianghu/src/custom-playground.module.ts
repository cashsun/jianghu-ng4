import { IAppState, store } from './app/store';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { NgReduxModule } from '@angular-redux/store/lib/src/ng-redux.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArrayBuffer } from '@angular/http/src/static_request';
import './app/rxjs-extensions';
import { Observable } from '@angular-devkit/schematics/node_modules/rxjs/Rx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API } from './app/services/api';
import { ArticlesActions } from './app/actions/articles';
import { ArticlesService } from './app/services/articles.service';
import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, PlaygroundCommonModule } from 'angular-playground';

const logAction = (value?) => (...params: any[]): Observable<any> => {
    console.log(params);
    return Observable.from([value])
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        PlaygroundCommonModule,
        HttpClientTestingModule,
        NgReduxModule
    ],
    providers: [
        API,
        ArticlesService,
        ArticlesActions,
    ],
    bootstrap: [AppComponent]
})
export class CustomPlaygroundModule {
    constructor(private ngRedux: NgRedux<IAppState>) {
        ngRedux.provideStore(store);
    }
}
