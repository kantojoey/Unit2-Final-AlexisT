import VinylRecord from "../images/VinylRecord.png"

const AboutPage = () => {
    return (
        <main>
            <section className="about-divider">
                <div className="about-section-heading-and-image">
                    <h2>About Hit Record</h2>
                    <img src={VinylRecord} alt="Vinyl record stock image" title="Vinyl record stock image" className="album-artwork"></img>
                </div>
                <p>Hit Record is a simple album-reviewing application built with React and powered by Spotify's public API service. This app allows for users to search for albums, view their key data points (such as title and release year), and leave a rating and review. In addition, the app provides extra customization by allowing users to display their four favorite albums on their profile for all to see.
                    <ul style={{ alignItems: "center" }}>
                        <li>Listen</li>
                        <li>Review</li>
                        <li>Hit Record</li>
                    </ul>
                    We'll handle the rest!
                </p>
            </section>
        </main>
    );
};

export default AboutPage;
