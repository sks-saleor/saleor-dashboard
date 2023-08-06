import { Box } from "@saleor/macaw-ui/next";
import React from "react";

import { Menu } from "./menu";
import { MountingPoint } from "./MountingPoint";
import { UserInfo } from "./user";
import { ShopFragment } from "@dashboard/graphql";

interface SidebarContentProps {
  siteSettings?: ShopFragment;
}
export const SidebarContent: React.FC<SidebarContentProps> = ({
  siteSettings,
}) => {
  const logoUrl = siteSettings?.metadata?.find(m => m.key === "logo")?.value;

  return (
    <Box
      backgroundColor="subdued"
      as="aside"
      height="100%"
      display="grid"
      __gridTemplateRows="auto 1fr auto"
    >
      <MountingPoint logoUrl={logoUrl} />
      <Menu />
      <UserInfo />
    </Box>
  );
};
