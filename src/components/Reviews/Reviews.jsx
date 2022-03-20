import React, { useDebugValue, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DisplayReviews from "../DisplayReviews/DisplayReviews"

const Reviews = ({ apiKey }) => {
  const useReviews = () => {
    const [reviews, setReviews] = useState([])
    let { id } = useParams()

    useEffect(() => {
      let isMounted = true
      const fetchReviews = (id) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
        )
          .then((resp) => resp.json())
          .then((reviews) =>
            isMounted ? setReviews(reviews.results ?? []) : []
          )
          .catch((er) => console.log("Reviews error fetch ->" + er))
      }

      fetchReviews(id)
      return () => {
        isMounted = false
      }
    }, [id])

    useDebugValue(reviews, "loading...")

    return reviews
  }

  return (
    <section>
      <DisplayReviews reviews={useReviews()} />
    </section>
  )
}

export default Reviews
