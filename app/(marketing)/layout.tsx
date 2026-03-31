import styles from "./layout.module.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.marketingRoot}>{children}</div>;
}
