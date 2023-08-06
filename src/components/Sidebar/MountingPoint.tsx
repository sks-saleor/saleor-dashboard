import sideBarDefaultLogoDarkMode from "@assets/images/sidebar-deafult-logo-darkMode.png";
import sideBarDefaultLogo from "@assets/images/sidebar-default-logo.png";
import { useLegacyThemeHandler } from "@dashboard/components/Sidebar/user/Controls";
import { Avatar, Box, Text } from "@saleor/macaw-ui/next";
import React from "react";

interface MountingPointProps {
  logoUrl?: string;
}
export const MountingPoint: React.FC<MountingPointProps> = ({ logoUrl }) => {
  const { theme } = useLegacyThemeHandler();
  const logo =
    theme === "defaultLight" ? sideBarDefaultLogo : sideBarDefaultLogoDarkMode;

  return (
    <Box display="flex" gap={3} paddingX={4} paddingY={5} alignItems="center">
      <Avatar.Store src={logoUrl || logo} scheme="decorative2" size="small" />
      <Text variant="bodyStrong" size="small">
        Dashboard
      </Text>
    </Box>
  );
};
