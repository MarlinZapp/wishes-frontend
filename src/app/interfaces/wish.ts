import { FormControl } from "@angular/forms";
import { RecordId } from "./response";

export interface WishForm {
  wish: FormControl<string>;
}

export interface Wish {
  content: string;
  status: WishStatus;
  id: RecordId;
  username?: string;
}

export type WishStatus =
  | "Submitted"
  | "CreationInProgress"
  | "InDelivery"
  | "Delivered";
