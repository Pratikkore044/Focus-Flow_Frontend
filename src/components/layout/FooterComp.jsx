import Logo from "../../assets/Logo3.png"
"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

const FooterComp = () => {
  return (
    <Footer container className="rounded-none">
  <div className="w-full">
    <div className="flex justify-between items-start">
      <div>
        <FooterBrand 
          href="/"
          src={Logo}
          alt="FocusFlow Logo"
          name="FocusFlow"
          className="mr-3 h-12 w-auto"
        />
      </div>
      <div className="flex gap-16 justify-between">
        <div>
          <FooterTitle title="ABOUT" />
          <FooterLinkGroup col>
            <FooterLink href="/">FocusFlow</FooterLink>
            <FooterLink href="/">Service</FooterLink>
          </FooterLinkGroup>
        </div>
        <div>
          <FooterTitle title="FOLLOW US" />
          <FooterLinkGroup col>
            <FooterLink >Github</FooterLink>
            <FooterLink >Discord</FooterLink>
          </FooterLinkGroup>
        </div>
      </div>
    </div>
    <FooterDivider />
    <FooterCopyright href="/" by="FlowFlow™" year={2025} />
  </div>
</Footer>
  );
}

export default FooterComp;
