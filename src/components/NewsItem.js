import React, { Component } from 'react'

export default class NewsItem extends Component {
    
    render() {
      let {title, desc, imageurl, newsurl, author, date, source} = this.props;
    return (
        <>
            <div className="card">
                <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
                    <span className="badge rounded-pill bg-danger z-1" style={{ left: '87%' }}>
                        {source}
                    </span>
                </div>
                <img src={imageurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} rel='noreferrer' target='_blank' className="btn btn-dark">Read more</a>
                </div>
            </div>   
        </>
    )
  }
}
