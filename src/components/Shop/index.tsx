// @ts-strict-ignore
import appleTouchIcon from "@assets/favicons/apple-icon-180x180.png";
import favicon16 from "@assets/favicons/favicon-16x16.png";
import favicon32 from "@assets/favicons/favicon-32x32.png";
import { useUser } from "@dashboard/auth";
import { ShopInfoQuery, useShopInfoQuery } from "@dashboard/graphql";
import React from "react";
import Helmet from "react-helmet";

type ShopContext = ShopInfoQuery["shop"];

export const ShopContext = React.createContext<ShopContext>(undefined);

export const ShopProvider: React.FC = ({ children }) => {
  const { authenticated, user } = useUser();
  const { data } = useShopInfoQuery({
    skip: !authenticated || !user,
  });

  return (
    <>
      <Helmet>
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      </Helmet>
      <ShopContext.Provider value={data ? data.shop : undefined}>
        {children}
      </ShopContext.Provider>
    </>
  );
};

export const Shop = ShopContext.Consumer;
export default Shop;
