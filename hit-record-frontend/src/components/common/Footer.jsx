const Footer = () => {
    let thisYear = new Date().getFullYear();

    return (
        <>
            <footer style={{justifyContent:"center"}}>
                &copy; {thisYear} &nbsp;| &nbsp; Hit Record &nbsp; | &nbsp;
                <a href="https://github.com/kantojoey/Unit2-Final-AlexisT" style={{color:"white"}}> Visit my GitHub Repo!</a>
            </footer>
        </>
    );
};

export default Footer;
