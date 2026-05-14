import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            totalresults: 0,
            lastFetchedPage: null,
            loading: false,
            page: ""
        }
    }
    async componentDidMount() {
       document.title = this.props.category === '' ? 'NewsMonkey - Home' : `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category.slice(10))}`
        const { articles, nextPage } = await this.fetchArticles();
        this.setState({ articles, page: nextPage });
    }

    capitalizeFirstLetter = (str) => {
        if (str.length === 0) {
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    fetchArticles = async (page = "") => {
        this.props.setprogress(10)
        if (this.state.loading || page === null)
            return { articles: [], nextPage: null };
        const pageParam = page ? `&page=${page}` : "";
        const url = `https://newsdata.io/api/1/latest?country=in${this.props.category}&apikey=pub_54b3666ff37642729f1eb290aa97b039&q=latest%20news${pageParam}`;

        try {
            this.setState({ loading: true });

            const data = await fetch(url);
            this.props.setprogress(30)

            if (data.status === 429) {
                alert("You have hit the API request limit (429). Please wait or use a new API key.");
                this.setState({ loading: false });
                return;
            }

            const parsedData = await data.json();
            this.props.setprogress(50)

            this.setState({
                page: parsedData.nextPage ?? null,
                totalresults: parsedData.totalResults,
                loading: false,
            });
            this.props.setprogress(100)
            return {articles: parsedData.results || [],
                    nextPage: parsedData.nextPage ?? null};
        } catch (err) {
            console.error("Fetch failed:", err);
            this.setState({ loading: false });
        }

    };

    fetchMoreData = async () => {
        const currentPage = this.state.page;
        const lastPage = this.state.lastFetchedPage;
        if (!currentPage || currentPage === lastPage) return;

        console.log('page:', this.state.page)
        
        const { articles: newArticles, nextPage } = await this.fetchArticles(currentPage);
        this.setState((prevState) => ({
            articles: prevState.articles.concat(newArticles),
            page: nextPage,
            lastFetchedPage: currentPage
        }));
    };

    render() {

        return (
            <>
                {console.log("Total:", this.state.totalresults)}
                {console.log("Fetched:", this.state.articles.length)}
                {console.log("NextPage:", this.state.page)}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.page !== null}
                loader={<Spinner />}
                >
                <h1 className='text-center my-4 mt-5'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category.slice(10)
                )} Headlines</h1>
                {/* {this.state.loading && <Spinner />} */}
                <div className='container my-4'>
                    <div className='row'>
                        {Array.isArray(this.state.articles) && this.state.articles.map((el) => {
                            return <div key={el.article_id} className='col-md-4 my-3'>
                                <NewsItem title={el.title ? el.title.slice(0, 45) : ''} desc={el.description ? el.description.slice(0, 88) : ''} imageurl={el.image_url === null ? 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=' : el.image_url} newsurl={el.link} author={el.creator} date={el.pubDate} source={el.source_name} />
                            </div>
                        })}
                            {this.state.page === null && <div className="all-caught-up">
                                <hr />
                                <p>🎉 All caught up!</p>
                            </div>}
                    </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}
