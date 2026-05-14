import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0
  }
  setprogress = (progress) => {
    this.setState ({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            height={3}
          />
          <div className="container my-3">
            <Routes>
              <Route path='/' element={<News setprogress={this.setprogress} key="" category="" />} />
              <Route path='/business' element={<News setprogress={this.setprogress} key="business" category="&category=business" />} />
              <Route path='/crime' element={<News setprogress={this.setprogress} key="crime" category="&category=crime" />} />
              <Route path='/domestic' element={<News setprogress={this.setprogress} key="domestic" category="&category=domestic" />} />
              <Route path='/education' element={<News setprogress={this.setprogress} key="education" category="&category=education" />} />
              <Route path='/entertainment' element={<News setprogress={this.setprogress} key="entertainment" category="&category=entertainment" />} />
              <Route path='/environment' element={<News setprogress={this.setprogress} key="environment" category="&category=environment" />} />
              <Route path='/food' element={<News setprogress={this.setprogress} key="food" category="&category=food" />} />
              <Route path='/health' element={<News setprogress={this.setprogress} key="health" category="&category=health" />} />
              <Route path='/lifestyle' element={<News setprogress={this.setprogress} key="lifestyle" category="&category=lifestyle" />} />
              <Route path='/politics' element={<News setprogress={this.setprogress} key="politics" category="&category=politics" />} />
              <Route path='/science' element={<News setprogress={this.setprogress} key="science" category="&category=science" />} />
              <Route path='/sports' element={<News setprogress={this.setprogress} key="sports" category="&category=sports" />} />
              <Route path='/technology' element={<News setprogress={this.setprogress} key="technology" category="&category=technology" />} />
              <Route path='/top' element={<News setprogress={this.setprogress} key="top" category="&category=top" />} />
              <Route path='/tourism' element={<News setprogress={this.setprogress} key="tourism" category="&category=tourism" />} />
              <Route path='/world' element={<News setprogress={this.setprogress} key="world" category="&category=world" />} />
              <Route path='/other' element={<News setprogress={this.setprogress} key="other" category="&category=other" />} />
            </Routes>
          </div>
        </Router>
      </div>
    )
  }
}

