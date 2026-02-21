const Footer = () => {
    let thisYear = new Date().getFullYear();

    return (
        <>
            <footer>
                &copy; {thisYear} | Hit Record
            </footer>
        </>
    );
};

export default Footer;
