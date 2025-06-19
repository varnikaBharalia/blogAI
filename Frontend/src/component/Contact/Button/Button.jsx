import styles from "./Button.module.css";


const Button = (props) => {
  return (
    <div>
      <button className={props.is_outline?`${styles.outline_btn}`:`${styles.button}`}>
      {props.icon}
      {props.text}
      </button>
    </div>
  );
};

export default Button;
