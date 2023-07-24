// @ts-strict-ignore
import { WindowTitle } from "@dashboard/components/WindowTitle";
import { useCreateCustomerMutation } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import { extractMutationErrors, maybe } from "../../misc";
import CustomerCreatePage, {
  CustomerCreatePageSubmitData,
} from "../components/CustomerCreatePage";
import { customerUrl } from "../urls";

export const CustomerCreate: React.FC = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [createCustomer, createCustomerOpts] = useCreateCustomerMutation({
    onCompleted: data => {
      if (data.customerCreate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage({
            id: "ftcHpD",
            defaultMessage: "Customer created",
          }),
        });
        navigate(customerUrl(data.customerCreate.user.id));
      }
    },
  });

  const handleSubmit = (formData: CustomerCreatePageSubmitData) =>
    extractMutationErrors(
      createCustomer({
        variables: {
          input: {
            defaultBillingAddress: formData.address,
            defaultShippingAddress: formData.address,
            email: formData.email,
            firstName: formData.customerFirstName,
            lastName: formData.customerLastName,
            note: formData.note,
          },
        },
      }),
    );

  const countries: any[] = [
    { __typename: "CountryDisplay", code: "KH", country: "Cambodia" },
  ];

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          id: "nX2pCU",
          defaultMessage: "Create customer",
          description: "window title",
        })}
      />
      <CustomerCreatePage
        countries={maybe(() => countries, [])}
        disabled={createCustomerOpts.loading}
        errors={createCustomerOpts.data?.customerCreate.errors || []}
        saveButtonBar={createCustomerOpts.status}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default CustomerCreate;
