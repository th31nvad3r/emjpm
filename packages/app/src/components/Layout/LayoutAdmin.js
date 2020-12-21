import React, { Fragment } from "react";
import { Box } from "rebass";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import { BoxWrapper } from "~/ui";

const navigationLinks = [
  {
    title: "Utilisateurs",
    url: "/admin",
  },
  {
    title: "Services",
    url: "/admin/services",
  },
  {
    title: "Etablissements",
    url: "/admin/etablissements",
  },
  {
    title: "Tribunaux",
    url: "/admin/tribunaux",
  },
  {
    title: "Liste blanche",
    url: "/admin/liste-blanche",
  },
  {
    title: "Editeurs",
    url: "/admin/editors",
  },
  {
    title: "API Logs",
    url: "/admin/api-logs",
  },
];

const LayoutAdmin = (props) => {
  const { children, hasNavigation = true } = props;

  return (
    <Fragment>
      <Box sx={{ position: "relative", "z-index": "1000" }} bg="cardPrimary">
        <Header />
        {hasNavigation && (
          <BoxWrapper>
            <Navigation links={navigationLinks} />
          </BoxWrapper>
        )}
      </Box>
      {children}
      <Box bg="cardPrimary">
        <BoxWrapper px="1">
          <Footer />
        </BoxWrapper>
      </Box>
    </Fragment>
  );
};

export { LayoutAdmin };
