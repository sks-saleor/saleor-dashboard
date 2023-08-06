import { Box, Drawer, MenuIcon } from "@saleor/macaw-ui/next";
import React from "react";

import { SidebarContent } from "./Content";
import { ShopFragment } from "@dashboard/graphql";

interface SidebarProps {
  siteSettings?: ShopFragment;
}
export const Sidebar: React.FC<SidebarProps> = ({ siteSettings }) => (
  <>
    <Box
      display={{ mobile: "none", tablet: "none", desktop: "block" }}
      height="100%"
    >
      <SidebarContent siteSettings={siteSettings} />
    </Box>
    <Box display={{ mobile: "block", tablet: "block", desktop: "none" }}>
      <Drawer>
        <Drawer.Trigger>
          <Box
            as="button"
            borderWidth={0}
            backgroundColor="interactiveNeutralHighlightDefault"
            cursor="pointer"
            data-test-id="sidebar-drawer-open"
          >
            <MenuIcon />
          </Box>
        </Drawer.Trigger>
        <Drawer.Content
          backgroundColor="subdued"
          data-test-id="sidebar-drawer-content"
          paddingTop={0}
        >
          <SidebarContent siteSettings={siteSettings} />
        </Drawer.Content>
      </Drawer>
    </Box>
  </>
);
