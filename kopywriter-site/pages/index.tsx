import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Kopywriter from "../components/kopywriter";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kopywriter | AI Generated Copywriting Sentences App</title>
        <meta
          name="description"
          content="Generate copywriting sentences for your products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Kopywriter />
    </div>
  );
};

export default Home;
