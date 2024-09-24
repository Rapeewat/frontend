import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    // ส่งข้อมูลไปยัง backend สำหรับตรวจสอบการล็อกอิน
    this.http.post('http://localhost:3000/api/login', { 
      username: this.username, 
      password: this.password 
    })
    .subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // หากสำเร็จให้เปลี่ยนไปหน้า home
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
