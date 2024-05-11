import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {

  return (
    <header className={styles.header}>
      <nav className='container'>
        <Link to='/' end>Acessibiliz<span className={styles.ai1}>A</span><span className={styles.ai2}>I</span></Link>
      </nav>
    </header>
  )
}

export default Header