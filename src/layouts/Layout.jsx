import styles from "./layouts.module.css";

function Layout({ children }) {
  return (
    <div>
      <header className={styles.head}>
        <h1>Crypto App</h1>
        <p>Mohammad Riahi | React.js</p>
      </header>
      {children}
      <footer>
        <p>developed by Mohammad riahi</p>
      </footer>
    </div>
  );
}

export default Layout;
