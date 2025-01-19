import { ChangeDetectionStrategy, inject, Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry, MatIconModule } from "@angular/material/icon";

@Injectable({
  providedIn: "root",
})
export class IconService {
  constructor() {}

  registerIcons() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon(
      "present",
      sanitizer.bypassSecurityTrustResourceUrl("present.svg"),
    );
  }
}
