import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginForm } from "../interfaces/login";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel,
    RouterModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  form: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) {}

  submit() {
    if (this.form.valid) {
      this.httpService
        .login(
          this.form.controls.username.value,
          this.form.controls.password.value,
        )
        .then(() => {
          this.router.navigate(["/my_wishes"]);
        })
        .catch((err) => {});
    }
  }
}
