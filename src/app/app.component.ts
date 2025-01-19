import { Component, effect } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { HeaderComponent } from "./header/header.component";
import { IconService } from "./services/icon.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "frontend";

  constructor(
    private authService: AuthService,
    private iconService: IconService,
  ) {
    this.authService.checkNeedAuthentication();
    this.iconService.registerIcons();
  }

  loggedInUser() {
    return this.authService.loggedInUser();
  }
}
