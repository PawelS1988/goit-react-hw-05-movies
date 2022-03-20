import { useParams } from "react-router-dom"
import React, { useEffect, useState, useDebugValue } from "react"
import DisplayCast from "../DisplayCast/DisplayCast"
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

const Cast = ({ apiKey }) => {
  let { id } = useParams()

  const useCast = () => {
    const [cast, setCast] = useState([])

    useEffect(() => {
      let isMounted = true
      const fetchCast = (id) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        )
          .then((resp) => resp.json())
          .then((cast) => (isMounted ? setCast(cast.cast ?? []) : []))
          .catch((er) => console.log("Cast fetch fail! -> " + er))
      }

      fetchCast(id)
      return () => {
        isMounted = false
      }
    }, [])

    useDebugValue(cast, "loading...")

    return cast
  }

  return (
    <section>
      <DisplayCast cast={useCast()} />
    </section>
  )
}

export default Cast
