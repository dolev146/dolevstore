import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DevenvService } from './devenv.service';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient , public env : DevenvService) { }

  BaseUrl = this.env.localHostUrl + "/api/customers/"

  submitRegister(body) {
    return this.http.post(this.BaseUrl + 'register', body, {
      headers: { "Content-Type": "application/json" }
    })
  }

  CheckID(body) {
    return this.http.post(this.BaseUrl + 'isidtaken', body, {
      headers: { "Content-Type": "application/json" }
    })
  }

}
