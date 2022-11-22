import React from 'react'
import styles from './button.module.css'

function Button() {
  return (
    
    <div><button className={`${styles.btn12} ${styles.custombtn}`}><span>Click!</span><span>Become an Affiliate</span></button></div>
  )
}

export default Button