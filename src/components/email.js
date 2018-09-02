import React, { Component } from 'react';
import { render } from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import axios from 'axios';
const queryString = require("query-string");
import 'c3/c3.css';
import '../stylesheets/App.css';
import Modal from 'react-modal';
import movieImg from '../../public/images/movies.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadProgressBar } from 'axios-progress-bar'
import Crousel from './crousel.js';
import ReactAutocomplete from 'react-autocomplete';
var movieData = [];
var movie_language = [];
var movie_country = [];
class EdmEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      movies: {
        movie_title: '',
        director_name: '',
        actor_1_name: '',
        actor_2_name: '',
        geners: '',
        language: '',
        country: '',
        content_rating: '',
        budget: '',
        title_year: '',
        plot_keywords: '',
        movie_imdb_link: '',
        moviesNameList:[]
      },
      language: [],
      country: [],
      value: '',
      selectedCountryVal: '',
      selectedLanguageVal: ''
    };


  }

  componentWillMount() {
    var that = this;
    loadProgressBar();
    axios.get("http://starlord.hackerearth.com/movieslisting")
      .then(function (response) {
        movieData = response.data;
        console.log("movieData       :   ", movieData)
        if (movieData != undefined) {
          that.setState({ moviesList: movieData });
          that.setData();
          console.log("data set to state :  ", this.state.movies)
        }
        return response.data;
      })
      .catch(function (err) {
        console.log("Error while get call of API : " + err);
      })



  }
  setData() {
    var movieList = this.state.moviesList;
    var moviesNameLists=[];
    for (var i = 0; i < movieList.length; i++) {
      movie_country.push(movieList[i].country)
      movie_language.push(movieList[i].language);
      moviesNameLists.push({id: movieList[i].movie_title.toLowerCase(), label: movieList[i].movie_title.toLowerCase()});
    }
    movie_language = movie_language.filter(this.onlyUnique);
    movie_country = movie_country.filter(this.onlyUnique);
    this.setState({
      language: movie_language,
      country: movie_country,
      moviesNameList:moviesNameLists
    })
    console.log("uniques movie language:  " + movie_language.filter(this.onlyUnique))
    console.log("uniques movie country:  " + movie_country.filter(this.onlyUnique))
  }

  onlyUnique(value, index, self) {
    if (value != '') {
      return self.indexOf(value) === index;
    }

  }
  selectedLanguage = (e) => {
    var that = this;
    that.setState({moviesList:movieData})
    alert(e.currentTarget.value);
    let fileteredList = movieData.filter(function (movie) {
      if (movie.language.toLowerCase() == e.currentTarget.value.toLowerCase()) {
        return movie;
      }
    })
    console.log(fileteredList);
    that.setState({moviesList:fileteredList})
  }
  selectedCountry = (e) => {
    var that = this;
    that.setState({moviesList:movieData})
    alert(e.currentTarget.value);
    that.setState({ selectedCountry: e.currentTarget.value });

    let fileteredList = movieData.filter(function (movie) {
      if (movie.country.toLowerCase() == e.currentTarget.value.toLowerCase()) {
        return movie;
      }
    })
    console.log(fileteredList);
    that.setState({moviesList:fileteredList})
  }

  selectedYear = (e) => {
    var that = this;
    that.setState({moviesList:movieData})
    that.setState({ selectedYear: e.currentTarget.value });
    let fileteredList = movieData.filter(function (movie) {
      if (parseInt(e.currentTarget.value)< parseInt(movie.title_year) && parseInt(movie.title_year) < parseInt(e.currentTarget.value)+5) {
        return movie;
      }
    })
    console.log(fileteredList);
    that.setState({moviesList:fileteredList})
  }

  render() {
    var that=this;
    return (

      <div>
        <Crousel />
        <div className="mainContent">
          <div className="leftContent">
            <h3>Search Moive </h3>
            {
              this.state.moviesNameList?(<ReactAutocomplete
                inputProps={{ style: { border: '1px solid #483D8B', padding: '10px', borderRadius: '5px', width: '225px', backgroundColor: '#dcdcdd' }, placeholder: 'Search Movies' }}
                
                items={that.state.moviesNameList}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
  
                renderItem={(item, highlighted, style) =>
                  <div className="search-ac"
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                  >
                    {item.label}
                  </div>
                }
                value={that.state.value}
                onChange={e => that.setState({ value: e.target.value })}
                onSelect={value => {that.setState({ value })
                let fileteredList = movieData.filter(function (movie) {
                  var searchedVal=that.state.value;
                  if (movie.movie_title.toLowerCase().match(searchedVal)) {
                    return movie;
                  }
                })
                console.log(fileteredList);
                that.setState({moviesList:fileteredList})
              }
                
              }
              />):(<div>loading..</div>)
              }
            
            <br />
            <hr />
            <h3>Sort By Year ..</h3>
            <select className="filerDd" onChange={this.selectedYear}>
              <option>Select Year</option>
              <option value="2000">2000 - 2005</option>
              <option value="2006">2006 - 2010</option>
              <option value="2011">2011 - 2015</option>
              <option value="2015">2015 - 2018</option>
            </select>
            <br />
            <hr />
            <h3>As per Language ..</h3>
            <select className="filerDd" onChange={this.selectedLanguage} >
              <option>Select Language</option>
              {
                this.state.language ? (
                  this.state.language.map(function (language, i) {
                    return (
                      <option key={i} value={language} >
                        {language}
                      </option>
                    )
                  })

                ) : (
                    <div>
                      loading..
                    </div>
                  )
              }
            </select>
            <br />
            <hr />
            <h3>As per Country ..</h3>
            <select className="filerDd" onChange={this.selectedCountry}>
              <option>Select Country</option>
              {
                this.state.country ? (
                  this.state.country.map(function (country, i) {
                    return (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    )
                  })

                ) : (
                    <div>
                      loading..
                    </div>
                  )
              }
            </select>
          </div>
          <div className="rightContent">
            <div className="movieHolder">
              {
                this.state.moviesList ? (
                  this.state.moviesList.map(function (movie, i) {
                    return (
                      <div className="movieThumbnail" key={i} onClick={(e) => that.selectedMovie(e, movie, presentTones)}>
                        <img src={movieImg} className="thumbnail-img" />
                        <hr/>
                        <p><span className="thumbnailTitle">Movie Title  :  </span><span>{movie.movie_title}</span></p>
                        <p><span className="thumbnailTitle">Director Name  : </span><span>{movie.director_name}</span></p>
                        <p><span className="thumbnailTitle">Actor 1 Name : </span><span>{movie.actor_1_name}</span></p>
                        <p><span className="thumbnailTitle">Actor 2 Name  : </span><span>{movie.actor_2_name}</span></p>
                        <p><span className="thumbnailTitle">Geners : </span><span>{movie.geners}</span></p>
                        <p><span className="thumbnailTitle">Languages  : </span><span>{movie.language}</span></p>
                        <p><span className="thumbnailTitle">Contry  : </span><span>{movie.country}</span></p>
                        <p><span className="thumbnailTitle">Content Rating  : </span><span>{movie.content_rating}</span></p>
                        <p><span className="thumbnailTitle">Budget  : </span><span>{movie.budget}</span></p>
                        <p><span className="thumbnailTitle">Title Year  : </span><span>{movie.title_year}</span></p>
                        <p><span className="thumbnailTitle">Plot Keywords  : </span><span>{movie.plot_keywords}</span></p>
                        <p><span className="thumbnailTitle">Movie IMDB Link  : </span><span><a href={movie.movie_imdb_link}>{movie.movie_imdb_link}</a></span></p>
                      </div>
                    )
                  })

                ) : (
                    <div>
                      <img src="https://media1.tenor.com/images/db85ba00c6073b451a8f05156a66524e/tenor.gif" className="thumbnail-img" />
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EdmEditor;
