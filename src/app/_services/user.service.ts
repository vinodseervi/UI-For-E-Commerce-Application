import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;

  getUsers() {
    throw new Error('Method not implemented.');
  }
  getAdmins() {
    throw new Error('Method not implemented.'); 
  }

  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService,
 
  ) {}

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public otpLogin(otpLoginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/otpAuthenticate', otpLoginData, {
      headers: this.requestHeader,
    });
  }
  public generateOTP(phoneNumber: string): Observable<any> {
    return this.httpclient.post(this.PATH_OF_API + '/generateOTP', { phoneNumber });
  }
  

  public register(registerData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData);
  }


  public registerAdmin(registerAdminData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewAdmin', registerAdminData);
  }
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any): boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
return isMatch;
  }
  
}