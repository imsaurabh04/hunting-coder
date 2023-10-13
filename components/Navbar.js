import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

const Navbar = () => {
    return (
        <nav className={`${styles.Navbar} ${inter.className}`}>  
            <ul className={styles.mainNav}>
            <Link href="/"><li>Home</li></Link>
            <Link href="/blog"><li>Blogs</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/contact"><li>Contact</li></Link>
            </ul>
        </nav> 
    )
}

export default Navbar