import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api'; // URL ของ API Back-End

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับสมัครสมาชิก
  signup(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  // ฟังก์ชันสำหรับการล็อกอิน
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
