import { Component, inject } from "@angular/core";
import { WishService } from "../services/wish.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Wish, WishForm } from "../interfaces/wish";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { OkDialogComponent } from "../dialogs/ok-dialog/ok-dialog.component";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RecordId } from "../interfaces/response";

@Component({
  selector: "app-my-wishes",
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInput,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: "./my-wishes.component.html",
  styleUrl: "./my-wishes.component.scss",
})
export class MyWishesComponent {
  wishes: Wish[] = [];
  form = new FormGroup<WishForm>({
    wish: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  readonly dialog = inject(MatDialog);

  constructor(
    private wishService: WishService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.wishService.getWishes().then((wishes) => {
      this.wishes = wishes;
    });
  }

  createWish() {
    if (this.form.valid) {
      this.wishService
        .createWish(this.form.controls.wish.value)
        .then((newWish) => {
          this.form.controls.wish.setValue("");
          this.wishes.push(newWish);
        })
        .catch((err) => {
          if (err === "The token has expired") {
            this.openOkDialog(
              "Die Sitzung ist abgelaufen. Bitte erneut einloggen!",
              () => {
                this.router.navigate(["/login"]);
              },
            );
          }
        });
    }
  }

  deleteWish(id: RecordId) {
    this.wishService.deleteWish(id).then(() => {
      this.wishes = this.wishes.filter((wish) => wish.id !== id);
    });
  }

  progressWishStatus(id: RecordId) {
    this.wishService.progressWishStatus(id).then((wish) => {
      if (wish) {
        const idx = this.wishes.findIndex((w) => w.id === id);
        this.wishes[idx] = wish;
      }
    });
  }

  getRoles() {
    return this.authService.userRoles();
  }

  openOkDialog(message: string, action: () => void): void {
    this.dialog.open(OkDialogComponent, {
      width: "250px",
      data: { message, action },
    });
  }
}
