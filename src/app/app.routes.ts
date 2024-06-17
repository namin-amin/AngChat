import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from './auth/auth.guard';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [authGuard],
    children: [
      {
        path: ':id/:name',
        component: ChatWindowComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/chat',
  },
];
