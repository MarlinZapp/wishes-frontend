import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Wish } from "../interfaces/wish";
import { firstValueFrom } from "rxjs";
import { RecordId } from "../interfaces/response";

@Injectable({
  providedIn: "root",
})
export class WishService {
  constructor(private httpClient: HttpClient) {}

  getWishes(withUsernames = false) {
    return new Promise<Wish[]>((resolve, reject) => {
      this.httpClient
        .get<Wish[]>("/api/wishes?with_username=" + withUsernames, {
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

  getWish(id: RecordId) {
    return new Promise<Wish>((resolve, reject) => {
      this.httpClient
        .get<Wish>("/api/wish/" + id.id.String, {
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

  deleteWish(id: RecordId) {
    console.log("Delete with id", id);
    return firstValueFrom(
      this.httpClient.delete<Wish>("/api/wish/" + id.id.String, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }),
    );
  }

  progressWishStatus(id: RecordId) {
    return firstValueFrom(
      this.httpClient.patch<Wish | undefined>(
        "/api/wish/" + id.id.String + "/status/progress",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      ),
    );
  }
}
