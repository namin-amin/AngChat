import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/chat',
  },
];
