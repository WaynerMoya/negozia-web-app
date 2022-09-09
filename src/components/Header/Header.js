
/* Importing the LogoutOutlined icon from the ant design library. */
import {
    LogoutOutlined
} from '@ant-design/icons'

/* Importing the message component from the ant design library. */
import { message } from 'antd';

/* call the custom hook i created before */
import useHttp from "../../hooks/use-http";

/* Importing the CSS file for the Header component. */
import './Header.css'

/**
 * It returns a header element with an image element inside of it
 * @returns A header with an image of the logo.
 */
const Header = ({ isAuth, verifyAuth }) => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    const logoutDataResponse = (response) => {
        if (!response.success) {
            message.error(response.message)
            return;
        }

        /* clear the variable in local storage */
        localStorage.clear()

        /* show a success message  */
        message.success(response.message)

        verifyAuth()

    }

    const onHandleLogout = () => {

        /* get the token was taken */
        const token = localStorage.getItem('token')

        /* create my header */
        var myHeaders = new Headers();

        /* add the token because that will be necessary to get success in the request */
        myHeaders.append("Authorization", "Bearer " + token);

        /* make request to login  in the platform */
        requestData({
            path: '/auth/logout',
            method: 'get',
            headers: myHeaders
        }, logoutDataResponse)
    }

    return (
        /* Creating a header element with an image element inside of it. */
        <header className="header">
            {isAuth &&
                <button className='button-logout'>
                    <LogoutOutlined className='logout' onClick={onHandleLogout} />
                </button>
            }
        </header>
    )
}

/* Exporting the Header component so that it can be used in other files. */
export default Header;