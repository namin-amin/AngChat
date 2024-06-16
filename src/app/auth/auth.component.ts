import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionLockClosed, ionMail } from '@ng-icons/ionicons';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgIcon,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [provideIcons({ionMail,ionLockClosed})],
})
export class AuthComponent {
  isLoading =  signal<boolean>(false)
  isRegister = signal<boolean>(false);

  toggleLoading = ()=>{
    this.isLoading.update(old=>!old)
  }

  changeToRegister() {
    this.isRegister.update(old=>!old)
  }
}
