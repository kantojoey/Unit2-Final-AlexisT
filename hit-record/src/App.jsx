import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/common/Header'
import LoadingPage from './components/pages/LoadingPage'
import HomePage from './components/pages/Home/HomePage'
import ExpandedDetailsPage from './components/pages/Home/ExpandedDetailsPage'
import ListeningLogPage from './components/pages/ListeningLogPage'
import SearchPage from './components/pages/Search/SearchPage'
import AboutPage from './components/pages/AboutPage'
import ProfilePage from './components/pages/ProfilePage'
import BottomNavBar from './components/common/BottomNavBar'
import Footer from './components/common/Footer'
import { useEffect, useState } from 'react'
import ReviewPage from './components/pages/Search/ReviewPage'


// API User ID and Key for access
const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  // Album to be reviewed by user
  const [reviewedAlbum, setReviewedAlbum] = useState(null);

  // List of all album reviews for listening log
  const [albumReviews, setAlbumReviews] = useState([]);

  // Album review rating
  const [rating, setRating] = useState("");

  // Album review text
  const [reviewText, setReviewText] = useState("");

  // Album expanded details page setter
  const [expandedAlbum, setExpandedAlbum] = useState(null);

  // API access token
  const [accessToken, setAccessToken] = useState();

  // Favorite Album Array
  const [favorites, setFavorites] = useState([null, null, null, null]);

  useEffect(() => {
    let authCredentials = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", authCredentials)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
      }
      );
  }, []);

  return (
    <div id="body-container">
      <Header />
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage albumReviews={albumReviews} setExpandedAlbum={setExpandedAlbum} favorites={favorites}/>} />
        <Route path="/home/details" element={<ExpandedDetailsPage expandedAlbum={expandedAlbum}/>} />
        <Route path="/listening-log" element={<ListeningLogPage albumReviews={albumReviews} setExpandedAlbum={setExpandedAlbum}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage accessToken={accessToken} setReviewedAlbum={setReviewedAlbum} />}/>
        <Route path="/search/review" element={<ReviewPage reviewedAlbum={reviewedAlbum} setReviewedAlbum={setReviewedAlbum} setAlbumReviews={setAlbumReviews} rating={rating} setRating={setRating} reviewText={reviewText} setReviewText={setReviewText}/>} />
        <Route path="/profile" element={<ProfilePage albumReviews={albumReviews} favorites={favorites} setFavorites={setFavorites} accessToken={accessToken} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNavBar />
      <Footer />

    </div>
  )
}

export default App
