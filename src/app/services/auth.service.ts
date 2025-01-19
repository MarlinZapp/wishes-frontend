import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { InfoResponse, UserRole } from "../interfaces/response";
import { WishService } from "./wish.service";
import { Wish } from "../interfaces/wish";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private wishService: WishService,
  ) {}

  private loggedInUserWritable: WritableSignal<string | null> = signal(null);
  loggedInUser = this.loggedInUserWritable.asReadonly();
  private userRolesWritable: WritableSignal<UserRole[]> = signal([]);
  userRoles = this.userRolesWritable.asReadonly();

  private checkAuth() {
    return new Promise<InfoResponse>((resolve, reject) => {
      this.httpClient
        .get("/api/check/auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        })
        .subscribe({
          next: (res: unknown) => {
            const info = res as InfoResponse;
            this.userRolesWritable.set(info.user.roles);
            resolve(info);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  /** Navigates to login page if not authenticated. */
  checkNeedAuthentication() {
    const oldJwt = localStorage.getItem("jwt");
    // try to use the old jwt on a route that requires authentication
    // if it fails, navigate to login page
    if (oldJwt) {
      this.checkAuth()
        .then((answer) => {
          const oldName = localStorage.getItem("name");
          this.router.navigate(["/my_wishes"]);
          this.loggedInUserWritable.set(oldName);
        })
        .catch((err: HttpErrorResponse) => {
          this.loggedInUserWritable.set(null);
          if (err.status === 500) {
            console.log("Session expired!", err);
            this.router.navigate(["/login"], {
              queryParams: { reason: "sessionExpired" },
            });
          } else {
            console.error("An unexpected error occured!", err);
            this.router.navigate(["/login"]);
          }
        });
    } else {
      console.log("No jwt found!");
      this.loggedInUserWritable.set(null);
      this.router.navigate(["/login"]);
    }
  }

  register(username: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.httpClient
        .post<string>(
          "/api/register",
          { name: username, pass: password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .subscribe({
          next: (jwt) => {
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("name", username);
            this.loggedInUserWritable.set(username);
            resolve();
          },
          error: reject,
        });
    });
  }

  login(username: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.httpClient
        .post<string>(
          "/api/login",
          { name: username, pass: password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .subscribe({
          next: (jwt) => {
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("name", username);
            this.loggedInUserWritable.set(username);
            this.checkAuth().then(() => {
              resolve();
            });
          },
          error: reject,
        });
    });
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    this.loggedInUserWritable.set(null);
  }
}
