import styles from "./technical.module.css";

export function TechnicalDetails() {
  return (
    <section id="technical-details" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>MACHINED PRECISION</h2>
          <p className={styles.desc}>
            각 제품 카드는 1px Inset Border와 마우스 오버 시 발산되는 Ambient
            Glow를 결합하여 입체적이고 몰입감 있는 인터랙션을 전달합니다. Midnight
            브랜드 고유의 다채롭고 고급스러운 다크 UX를 데스크톱 화면에서 한계 없이
            느껴보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
