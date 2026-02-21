import { Link } from "react-router";
import Card from "../../common/Card";

const ExpandedDetailsPage = ({ expandedAlbum }) => {
    return (
        <main>
            {expandedAlbum ? (
                <>
                    <span style={{display:"flex", flexDirection:"row", gap:"10px"}}>

                        <Link to="/home" style={{ color: "white" }}>
                            <h3 style={{ textDecoration: "underline" }}>Home</h3>
                        </Link>
                        <p>__</p>
                        <Link to="/listening-log" style={{ color: "white" }}>
                            <h3 style={{ textDecoration: "underline" }}>Listening Log</h3>
                        </Link>
                    </span>
                    <div className="expanded-album-details-page">
                        <Card className="album-card">
                            <img src={expandedAlbum.image} alt={expandedAlbum.albumName} title={expandedAlbum.albumName} className="album-artwork" style={{ cursor: "auto" }}></img>
                        </Card>
                        <h2><span className="data-category">Rating:</span> {expandedAlbum.rating}</h2>
                    </div>
                    <div className="expanded-album-review-content">
                        <Card className="key-album-data">
                            <Card className="album-datapoint-card">
                                <h3 className="data-heading"><span className="data-category">Title:</span> {expandedAlbum.albumName}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading"><span className="data-category">Artist:</span> {expandedAlbum.artistName}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading"><span className="data-category">Year:</span> {expandedAlbum.year}</h3>
                            </Card>
                            <Card className="album-datapoint-card ">
                                <h3 className="data-heading">{expandedAlbum.tracks} <span className="data-category">tracks</span></h3>
                            </Card>
                        </Card>
                        <Card className="user-review-card">
                            <h3 className="data-category">My Review:</h3>
                            <p>
                                {expandedAlbum.reviewText}
                            </p>
                        </Card>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/home" style={{ color: "white" }}>
                        <h2 style={{ textDecoration: "underline" }}>←Back to home</h2>
                    </Link>
                    <p style={{ textAlign: "justify", fontSize: "2rem" }}>Nothing to see here yet. Try logging an album for review to see details.</p>
                </>
            )
            }

        </main>
    );
};

export default ExpandedDetailsPage;
