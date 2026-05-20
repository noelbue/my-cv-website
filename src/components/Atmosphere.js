import React from "react";
import * as styles from "./Atmosphere.module.css";

const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

const Atmosphere = () => {
  return (
    <>
      <div className={styles.blobLayer} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blob1}`} />
        <span className={`${styles.blob} ${styles.blob2}`} />
        <span className={`${styles.blob} ${styles.blob3}`} />
        <span className={`${styles.blob} ${styles.blob4}`} />
        <span className={`${styles.blob} ${styles.blob5}`} />
      </div>
      <div className={styles.aurora} aria-hidden="true" />
      <div
        className={styles.noise}
        aria-hidden="true"
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
      />
    </>
  );
};

export default Atmosphere;
