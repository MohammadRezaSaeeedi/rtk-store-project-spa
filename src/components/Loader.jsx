import React from 'react'
import { BallTriangle } from 'react-loader-spinner' 
import styles from "./Loader.module.css"
function Loader() {
  return (
    <div className={styles.loader}>
       <BallTriangle 
        width="100px"
        height="100px"
        radius={5}
        color="#97EBEC"
       />
    </div>
  )
}

export default Loader