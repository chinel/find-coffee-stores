import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import classNames from "classnames";

const Card = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={classNames("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={180}
              alt={props.name}
              objectFit="cover"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
