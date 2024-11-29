import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService]
})
export class LoginPage implements OnDestroy {
  email = '';
  password = '';
  private destroy$ = new Subject<void>();  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).pipe(
        takeUntil(this.destroy$)  
      ).subscribe({
        next: (res: any) => {
          this.authService.saveToken(res.access_token);
          this.authService.saveRole(res.role)
          const role=res.role          
          if (role === 'Admin') {            
            this.router.navigate(['/admin-dashboard']);  
          } else if (role === 'User') {
            this.router.navigate(['/user-dashboard']);  
          } else {
            console.error('Role not found');
          }
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
