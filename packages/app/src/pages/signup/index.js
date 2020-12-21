import React from "react";

import { LayoutPublic } from "~/components/Layout";
import Signup from "~/components/Signup";
import { SignupContextProvider } from "~/components/Signup/context";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const SignupPage = () => {
  return (
    <SignupContextProvider>
      <LayoutPublic>
        <BoxWrapper pt="6" px="1">
          <Signup />
        </BoxWrapper>
      </LayoutPublic>
    </SignupContextProvider>
  );
};

export default withAuthSync(SignupPage);
