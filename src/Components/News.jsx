import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
   country :"in",
   pageSize: 8,
   category: "general",
  }
  static propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string,
  }
  constructor() {
    super();
    // console.log("Starting")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=2597796867a94ef5a973dc23834624d2&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=2597796867a94ef5a973dc23834624d2&page={this.state.page - 1}&pageSize=${this.props.pageSize}`;
    
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=2597796867a94ef5a973dc23834624d2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
     
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style = {{margin: "35px 0px"}}>NewsTiger - Top Headline</h1>
          {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  description={
                    element.description ? element.description.slice(0, 88) : " "
                  }
                  title={element.title ? element.title.slice(0, 45) : " "}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
