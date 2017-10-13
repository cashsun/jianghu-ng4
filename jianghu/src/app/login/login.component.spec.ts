import { TestBed, async } from '@angular/core/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from '../services/user.service';
import { API } from '../services/api';
import { HttpClientModule } from '@angular/common/http';
import { UserActions } from '../actions/user';
import { NgReduxModule } from '@angular-redux/store';
import { LoginComponent } from './login.component';
import { ArticlesComponent } from '../articles/articles.component';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
declare const $;

const appRoutes: Routes = [];

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        NgReduxModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        UserService,
        API,
        UserActions
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  }));


  it('should have email input', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const emailInput = login.nativeElement.querySelectorAll('input[name="email"]');
    expect(emailInput.length).toEqual(1);
  }));

  it('should have password input', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const passwordInput = login.nativeElement.querySelectorAll('input[name="password"]');
    expect(passwordInput.length).toEqual(1);
  }));

  it('should have login button', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const loginButton = login.nativeElement.querySelectorAll('button.submit');
    expect(loginButton.length).toEqual(1);
  }));

  it('email input changes prop email', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const emailInput = login.nativeElement.querySelector('input[name="email"]');
    const expextedVal = 'foo';
    emailInput.value = expextedVal;
    emailInput.dispatchEvent(new Event('input'));

    expect(login.componentInstance.email).toEqual(expextedVal);
  }));

  it('password input changes prop password', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const passwordInput = login.nativeElement.querySelector('input[name="password"]');
    const expextedVal = 'foo';
    passwordInput.value = expextedVal;
    passwordInput.dispatchEvent(new Event('input'));
    expect(login.componentInstance.password).toEqual(expextedVal);
  }));

  it('button should be disabled when inputs missing', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const loginButton = login.nativeElement.querySelector('button.submit');
    login.detectChanges();
    expect(loginButton.disabled).toEqual(true);
  }));

  it('button should be disabled when email missing', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[type="email"]');
    const password = login.nativeElement.querySelector('input[type="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');

    password.value = 'foo';
    password.dispatchEvent(new Event('input'));
    login.detectChanges();

    expect(loginButton.disabled).toEqual(true);
  }));

  it('button should be disabled when password missing', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[name="email"]');
    const password = login.nativeElement.querySelector('input[name="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');

    email.value = 'foo';
    email.dispatchEvent(new Event('input'));
    login.detectChanges();

    expect(loginButton.disabled).toEqual(true);
  }));

  it('button should be enabled when both email and password present', async(() => {
    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[name="email"]');
    const password = login.nativeElement.querySelector('input[name="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');

    email.value = 'foo';
    email.dispatchEvent(new Event('input'));
    password.value = 'bar';
    password.dispatchEvent(new Event('input'));
    login.detectChanges();

    expect(loginButton.disabled).toEqual(false);
  }));

  it('should call login service with correct params when click login', async(() => {
    const userService = TestBed.get(UserService);
    const loginSpy = spyOn(userService, 'login');
    spyOn(userService, 'logout');
    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[name="email"]');
    const password = login.nativeElement.querySelector('input[name="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');


    const expectedEmail = 'foo';
    email.value = expectedEmail;
    email.dispatchEvent(new Event('input'));
    const expectedPassword = 'bar';
    password.value = expectedPassword;
    password.dispatchEvent(new Event('input'));
    login.detectChanges();

    loginButton.click();

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledWith(expectedEmail, expectedPassword);

  }));

  it('should redirect to /articles by default when login successfull', async(() => {
    const userService = TestBed.get(UserService);
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl');
    spyOn(userService, 'login').and.returnValue(Observable.from(['foo']));
    spyOn(userService, 'logout');

    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[name="email"]');
    const password = login.nativeElement.querySelector('input[name="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');


    const expectedEmail = 'foo';
    email.value = expectedEmail;
    email.dispatchEvent(new Event('input'));
    const expectedPassword = 'bar';
    password.value = expectedPassword;
    password.dispatchEvent(new Event('input'));
    login.detectChanges();

    loginButton.click();

    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith('articles');

  }));


  it('should set error message when login failed', async(() => {
    const userService = TestBed.get(UserService);
    const router = TestBed.get(Router);
    spyOn(userService, 'login').and
      .returnValue(Observable.throw({ status: 400, error: JSON.stringify({ message: 'boom!' }) }));

    spyOn(userService, 'logout');

    const login = TestBed.createComponent(LoginComponent);
    const email = login.nativeElement.querySelector('input[name="email"]');
    const password = login.nativeElement.querySelector('input[name="password"]');
    const loginButton = login.nativeElement.querySelector('button.submit');


    const expectedEmail = 'foo';
    email.value = expectedEmail;
    email.dispatchEvent(new Event('input'));
    const expectedPassword = 'bar';
    password.value = expectedPassword;
    password.dispatchEvent(new Event('input'));
    loginButton.click();

    login.detectChanges();

    expect(login.componentInstance.loginErrorMessage).toMatch(/400.*reason.*boom/i);
    expect(login.nativeElement.querySelector('div.negative.message').innerText).toMatch(/400.*reason.*boom/i);

  }));


});
