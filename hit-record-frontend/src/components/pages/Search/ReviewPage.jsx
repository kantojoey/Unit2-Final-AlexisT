import { Link, useLocation, useNavigate, useParams } from "react-router";
import Card from "../../common/Card";
import Button from "../../common/Button";
import { useEffect, useRef } from "react";

const ReviewPage = ({
    reviewedAlbum,
    setReviewedAlbum,
    setAlbumReviews,
    rating,
    setRating,
    reviewText,
    setReviewText
}) => {

    const navigate = useNavigate();
    // postID from url parameter
    const { postId } = useParams();
    // retrieves sent state from navigate()
    const location = useLocation();
    // accesses state field of location() and checks if the post object exists
    // if post object is empty, gives null value so app doesn't crash
    const postToEdit = location.state?.post;

    // derived boolean shorthand value; determines if "editing" is true or false (new post)
    const isEditing = !!postId;
    // sets method and url based on edit vs create status
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `http://localhost:8080/posts/${postId}` : "http://localhost:8080/posts";

    // Normalize album data so UI always has same fields regardless of if the object is reviewedAlbum (frontend Spotify data structure) or postToEdit (backend DTO structure)
    const album = reviewedAlbum
        // if this is a new review, reviewedAlbum is set and this becomes the album object
        ? {
            title: reviewedAlbum.name,
            artist: reviewedAlbum.artists[0].name,
            year: reviewedAlbum.release_date.slice(0, 4),
            image: reviewedAlbum.images[0].url,
            totalTracks: reviewedAlbum.total_tracks,
            spotifyId: reviewedAlbum.id
        }
        : postToEdit
            // if this is an edited review, it pulls the values from the backend DTO structure fields
            ? {
                title: postToEdit.album.title,
                artist: postToEdit.album.artist,
                year: postToEdit.album.yearReleased,
                image: postToEdit.image,
                totalTracks: postToEdit.album.numberOfTracks,
                spotifyId: postToEdit.album.spotifyAlbumId
            }
            : null;

    // Pre-fill review text if editing with existing review value
    useEffect(() => {
        if (postToEdit) {
            setReviewText(postToEdit.reviewText);
        }
    }, [postToEdit, setRating, setReviewText]);

    // Focus review text box on load
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const saveAlbumReview = async () => {
        const userId = 1; // placeholder until user login is set up

        if (!rating || !reviewText.trim()) return;

        // Sent to backend
        const responseBody = {
            rating: rating.length,
            reviewText,
            userId,
            album: {
                title: album.title,
                artist: album.artist,
                yearReleased: parseInt(album.year),
                numberOfTracks: album.totalTracks,
                spotifyAlbumId: album.spotifyId
            }
        };

        const albumPostParams = {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(responseBody)
        };

        try {
            const response = await fetch(url, albumPostParams);
            // null is the replacer, 2 is the space (makes the JSON more readable by adding 2 spaces)
            console.log(`${method === "PUT" ? "Updating" : "Posting"} review:`, JSON.stringify(responseBody, null, 2));

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const savedPost = await response.json();

            const newReview = {
                ...savedPost,
                image: album.image,
                rating
            };
            
            console.log(`Successfully ${method === "PUT" ? "updated" : "posted"} review:`,JSON.stringify(newReview, null, 2));

            setAlbumReviews(prevReviews => {
                if (isEditing) {
                    // Replace the existing review with the same post ID if found
                    return prevReviews.map(review => review.id === savedPost.id ? newReview : review);
                } else {
                    // Adds new review to previous reviews array as the most recent
                    return [newReview, ...prevReviews];
                }
            });
            navigate("/search");
            setRating("");
            setReviewText("");
            setReviewedAlbum(null);

        } catch (error) {
            console.error("Failed to post review:", error);
        }
    };

    const cancelAlbumReview = () => {
        navigate("/search");
        setRating("");
        setReviewText("");
        setReviewedAlbum(null);
    };

    if (!album) {
        return (
            <main>
                <Link to="/search" style={{ color: "white" }}>
                    <h3 style={{ textDecoration: "underline" }}>←Back</h3>
                </Link>
                <p style={{ textAlign: "justify", fontSize: "2rem" }}>
                    Nothing to see here yet. Return to the search page to select an album for review.
                </p>
            </main>
        );
    }

    return (
        <main>
            <Link to="/search" style={{ color: "white" }}>
                <h3 style={{ textDecoration: "underline" }}>←Back</h3>
            </Link>

            <div className="review-page-container">
                <div className="selected-album-review-data">
                    <Card className="album-card-no-pointer">
                        <img src={album.image} alt={album.title} title={album.title} className="album-artwork" />
                    </Card>
                    <h3>{album.title}</h3>
                    <h3>{album.artist}</h3>
                    <h3>{album.year}</h3>
                </div>

                <div className="album-review-entry">
                    <form onSubmit={e => { e.preventDefault(); saveAlbumReview(); }}>
                        <div className="rating-entry">
                            <h2>Rating</h2>
                            <select
                                id="album-rating-selector"
                                name="rating"
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a rating</option>
                                <option value="★">★</option>
                                <option value="★★">★★</option>
                                <option value="★★★">★★★</option>
                                <option value="★★★★">★★★★</option>
                                <option value="★★★★★">★★★★★</option>
                            </select>
                        </div>

                        <div className="review-entry">
                            <h2>Review:</h2>
                            <textarea
                                className="album-review-input-content"
                                placeholder="Write review here..."
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                                ref={inputRef}
                                required
                            />
                            <div className="submit-options">
                                <Button type="button" onClick={cancelAlbumReview}>Cancel</Button>
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ReviewPage;
// import { Link, useLocation, useNavigate, useParams } from "react-router";
// import Card from "../../common/Card";
// import Button from "../../common/Button";
// import { useEffect, useRef } from "react";

// const ReviewPage = ({ reviewedAlbum, setReviewedAlbum, setAlbumReviews, rating, setRating, reviewText, setReviewText }) => {

//     let navigate = useNavigate();
//     const { postId } = useParams();
//     const location = useLocation();
//     console.log(location);
//     const postToEdit = location.state?.post;

//     // Derived boolean
//     const isEditing = !!postId;

//     // Method dependent on if this is an edit or create post
//     const method = isEditing ? "PUT" : "POST";

//     // url dependent on if this is an edit or create post
//     const url = isEditing ? `http://localhost:8080/posts/${postId}` : "http://localhost:8080/posts";

//     // Allows the save function to work either for a new entry (reviewedAlbum) or an update (postToEdit)
//     const album = reviewedAlbum || postToEdit.album;

//     useEffect(() => {
//         if (postToEdit) {
//             setRating("★".repeat(postToEdit.rating));
//             setReviewText(postToEdit.reviewText);
//         }
//     }, [postToEdit, setRating, setReviewText]);

//     const saveAlbumReview = async () => {

//         const userId = 1; // Placeholder for user ID, replace with actual user ID when available

//         if (!rating || !reviewText.trim()) {
//             return;
//         };

//         const responseBody = {
//             rating: rating.length,
//             reviewText,
//             userId,
//             album: {
//                 // album.[field] will pull either from reviewedAlbum or postToEdit
//                 title: album.name,
//                 artist: album.artists[0].name,
//                 yearReleased: parseInt(album.release_date.slice(0, 4)),
//                 numberOfTracks: album.total_tracks,
//                 spotifyAlbumId: album.id
//             }

//         };

//         let albumPostParams = {
//             method,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(responseBody)
//         };

//         try {
//             const response = await fetch(url, albumPostParams);

//             if (method === "PUT") {
//                 console.log("Updating review:", JSON.stringify(responseBody, null, 2));
//             }

//             if (method === "POST") {
//                 console.log("Posting review:", JSON.stringify(responseBody, null, 2));
//             }

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const savedPost = await response.json();

//             const newReview = {
//                 ...savedPost,
//                 image: reviewedAlbum.images[0].url,
//                 // Overrides response body rating with star version for display purposes
//                 rating
//             }
//             // const newReview = {
//             // spotifyAlbumId: reviewedAlbum.id,
//             // image: reviewedAlbum.images[0].url,
//             // title: reviewedAlbum.name,
//             // artist: reviewedAlbum.artists[0].name,
//             // yearReleased: reviewedAlbum.release_date.slice(0, 4),
//             // numberOfTracks: reviewedAlbum.total_tracks,
//             // rating,
//             // reviewText,
//             // };


//             setAlbumReviews(prevReviews => [newReview, ...prevReviews]);
//             navigate("/search");
//             setRating("");
//             setReviewText("");
//             setReviewedAlbum(null);
//         }
//         catch (error) {
//             console.error("Failed to post review:", error);
//         };
//     };

//     const cancelAlbumReview = () => {

//         navigate("/search");
//         setRating("");
//         setReviewText("");
//         setReviewedAlbum(null);
//     };

//     const inputRef = useRef(null);

//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.focus()

//         }
//     }, []);

//     return (
//         <main>
//             {album ? (
//                 <>
//                     <Link to="/search" style={{ color: "white" }}>
//                         <h3 style={{ textDecoration: "underline" }}>←Back</h3>
//                     </Link>
//                     <div className="review-page-container">
//                         <div className="selected-album-review-data">
//                             <Card className="album-card-no-pointer">
//                                 <img src={reviewedAlbum ? reviewedAlbum.images[0].url : postToEdit.image} alt={album.name} title={album.name} className="album-artwork"></img>
//                             </Card>
//                             <h3>{album.name}</h3>
//                             <h3>{album.artists[0].name}</h3>
//                             <h3>{album.release_date.slice(0, 4)}</h3>
//                         </div>
//                         <div className="album-review-entry">
//                             <form onSubmit={(e) => {
//                                 e.preventDefault();
//                                 saveAlbumReview();
//                             }}>
//                                 <div className="rating-entry">
//                                     <h2>Rating</h2>
//                                     <select id="album-rating-selector"
//                                         name="rating"
//                                         value={rating}
//                                         onChange={(e) => setRating(e.target.value)}
//                                         required>
//                                         <option value="" disabled>Select a rating</option>
//                                         <option value="★">★</option>
//                                         <option value="★★">★★</option>
//                                         <option value="★★★">★★★</option>
//                                         <option value="★★★★">★★★★</option>
//                                         <option value="★★★★★">★★★★★</option>
//                                     </select>
//                                 </div>
//                                 <div className="review-entry">
//                                     <h2>Review:</h2>
//                                     <textarea
//                                         className="album-review-input-content"
//                                         placeholder="Write review here..."
//                                         value={reviewText}
//                                         onChange={(e) => setReviewText(e.target.value)}
//                                         ref={inputRef}
//                                         required
//                                     />
//                                     <div className="submit-options">
//                                         <Button type="button" onClick={cancelAlbumReview}>
//                                             Cancel
//                                         </Button>
//                                         <input
//                                             type="submit" value="Submit" />
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <Link to="/search" style={{ color: "white" }}>
//                         <h3 style={{ textDecoration: "underline" }}>←Back</h3>
//                     </Link>
//                     <p style={{ textAlign: "justify", fontSize: "2rem" }}>Nothing to see here yet. Return to the search page to select an album for review.</p>
//                 </>
//             )}
//         </main>
//     );
// };

// export default ReviewPage;
