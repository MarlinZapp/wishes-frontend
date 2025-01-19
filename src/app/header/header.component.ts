import { MatButtonModule } from "@angular/material/button";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  username() {
    return this.authService.loggedInUser();
  }
}
