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
import ProtectedRoute from './components/pages/ProtectedRoute'
import { useAuth } from './components/contexts/AuthContext'
import LoggedInRoute from './components/pages/LoggedInRoute'
import ScrollToTop from './components/ScrollToTop'


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

  // Expanded album review details
  const [expandedAlbumReview, setexpandedAlbumReview] = useState(null);

  // API access token
  const [accessToken, setAccessToken] = useState();

  // Favorite Album Array limited to 4 objects
  const [favorites, setFavorites] = useState([null, null, null, null]);

  // Gets the logged in user object that will be used with useEffect() to fetch stored favorites + reviews
  const { authUser } = useAuth();

  // Gets API access token by posting client id + key
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

  // Fetches favorite albums on sign in
  useEffect(() => {

    const fetchFavorites = async () => {

      // Returns if no user is logged in
      if (!authUser) {
        return;
      }

      let fetchParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }

      try {

        const response = await fetch(`http://localhost:8080/favorites/user/${authUser.id}`, fetchParams);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const fetchedAlbumReviews = await response.json();

        // Creating copy of array to avoid modifying original array from API response
        const limitedFourFavorites = [...fetchedAlbumReviews];

        while (limitedFourFavorites.length < 4) {
          limitedFourFavorites.push(null);
        }

        setFavorites(limitedFourFavorites);
      } catch (error) {
        console.error("Failed to fetch favorite albums,", error);
      }

    }

    fetchFavorites();

  }, [authUser]);

  // Fetches stored reviews on login
  useEffect(() => {

    const fetchUserReviews = async () => {

      if (!authUser) {
        return;
      }

      let fetchParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }

      const response = await fetch(`http://localhost:8080/posts/user/${authUser.id}`, fetchParams);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const fetchedAlbumReviews = await response.json();

      // Reverse order so most recent load first
      setAlbumReviews(fetchedAlbumReviews.reverse());

    }

    fetchUserReviews();

  }, [authUser]);

  return (
    <div id="body-container">
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={
          <LoggedInRoute>
        <LoadingPage />
        </LoggedInRoute>} /> 
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage albumReviews={albumReviews} setexpandedAlbumReview={setexpandedAlbumReview} favorites={favorites} />
          </ProtectedRoute>} />
        <Route path="/home/details" element={
          <ProtectedRoute>
            <ExpandedDetailsPage expandedAlbumReview={expandedAlbumReview} setAlbumReviews={setAlbumReviews} />
          </ProtectedRoute>} />
        <Route path="/listening-log" element={
          <ProtectedRoute>
            <ListeningLogPage albumReviews={albumReviews} setexpandedAlbumReview={setexpandedAlbumReview} setAlbumReviews={setAlbumReviews} />
          </ProtectedRoute>} />
        <Route path="/about" element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>} />
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchPage accessToken={accessToken} setReviewedAlbum={setReviewedAlbum} />
          </ProtectedRoute>} />
        <Route path="/search/review" element={
          <ProtectedRoute>
            <ReviewPage reviewedAlbum={reviewedAlbum} setReviewedAlbum={setReviewedAlbum} setAlbumReviews={setAlbumReviews} rating={rating} setRating={setRating} reviewText={reviewText} setReviewText={setReviewText} />
          </ProtectedRoute>} />
        <Route path="/search/review/:postId" element={
          <ProtectedRoute>
            <ReviewPage reviewedAlbum={reviewedAlbum} setReviewedAlbum={setReviewedAlbum} setAlbumReviews={setAlbumReviews} rating={rating} setRating={setRating} reviewText={reviewText} setReviewText={setReviewText} />
          </ProtectedRoute>} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage albumReviews={albumReviews} favorites={favorites} setFavorites={setFavorites} accessToken={accessToken} />
          </ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNavBar />
      <Footer />
    </div>
  )
}

export default App
