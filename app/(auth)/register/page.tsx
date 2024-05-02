import SignUpForm from "../components/SignUpForm";
import styles from "./../components/AuthStyles.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.authPageWrapper}>
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
