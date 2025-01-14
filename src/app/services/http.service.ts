import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Wish } from "../interfaces/wish";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

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
            resolve();
          },
          error: reject,
        });
    });
  }

  getWishes() {
    return new Promise<Wish[]>((resolve, reject) => {
      this.httpClient
        .get<Wish[]>("/api/wishes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .subscribe({
          next: resolve,
          error: reject,
        });
    });
  }

  createWish(wish: string) {
    return new Promise<Wish>((resolve, reject) => {
      this.httpClient
        .post<Wish>(
          "/api/wish",
          { content: wish },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          },
        )
        .subscribe({
          next: resolve,
          error: reject,
        });
    });
  }

  getWish(id: string) {
    return new Promise<Wish>((resolve, reject) => {
      this.httpClient
        .get<Wish>("/api/wish", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .subscribe({
          next: resolve,
          error: reject,
        });
    });
  }
}
