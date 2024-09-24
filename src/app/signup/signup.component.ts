import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service'; // นำเข้า AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  // รวม HttpClient และ AuthService ไว้ใน constructor เดียวกัน
  constructor(private authService: AuthService) {}

  onSignup() {
    // ใช้ AuthService เพื่อส่งคำขอ POST ไปยัง Backend API
    this.authService.signup(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Signup successful', response);
        },
        error: (error) => {
          console.error('Signup failed', error);
        },
        complete: () => {
          console.log('Signup process complete.');
        }
      });
  }
}
