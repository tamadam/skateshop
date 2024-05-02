import SignInForm from "../components/SignInForm";
import styles from "./../components/AuthStyles.module.css";

const LoginPage = () => {
  return (
    <div className={styles.authPageWrapper}>
      <SignInForm />
    </div>
  );
};

export default LoginPage;
