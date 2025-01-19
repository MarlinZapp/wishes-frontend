export interface InfoResponse {
  info: string;
  user: User;
  session: any;
}

export interface User {
  id: RecordId;
  name: string;
  pass: string;
  roles: UserRole[];
}

export interface RecordId {
  /** The table name */
  tb: string;
  /** The actual id */
  id: { String: string };
}

export type UserRole = "Admin" | "Default";
