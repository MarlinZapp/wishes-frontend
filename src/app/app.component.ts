import { Component, effect } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "./services/auth.service";
import { HeaderComponent } from "./header/header.component";
import { IconService } from "./services/icon.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "frontend";
  initialized = false;

  constructor(
    private authService: AuthService,
    private iconService: IconService,
  ) {
    this.iconService.registerIcons();
    this.authService
      .checkNeedAuthentication()
      .then(() => (this.initialized = true));
  }

  loggedInUser() {
    return this.authService.loggedInUser();
  }
}
