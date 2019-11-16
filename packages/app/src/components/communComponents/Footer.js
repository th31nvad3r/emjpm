import getConfig from "next/config";
import Link from "next/link";
import React from "react";

const { publicRuntimeConfig } = getConfig();

const Footer = ({ fixed }) => (
  <footer
    className="footer"
    style={{
      backgroundColor: "#26353fff",
      marginTop: 50,
      textAlign: "center",
      width: "100%",
      ...((fixed && { bottom: 0, position: "fixed" }) || {})
    }}
  >
    <div className="footer_container">
      <div className="footer__logo" />
      <ul className="footer__links">
        <li>
          <a
            className="button button_transparent"
            style={{ fontSize: "1em" }}
            href="mailto:support.emjpm@fabrique.social.gouv.fr"
          >
            Nous contacter{" "}
          </a>
        </li>
        <li>Site optimisé pour Mozilla Firefox et Google Chrome</li>
        <li>
          <Link href="/mentions-legales-modalites-utilisation">
            <a className="button button_transparent" style={{ fontSize: "1em" }}>
              {`Mentions légales et conditions générales d'utilisation`}
            </a>
          </Link>
        </li>
        <li>Version {publicRuntimeConfig.PACKAGE_VERSION}</li>
      </ul>
      <ul className="footer__links"> </ul>
    </div>
  </footer>
);

export default Footer;
