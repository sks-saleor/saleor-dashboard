import { gql } from "@apollo/client";

export const fragmentAddress = gql`
  fragment Address on Address {
    city
    cityArea
    country {
      __typename
      code
      country
    }
    countryArea
    firstName
    id
    lastName
    phone
    postalCode
    streetAddress1
    streetAddress2
  }
`;
