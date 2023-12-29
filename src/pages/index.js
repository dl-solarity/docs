import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.scss";

const planets = [
  {
    name: "solidity",
    imgSrc: "/img/home-page/planet-solidity.svg",
    href: "https://soliditylang.org/",
  },
  {
    name: "zk",
    imgSrc: "/img/home-page/planet-zk.svg",
    href: "https://docs.circom.io/",
  },
  {
    name: "hardhat",
    imgSrc: "/img/home-page/planet-hardhat.svg",
    href: "https://hardhat.org/",
  },
  {
    name: "graph",
    imgSrc: "/img/home-page/planet-graph.svg",
    href: "https://thegraph.com/",
  },
  {
    name: "vyper",
    imgSrc: "/img/home-page/planet-vyper.svg",
    href: "https://docs.vyperlang.org/",
  },
];

export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout>
      <main className={styles["home-page"]}>
        <div className={styles["home-page__background"]}>
          {planets.map((planet) => (
            <a className={styles["home-page__planet"]} href={planet.href} rel="noreferrer noopener" target="_blank">
              <img className={styles["home-page__planet-img"]} src={planet.imgSrc} alt={`planet-${planet.name}`} />
            </a>
          ))}
        </div>
        <h1 className={styles["home-page__title"]}>{siteConfig.title}</h1>
        <h1 className={styles["home-page__title"]}>Documentation</h1>
        <div className={styles["home-page__buttons-wrp"]}>
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
      </main>
    </Layout>
  );
}
