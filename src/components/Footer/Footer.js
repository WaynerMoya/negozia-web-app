/* Importing the css file for the component. */
import './Footer.css'

/**
 * It returns a footer with a name and rights
 * @returns A footer with the name of the author and the rights reserved.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-name'>
                Wayner Moya
            </div>
        </footer>
    )
}

/* Exporting the component to be used in other files. */
export default Footer;