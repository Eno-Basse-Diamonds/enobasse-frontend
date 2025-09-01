export interface SessionPayload {
  userId: string;
  email?: string;
  role?: string;
  expiresAt?: Date;
  [key: string]: any;
}

export interface Account {
  id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}
