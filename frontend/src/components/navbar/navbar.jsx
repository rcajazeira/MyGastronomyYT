import styles from './navbar.module.css';
import { LuShoppingCart, LuUser, LuMenu } from "react-icons/lu"

export default function Navbar() {
    return (
        <>
        <nav className={styles.navbarContainer}>
        <div className={styles.navbarItems}>
        <img className={styles.logo} src="/imgs/logo.png" alt="" />
         <div className={styles.navbarLinksContainer}>
        <a href="" className={styles.navbarLink}>Home</a>
        <a href="" className={styles.navbarLink}>Plates</a>
        <LuShoppingCart className={styles.navbarLink}/>
        <LuUser className={styles.navbarLink}/>
        
        </div>        
        </div>
      
        </nav>
     </>   
    )
}