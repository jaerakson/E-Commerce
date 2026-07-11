import Image from "next/image";
import styles from "./hero.module.css";
import heroBg from "@/public/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.subtitle}>EXCLUSIVELY CURATED</span>
        <h1 id="hero-heading" className={styles.title}>
          CINEMATIC
          <br />
          INTELLIGENCE
        </h1>
        <p className={styles.desc}>
          절제된 디테일과 감각적인 다크 모드로 완성하는 최상의 프리미엄 쇼핑 경험.
        </p>
        <a href="#new-in" className="btn btn-primary">
          DISCOVER NOW
        </a>
      </div>
    </section>
  );
}
