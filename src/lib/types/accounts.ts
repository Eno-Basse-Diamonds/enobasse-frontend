export interface Account {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  isAdmin: boolean;
  memberSince: string;
  preferredCurrency: string;
  billingAddress?: BillingAddress;
  resetToken?: string | null;
}

export interface BillingAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface UpdateAccount {
  preferredCurrency?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CreateAccountData {
  name: string;
  email: string;
  password?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  preferredCurrency?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CreateAccountDto {
  name: string;
  email: string;
  password?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  preferredCurrency?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface AccountsResponse {
  accounts: Account[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
