import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PublicComponent } from './pages/public/public.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { isAuthenticateGuard } from './guards/is-authenticate.guard';
import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [isAuthenticateGuard]
    },
    {
        path: '',
        component: PublicComponent,
        canActivate: [isNotAuthenticatedGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    }
];
