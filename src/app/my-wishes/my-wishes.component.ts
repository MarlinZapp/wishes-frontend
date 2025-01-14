import { Component } from "@angular/core";
import { HttpService } from "../services/http.service";
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

  constructor(private httpService: HttpService) {
    this.httpService.getWishes().then((wishes) => {
      this.wishes = wishes;
    });
  }

  createWish() {
    if (this.form.valid) {
      this.httpService
        .createWish(this.form.controls.wish.value)
        .then((newWish) => {
          this.wishes.push(newWish);
        })
        .catch((err) => {});
    }
  }
}
