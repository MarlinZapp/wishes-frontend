import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MyWishesComponent } from "./my-wishes/my-wishes.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "my_wishes", component: MyWishesComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];
