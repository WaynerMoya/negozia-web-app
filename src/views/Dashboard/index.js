/* This is importing the useEffect and useState hooks from the react library. */
import { useEffect, useState } from 'react';

/* This is importing the message component from the antd library. */
import { message } from 'antd';

/* call the custom hook i created before */
import useHttp from "../../hooks/use-http";

/* This is importing the components from the project. */
import ListUsers from '../../components/ListUsers.js/ListUsers';

import Loading from '../../components/Loading/Loading'

/* Import the styles from the pages dashboard */
import './index.css'

const Dashboard = () => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    /* this variable will be used to store the role of the user */
    const [profile, setProfile] = useState(null)

    /* this variable will be store the full name of the user logged */
    const [user, setUser] = useState(null)

    const profileUserLoggedDataResponse = (res) => {

        /* if the response success is false will show a message error */
        if (!res.success) {
            /* show a error message with the reason */
            message.error(res.message)

            /* i wanna clear the local storage */
            localStorage.clear()

            return;
        }

        /* the the role of the user logged */
        setProfile(res?.user?.role)

        setUser(res?.user?.name + ' ' + res?.user?.lastName)

    }

    /* this function will get the profile of the user */
    const fetchProfileUserLogged = () => {

        /* get the token was taken */
        const token = localStorage.getItem('token')

        /* create my header */
        var myHeaders = new Headers();

        /* add the token because that will be necessary to get success in the request */
        myHeaders.append("Authorization", "Bearer " + token);

        /* make the request */
        requestData({
            path: '/user/get-profile',
            method: 'GET',
            headers: myHeaders
        }, profileUserLoggedDataResponse)

    }

    /* call in the first render this function to get the profile of the user */
    useEffect(() => {
        fetchProfileUserLogged()
    }, [])

    return (
        <div className="dashboard">

            {profile === 'ADMIN' ?
                <ListUsers /> : (
                    <div className='customer-view'>
                        <h1 className='welcome-message'>Welcome {user}</h1>
                        <p>Soon you will have new functions...</p>
                    </div>
                )}

            {isLoading && <Loading />}
        </div>

    )
}

export default Dashboard;