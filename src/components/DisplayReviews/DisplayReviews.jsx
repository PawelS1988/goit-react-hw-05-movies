import React from "react"
import styles from "./DisplayReviews.module.css"

const DisplayReviews = ({ reviews }) => {
  if (reviews.length === 0)
    return <p>We don't have any reviews for this move</p>

  return (
    <ul>
      {reviews.map(({ author, content, id }) => (
        <li key={id}>
          <h2 className={styles.Author}>{author}</h2>
          <p className={styles.Content}>{content}</p>
        </li>
      ))}
    </ul>
  )
}

export default DisplayReviews
