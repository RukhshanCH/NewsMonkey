import './App.css';
import { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App(props) {
  const [progress, setProgress] = useState(0)
  const [country, setCountry] = useState('')
  
    return (
      <>
        <Router>
          <Navbar setCountry={setCountry} />
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          />
          <div className="container my-3">
            <Routes>
              <Route path='/' element={<News setprogress={setProgress} country={country} key="" category="" />} />
              <Route path='/business' element={<News setprogress={setProgress} country={country} key="business" category="&category=business" />} />
              <Route path='/crime' element={<News setprogress={setProgress} country={country} key="crime" category="&category=crime" />} />
              <Route path='/domestic' element={<News setprogress={setProgress} country={country} key="domestic" category="&category=domestic" />} />
              <Route path='/education' element={<News setprogress={setProgress} country={country} key="education" category="&category=education" />} />
              <Route path='/entertainment' element={<News setprogress={setProgress} country={country} key="entertainment" category="&category=entertainment" />} />
              <Route path='/environment' element={<News setprogress={setProgress} country={country} key="environment" category="&category=environment" />} />
              <Route path='/food' element={<News setprogress={setProgress} country={country} key="food" category="&category=food" />} />
              <Route path='/health' element={<News setprogress={setProgress} country={country} key="health" category="&category=health" />} />
              <Route path='/lifestyle' element={<News setprogress={setProgress} country={country} key="lifestyle" category="&category=lifestyle" />} />
              <Route path='/politics' element={<News setprogress={setProgress} country={country} key="politics" category="&category=politics" />} />
              <Route path='/science' element={<News setprogress={setProgress} country={country} key="science" category="&category=science" />} />
              <Route path='/sports' element={<News setprogress={setProgress} country={country} key="sports" category="&category=sports" />} />
              <Route path='/technology' element={<News setprogress={setProgress} country={country} key="technology" category="&category=technology" />} />
              <Route path='/tourism' element={<News setprogress={setProgress} country={country} key="tourism" category="&category=tourism" />} />
              <Route path='/world' element={<News setprogress={setProgress} country={country} key="world" category="&category=world" />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }