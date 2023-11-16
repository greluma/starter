import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGlobalContext } from "../context/context"

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
    const { searchTerm } = useGlobalContext()

    const response = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const result = await axios(`${url}&query=${searchTerm}`)
            return result.data
        }
    })

    if (response.isLoading) {
        return <section className="image-container">
            <h4>Loading...</h4>
        </section>
    }

    if (response.isError) {
        return <section className="image-container">
            <h4>There was an error...</h4>
        </section>
    }

    const results = response.data.results

    if (!results.length) {
        return <section className="image-container">
            <h4>Sorry, no images founded...</h4>
        </section>
    }

    return (
        <section className="image-container">
            {results.map(item => {
                const { id, alt_description: title, urls: { regular: img } } = item
                return <article key={id}>
                    <img src={img} alt={title} className="img" />
                    <h4>{title}</h4>
                </article>
            })}
        </section>
    )
}
export default Gallery