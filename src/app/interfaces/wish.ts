import { FormControl } from "@angular/forms";

export interface WishForm {
  wish: FormControl<string>;
}

export interface Wish {
  content: string;
  status: WishStatus;
  id: string;
}

export type WishStatus =
  | "Submitted"
  | "CreationInProgress"
  | "InDelivery"
  | "Delivered";
