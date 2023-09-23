import React from 'react'
import NoResults from "../assets/no-data.png"
import styles from "../styles/NotFound.module.css"
import Asset from './Asset'

const NotFound = () => {
  return (
    <div className={styles.Image}>
        <Asset src={NoResults}>
        </Asset>
        Sorry, the page you're looking for doesn't exist
    </div>
  )
}

export default NotFound