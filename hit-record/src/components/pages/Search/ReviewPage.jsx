import { Link, useNavigate } from "react-router";
import Card from "../../common/Card";
import Button from "../../common/Button";
import { useEffect, useRef } from "react";

const ReviewPage = ({ reviewedAlbum, setReviewedAlbum, setAlbumReviews, rating, setRating, reviewText, setReviewText }) => {

    let navigate = useNavigate();

    const saveAlbumReview = () => {

        if (!rating || !reviewText.trim()) {
            return;
        };


        const newReview = {
            albumId: reviewedAlbum.id,
            image: reviewedAlbum.images[0].url,
            albumName: reviewedAlbum.name,
            artistName: reviewedAlbum.artists[0].name,
            year: reviewedAlbum.release_date.slice(0, 4),
            tracks: reviewedAlbum.total_tracks,
            rating,
            reviewText,
        };


        setAlbumReviews(prevReviews => [newReview, ...prevReviews]);
        navigate("/search");
        setRating("");
        setReviewText("");
        setReviewedAlbum(null);
    };

    const cancelAlbumReview = () => {

        navigate("/search");
        setRating("");
        setReviewText("");
        setReviewedAlbum(null);
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()

        }
    }, []);

    return (
        <main>
            {reviewedAlbum ? (
                <>
                    <Link to="/search" style={{ color: "white" }}>
                        <h3 style={{ textDecoration: "underline" }}>←Back</h3>
                    </Link>
                    <div className="review-page-container">
                        <div className="selected-album-review-data">
                            <Card className="album-card-no-pointer">
                                <img src={reviewedAlbum.images[0].url} alt={reviewedAlbum.name} title={reviewedAlbum.name} className="album-artwork"></img>
                            </Card>
                            <h3>{reviewedAlbum.name}</h3>
                            <h3>{reviewedAlbum.artists[0].name}</h3>
                            <h3>{reviewedAlbum.release_date.slice(0, 4)}</h3>
                        </div>
                        <div className="album-review-entry">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                saveAlbumReview();
                            }}>
                                <div className="rating-entry">
                                    <h2>Rating</h2>
                                    <select id="album-rating-selector"
                                        name="rating"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        required>
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
                                        onChange={(e) => setReviewText(e.target.value)}
                                        ref={inputRef}
                                        required
                                    />
                                    <div className="submit-options">
                                        <input
                                            type="submit" value="Submit" />
                                        <Button onClick={cancelAlbumReview}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/search" style={{ color: "white" }}>
                        <h3 style={{ textDecoration: "underline" }}>←Back</h3>
                    </Link>
                    <p style={{ textAlign: "justify", fontSize: "2rem" }}>Nothing to see here yet. Return to the search page to select an album for review.</p>
                </>
            )}
        </main>
    );
};

export default ReviewPage;
