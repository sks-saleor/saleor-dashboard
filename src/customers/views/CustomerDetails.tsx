// @ts-strict-ignore
import ActionDialog from "@dashboard/components/ActionDialog";
import NotFoundPage from "@dashboard/components/NotFoundPage";
import { WindowTitle } from "@dashboard/components/WindowTitle";
import {
  useRemoveCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateMetadataMutation,
  useUpdatePrivateMetadataMutation,
} from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import { extractMutationErrors, getStringOrPlaceholder } from "@dashboard/misc";
import { useProfileOperations } from "@dashboard/staff/hooks";
import createMetadataUpdateHandler from "@dashboard/utils/handlers/metadataUpdateHandler";
import { DialogContentText } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CustomerPasswordResetDialog from "../components/CustomerDetails/CustomerPasswordResetDialog";
import CustomerDetailsPage, {
  CustomerDetailsPageFormData,
} from "../components/CustomerDetailsPage";
import { useCustomerDetails } from "../hooks/useCustomerDetails";
import { CustomerDetailsProvider } from "../providers/CustomerDetailsProvider";
import {
  customerChangePasswordUrl,
  customerListUrl,
  customerUrl,
  CustomerUrlQueryParams,
} from "../urls";

interface CustomerDetailsViewProps {
  id: string;
  params: CustomerUrlQueryParams;
}

const CustomerDetailsViewInner: React.FC<CustomerDetailsViewProps> = ({
  id,
  params,
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const customerDetails = useCustomerDetails();
  const user = customerDetails?.customer?.user;
  const customerDetailsLoading = customerDetails?.loading;

  const closeModal = () =>
    navigate(
      customerChangePasswordUrl(id, {
        ...params,
        action: undefined,
      }),
    );

  const refetch = () => {
    // @ts-strict-ignore
  };

  const { changePassword, changePasswordOpts } = useProfileOperations({
    closeModal,
    id,
    refetch,
  });

  const [removeCustomer, removeCustomerOpts] = useRemoveCustomerMutation({
    onCompleted: data => {
      if (data.customerDelete.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage({
            id: "PXatmC",
            defaultMessage: "Customer Removed",
          }),
        });
        navigate(customerListUrl());
      }
    },
  });

  const [updateCustomer, updateCustomerOpts] = useUpdateCustomerMutation({
    onCompleted: data => {
      if (data.customerUpdate.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }
    },
  });

  const [updateMetadata] = useUpdateMetadataMutation({});
  const [updatePrivateMetadata] = useUpdatePrivateMetadataMutation({});

  if (user === null) {
    return <NotFoundPage backHref={customerListUrl()} />;
  }

  const updateData = async (data: CustomerDetailsPageFormData) =>
    extractMutationErrors(
      updateCustomer({
        variables: {
          id,
          input: {
            email: data.email,
            firstName: data.firstName,
            isActive: data.isActive,
            lastName: data.lastName,
            note: data.note,
          },
        },
      }),
    );

  const handleSubmit = createMetadataUpdateHandler(
    user,
    updateData,
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables }),
  );

  return (
    <>
      <WindowTitle title={user?.email} />
      <CustomerDetailsPage
        customerId={id}
        customer={user}
        disabled={
          customerDetailsLoading ||
          updateCustomerOpts.loading ||
          removeCustomerOpts.loading
        }
        errors={updateCustomerOpts.data?.customerUpdate.errors || []}
        saveButtonBar={updateCustomerOpts.status}
        onSubmit={handleSubmit}
        onDelete={() =>
          navigate(
            customerUrl(id, {
              action: "remove",
            }),
          )
        }
      />
      <ActionDialog
        confirmButtonState={removeCustomerOpts.status}
        onClose={() => navigate(customerUrl(id), { replace: true })}
        onConfirm={() =>
          removeCustomer({
            variables: {
              id,
            },
          })
        }
        title={intl.formatMessage({
          id: "ey0lZj",
          defaultMessage: "Delete Customer",
          description: "dialog header",
        })}
        variant="delete"
        open={params.action === "remove"}
      >
        <DialogContentText>
          <FormattedMessage
            id="2p0tZx"
            defaultMessage="Are you sure you want to delete {email}?"
            description="delete customer, dialog content"
            values={{
              email: <strong>{getStringOrPlaceholder(user?.email)}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <CustomerPasswordResetDialog
        confirmButtonState={changePasswordOpts.status}
        errors={changePasswordOpts?.data?.passwordChange?.errors || []}
        open={params.action === "change-password"}
        onClose={closeModal}
        onSubmit={data =>
          changePassword({
            variables: { ...data, customerId: id },
          })
        }
      />
    </>
  );
};

export const CustomerDetailsView: React.FC<CustomerDetailsViewProps> = ({
  id,
  params,
}) => (
  <CustomerDetailsProvider id={id}>
    <CustomerDetailsViewInner id={id} params={params} />
  </CustomerDetailsProvider>
);
export default CustomerDetailsView;
