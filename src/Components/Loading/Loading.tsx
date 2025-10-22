import styles from "./Loading.module.css";
import ReactLoading from "react-loading";
import { LoadingType } from "react-loading";

interface iLoading {
    size: number;
    type: LoadingType;
    label?: string;
}

const Loading: React.FC<iLoading> = ({ size, type, label }) => {
  return (
      <div className={styles.container}>
        <ReactLoading type={type} color="#9fc54d" height={size} width={size} />
        {label && <p>{label}</p>}
      </div>
  );
};

export default Loading;
