import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('dialogTemplate', { read: TemplateRef })
  dialogTemplate!: TemplateRef<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: {
        template: this.dialogTemplate,
      },
    });
  }
}
