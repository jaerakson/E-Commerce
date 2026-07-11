import styles from "./editorial.module.css";

export function EditorialIntro() {
  return (
    <section id="editorial" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.quote}>
          &ldquo;우리는 화려함을 걷어내고, 제품 고유의 형태와 질감에만 빛을
          집중시킵니다. <br />
          어둠 속에서 비로소 진정한 프리미엄이 증명됩니다.&rdquo;
        </p>
        <span className={styles.author}>— MIDNIGHT CURATOR</span>
      </div>
    </section>
  );
}
