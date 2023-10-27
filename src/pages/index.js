import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.scss";

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <main className={styles["home-page"]}>
        <div className={clsx(styles["home-page__content-wrp"], "padding--xl")}>
          <h1 className={styles["home-page__primary-title"]}>{siteConfig.title}</h1>
          <h1 className={styles["home-page__primary-title"]}>documentation</h1>
          <p className={clsx(styles["home-page__secondary-title"], "margin-top--sm")}>
            Lorem ipsum dolor sit amet consectetur. Morbi ornare neque porttitor convallis phasellus ultricies. Nunc
            ultrices arcu eu id sit aliquam. Etiam netus at erat mauris vitae diam feugiat pulvinar nisi. Ridiculus amet
          </p>
          <div className={clsx(styles["home-page__buttons"], "margin-top--lg")}>
            <Link
              className={clsx(styles["home-page__button"], "button", "button--link")}
              to="/docs/reference/contracts/Overview"
            >
              Reference
            </Link>
            <Link
              className={clsx(styles["home-page__button"], "button", "button--primary")}
              to="/docs/getting-started/Overview"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
