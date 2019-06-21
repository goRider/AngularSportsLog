import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AdminUser } from './models/AdminUser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiString = 'http://localhost:3000/admins'

  constructor(private httpClient: HttpClient) { }

  public createAdminUser(adminUser: AdminUser){}

  public updateAdminUser(adminUser: AdminUser) {}

  public deleteAdminUser(id: number){}

  public getAdminUserById(id: number){}

  public getAdminUsers(url?: string){}
}
