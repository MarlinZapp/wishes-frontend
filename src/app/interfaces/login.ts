import { FormControl } from "@angular/forms";

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  passwordRepeat: FormControl<string>;
}
