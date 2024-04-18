import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

    login(): void {
        this.isLoading = true;
        this.errorMessage = ''; // Сброс предыдущего сообщения об ошибке при новой попытке входа
        this.authService.login(this.email, this.password)
            .pipe(
                tap(response => {
                    // обработка успешного входа
                    console.log('Logged in successfully!', response);
                    this.router.navigate(['/calendar']);
                    // Здесь можно реализовать перенаправление на другую страницу или что-то еще
                }),
                catchError(error => {
                    // обработка ошибок при входе
                    this.isLoading = false;
                    console.error('Login error:', error);
                    this.errorMessage = 'Login failed. Please check your credentials and try again.';
                    return throwError(error);
                })
            )
            .subscribe({
                complete: () => this.isLoading = false // Завершаем состояние загрузки после завершения запроса
            });
    }
}
