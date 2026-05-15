import { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItemSkeleton from './NewsItemSkeleton';

export default function News(props) {

    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    const [error, setError] = useState("")
    const [articles, setArticles] = useState([])
    const [totalresults, setTotalresults] = useState(0)
    const [lastFetchedPage, setLastFetchedPage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState("")

    useEffect(() => {
        document.title =
            props.category === ''
                ? 'Home - NewsMonkey'
                : `${capitalizeFirstLetter(props.category.slice(10))} - NewsMonkey`;
        
        const init = async () => {
            const { articles, nextPage } = await fetchArticles();
            setArticles(articles);
            setPage(nextPage);
        };

        init();
    }, [props.category, props.country]);

    const capitalizeFirstLetter = (str) => {
        if (str.length === 0) {
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fetchArticles = async (page = "") => {
        props.setprogress(10)
        
        const pageParam = page ? `&page=${page}` : "";
        const country = props.country === 'USA' ? 'us' : props.country.toLowerCase()
        const url = `https://newsdata.io/api/1/latest?country=${country || "pk"}${props.category}&apikey=${apiKey}&q=latest%20news${pageParam}`;

        try {
            setLoading(true)

            const data = await fetch(url);
            props.setprogress(30)

            if (data.status === 429) {
                alert("You have hit the API request limit (429). Please wait or use a new API key.");
                setLoading(false)
                setArticles([]);
                return { articles: [], nextPage: null };
            }

            const parsedData = await data.json();
            props.setprogress(50)

            setArticles(parsedData.results || [])
            setPage(parsedData.nextPage ?? null)
            setTotalresults(parsedData.totalResults)
            setLoading(false)

            props.setprogress(100)

            return {
                articles: parsedData.results || [],
                nextPage: parsedData.nextPage ?? null
            };
        } catch (err) {
            console.error("Fetch failed:", err);
            setLoading(false)
            // No internet
            if (!navigator.onLine) {
                setError("No internet connection")
                alert(error)
            }

            // Fetch failed / server down / CORS / timeout etc.
            else {
                setError(err.message || "Something went wrong")
                alert(error)
            }
        }

    };

    const fetchMoreData = async () => {
        const currentPage = page;
        const lastPage = lastFetchedPage;
        if (!currentPage || currentPage === lastPage) return;

        console.log('page:', page)

        const { articles: newArticles, nextPage } = await fetchArticles(currentPage);

        setArticles(prev => [...prev, ...newArticles]);
        setPage(nextPage)
        setLastFetchedPage(currentPage)
    };

    return (
        <>
            {console.log("Total:", totalresults)}
            {console.log("Fetched:", articles.length)}
            {console.log("NextPage:", page)}
            <InfiniteScroll
                className='row'
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={page !== null}
                loader={
                    Array(6).fill("").map((_, i) => <div key={i} className='col-lg-4 col-md-6 my-3'><NewsItemSkeleton /></div>)
                }
            >
                <h1 className='text-center my-4 mt-5'>NewsMonkey - Top {capitalizeFirstLetter(props.category.slice(10)
                )} Headlines</h1>
                <div className='container my-4'>
                    <div className='row'>
                        {
                            loading ?

                                Array(6).fill("").map((_, i) => <div key={i} className='col-lg-4 col-md-6 my-3'><NewsItemSkeleton /></div>) :

                                Array.isArray(articles) && articles.map((el) => {
                                    return <div key={el.article_id} className='col-lg-4 col-md-6 my-3'>
                                        <NewsItem title={el.title ? el.title.slice(0, 45) : ''} desc={el.description ? el.description.slice(0, 88) : ''} imageurl={el.image_url} newsurl={el.link} author={el.creator} date={el.pubDate} source={el.source_name} category={props.category.slice(10)} />
                                    </div>
                                })
                        }
                        {
                            page === null &&
                            <div className="all-caught-up">
                                <hr />
                                <p>🎉 All caught up!</p>
                            </div>
                        }
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}