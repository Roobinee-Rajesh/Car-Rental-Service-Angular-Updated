import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() title: string = 'Confirmation';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
 
  onConfirm() {
    this.confirm.emit();
  }
 
  onCancel() {
    this.cancel.emit();
  }
}
