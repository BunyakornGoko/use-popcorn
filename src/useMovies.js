import { useState, useEffect } from "react"
const KEY = "6d66f174"

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, serErrorsMessage] = useState("")

  useEffect(() => {
    callback?.()
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        setIsLoading(true)
        serErrorsMessage("")
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies")
        }

        const data = await res.json()

        if (data.Response === "False") {
          throw new Error("Movie not found")
        }
        setMovies(data.Search)
        serErrorsMessage("")
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.messages)
          serErrorsMessage(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!query.length) {
      setMovies([])
    }
    fetchMovies()
    // return function () {
    //   controller.abort()
    // }
  }, [query])
  return { movies, isLoading, errorMessage }
}
