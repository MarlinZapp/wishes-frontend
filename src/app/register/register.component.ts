import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RegisterForm } from "../interfaces/login";
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from "@angular/material/input";
import { matchValueValidator } from "../validators";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, MatInput, MatFormField, MatLabel, MatError],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  form: FormGroup<RegisterForm>;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup<RegisterForm>({
      username: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      passwordRepeat: new FormControl<string>("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
    this.form.controls.passwordRepeat.addValidators(
      matchValueValidator(this.form.controls.password),
    );
  }

  submit() {
    if (this.form.valid) {
      this.authService
        .register(
          this.form.controls.username.value,
          this.form.controls.password.value,
        )
        .then(() => {
          this.router.navigate(["/my_wishes"]);
        })
        .catch((err) => (this.error = "Registration failed"));
    }
  }
}
