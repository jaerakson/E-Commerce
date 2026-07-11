import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>MIDNIGHT</div>
        <p className={styles.copy}>
          &copy; 2026 MIDNIGHT SELECT SHOP. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
