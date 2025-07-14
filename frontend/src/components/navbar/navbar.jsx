import styles from './navbar.module.css';
import { LuShoppingCart, LuUserCircle, LuMenu } from "react-icons/lu"

export default function Navbar() {
    return (
        <>
        <nav className={styles.navbarContainer}>
        <div className={styles.navbarItems}>
        <img className={styles.logo} src="/imgs/logo.png" alt="" />
         <div className={styles.navbarLinksContainer}>
        <a href="" className={styles.navbarLink}>Home</a>
        <a href="" className={styles.navbarLink}>Plates</a>
        <LuShoppingCart lassName={styles.navbarLink}/>
        <LuUserCircle className={styles.navbarLink}/>
        
        </div>        
        </div>
      
        </nav>
     </>   
    )
}