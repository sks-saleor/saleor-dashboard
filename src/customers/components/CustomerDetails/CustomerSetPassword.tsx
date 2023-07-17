import { Button } from "@dashboard/components/Button";
import CardTitle from "@dashboard/components/CardTitle";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPasswordProps {
  onChangePassword: () => void;
}

const CustomerSetPassword: React.FC<StaffPasswordProps> = ({
  onChangePassword,
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          id: "ZhDQel",
          defaultMessage: "Password",
          description: "header",
        })}
        toolbar={
          <Button onClick={onChangePassword} data-test-id="changePasswordBtn">
            <FormattedMessage
              id="SLRtLs"
              defaultMessage="Change password"
              description="button"
            />
          </Button>
        }
      />
      <CardContent>
        <Typography>
          <FormattedMessage
            id="mm0CXe"
            defaultMessage="You should change your password every month to avoid security issues."
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

CustomerSetPassword.displayName = "CustomerSetPassword";
export default CustomerSetPassword;
