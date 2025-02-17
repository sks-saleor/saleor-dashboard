import { ListCustomersQuery } from "@dashboard/graphql";
import { RelayToFlat } from "@dashboard/types";

export interface AddressTypeInput {
  city: string;
  cityArea?: string;
  country: string;
  countryArea?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2?: string;
}

export interface AddressType {
  id: string;
  city: string;
  cityArea?: string;
  country: {
    code: string;
    country: string;
  };
  countryArea?: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2?: string;
}

export type Customers = RelayToFlat<
  NonNullable<ListCustomersQuery["customers"]>
>;
export type Customer = Customers[number];
