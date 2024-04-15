import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public token$: Observable<number> = this.token.asObservable();
  public username$: Observable<string> = this.username.asObservable();

  constructor() {}

  public setToken(token: number) {
    this.token.next(token); // next method sets a token on BehaviorSubject object
  }

  public setUsername(username: string) {
    this.username.next(username); // next method sets a username on BehaviorSubject object
  }
}
