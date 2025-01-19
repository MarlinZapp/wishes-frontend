import { Component, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: "app-ok-dialog",
  standalone: true,
  imports: [MatDialogActions],
  templateUrl: "./ok-dialog.component.html",
  styleUrl: "./ok-dialog.component.scss",
})
export class OkDialogComponent {
  readonly dialogRef: MatDialogRef<OkDialogComponent> = inject(MatDialogRef);
  readonly data: { message: string; action: () => void } =
    inject(MAT_DIALOG_DATA);

  constructor() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.data.action();
    });
  }
}
