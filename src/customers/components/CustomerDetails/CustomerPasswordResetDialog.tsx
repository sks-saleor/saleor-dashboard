// @ts-strict-ignore
import BackButton from "@dashboard/components/BackButton";
import {
  ConfirmButton,
  ConfirmButtonTransitionState,
} from "@dashboard/components/ConfirmButton";
import Form from "@dashboard/components/Form";
import FormSpacer from "@dashboard/components/FormSpacer";
import { AccountErrorFragment } from "@dashboard/graphql";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import useModalDialogErrors from "@dashboard/hooks/useModalDialogErrors";
import { buttonMessages } from "@dashboard/intl";
import { DialogProps } from "@dashboard/types";
import { getFormErrors } from "@dashboard/utils/errors";
import getAccountErrorMessage from "@dashboard/utils/errors/account";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface CustomerPasswordResetDialogFormData {
  newPassword: string;
  oldPassword: string;
}
export interface CustomerPasswordResetDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: AccountErrorFragment[];
  onSubmit: (data: CustomerPasswordResetDialogFormData) => SubmitPromise;
}

const initialForm: CustomerPasswordResetDialogFormData = {
  newPassword: "",
  oldPassword: "",
};

const CustomerPasswordResetDialog: React.FC<
  CustomerPasswordResetDialogProps
> = ({ confirmButtonState, errors, open, onClose, onSubmit }) => {
  const intl = useIntl();
  const dialogErrors = useModalDialogErrors(errors, open);

  const formErrors = getFormErrors(
    ["oldPassword", "newPassword"],
    dialogErrors,
  );

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle disableTypography>
        <FormattedMessage
          id="+kb2lM"
          defaultMessage="Change Password"
          description="dialog header"
        />
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogContent>
              <FormSpacer />
              <TextField
                error={!!formErrors.newPassword}
                fullWidth
                helperText={
                  getAccountErrorMessage(formErrors.newPassword, intl) ||
                  intl.formatMessage({
                    id: "qEJT8e",
                    defaultMessage:
                      "New password must be at least 8 characters long",
                  })
                }
                label={intl.formatMessage({
                  id: "cMFlOp",
                  defaultMessage: "New Password",
                  description: "input label",
                })}
                name="newPassword"
                type="password"
                onChange={change}
                inputProps={{
                  spellCheck: false,
                }}
              />
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton
                data-test-id="submit"
                disabled={data.newPassword.length < 8}
                transitionState={confirmButtonState}
                type="submit"
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

CustomerPasswordResetDialog.displayName = "CustomerPasswordResetDialog";
export default CustomerPasswordResetDialog;
