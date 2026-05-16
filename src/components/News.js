import { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from './NewsItem';
import NewsItemSkeleton from './NewsItemSkeleton';

export default function News(props) {

    // =========================
    // Destructuring Props
    // =========================
    const {
        category,
        country,
        setprogress
    } = props;

    const apiKey = process.env.REACT_APP_NEWS_API_KEY;

    // =========================
    // States
    // =========================
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(null);
    const [error, setError] = useState("");

    // =========================
    // Capitalize Function
    // =========================
    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // =========================
    // Reusable API Function
    // =========================
    const getArticles = useCallback(async (nextPage = "") => {

        const countryCode =
            country === "USA"
                ? "us"
                : country.toLowerCase();

        const pageParam = nextPage ? `&page=${nextPage}` : "";

        const url =
            `https://newsdata.io/api/1/latest?country=${countryCode || "pk"}${category}&apikey=${apiKey}&q=latest%20news${pageParam}`;

        const response = await fetch(url);

        // API limit reached
        if (response.status === 429) {
            setError("API request limit reached");
            return null;
        }

        return await response.json();

    }, [category, country, apiKey]);

    // =========================
    // Initial Fetch
    // =========================
    useEffect(() => {

        document.title =
            category === ''
                ? 'Home - NewsMonkey'
                : `${capitalizeFirstLetter(category.slice(10))} - NewsMonkey`;

        const fetchInitialNews = async () => {

            try {

                setprogress(10);
                setLoading(true);

                const data = await getArticles();

                setprogress(50);

                if (!data) {
                    setLoading(false);
                    setprogress(100)
                    return;
                }

                setArticles(data.results || []);
                setPage(data.nextPage ?? null);

                setLoading(false);
                setprogress(100);

                setError(data.results.message);

            } catch (err) {

                console.error(err);
                setLoading(false);

                if (!navigator.onLine) {
                    setError("No internet connection");
                } else {
                    setError(err.message || "Something went wrong");
                }
            }
        };

        fetchInitialNews();

    }, [category, getArticles, setprogress]);

    // =========================
    // Infinite Scroll
    // =========================
    const fetchMoreData = async () => {

        // Stop if no next page
        if (!page) return;

        try {

            const data = await getArticles(page);

            if (!data) return;

            setArticles((prevArticles) => [
                ...prevArticles,
                ...(data.results || [])
            ]);

            setPage(data.nextPage ?? null);

        } catch (err) {

            console.error(err);

            if (!navigator.onLine) {
                setError("No internet connection");
            } else {
                setError(err.message || "Something went wrong");
            }
        }
    };

    return (
        <>
            {/* Heading */}
            <h1 className='text-center' style={{margin: "4rem 0"}}>
                NewsMonkey - Top {capitalizeFirstLetter(category.slice(10))} Headlines
            </h1>

            {/* Error Message */}
            {
                error &&
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            }

            {/* Infinite Scroll */}
            <InfiniteScroll
                className='container'
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={page !== null}
                loader={
                    <div className='row'>
                        {
                            Array(6).fill("").map((_, i) => (
                                <div
                                    key={i}
                                    className='col-lg-4 col-md-6 my-3'
                                >
                                    <NewsItemSkeleton />
                                </div>
                            ))
                        }
                    </div>
                }
            >

                <div className='row'>

                    {
                        loading ?

                            Array(6).fill("").map((_, i) => (
                                <div
                                    key={i}
                                    className='col-lg-4 col-md-6 my-3'
                                >
                                    <NewsItemSkeleton />
                                </div>
                            ))

                            :

                            Array.isArray(articles) &&
                            articles.map((el) => {

                                return (
                                    <div
                                        key={el.article_id}
                                        className='col-lg-4 col-md-6 my-3'
                                    >

                                        <NewsItem
                                            title={
                                                el.title
                                                    ? el.title.slice(0, 45)
                                                    : ''
                                            }

                                            desc={
                                                el.description
                                                    ? el.description.slice(0, 88)
                                                    : ''
                                            }

                                            imageurl={el.image_url}
                                            newsurl={el.link}
                                            author={el.creator}
                                            date={el.pubDate}
                                            source={el.source_name}
                                            category={category.slice(10)}
                                        />

                                    </div>
                                );
                            })
                    }

                    {/* All Caught Up */}
                    {
                        page === null &&
                        !loading &&
                        articles.length > 0 &&

                        <div className="all-caught-up text-center my-4">
                            <hr />
                            <p>🎉 All caught up!</p>
                        </div>
                    }
                    {
                        page === null &&
                        !loading &&
                        articles.length === 0 &&

                        <div className="all-caught-up text-center my-4">
                            <hr />
                            <p>No Related Articles</p>
                        </div>
                    }

                </div>

            </InfiniteScroll>
        </>
    );
}