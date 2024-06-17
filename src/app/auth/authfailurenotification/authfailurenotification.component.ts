import { Component, effect, EventEmitter, input, OnInit, output, Output } from '@angular/core';

@Component({
  selector: 'app-authfailurenotification',
  standalone: true,
  imports: [],
  templateUrl: './authfailurenotification.component.html',
  styleUrl: './authfailurenotification.component.scss',
})
export class AuthfailurenotificationComponent {
  show = input<boolean>(false);
  closeNotification = output<void>();

  closeThis() {
    this.closeNotification.emit(undefined);
  }
}
