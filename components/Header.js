import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Image
            className={styles.header__logo}
            src="/arclif__logo.svg"
            alt="Arclif Logo"
            width={100}
            height={35}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
