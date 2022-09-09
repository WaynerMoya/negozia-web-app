
/* Importing the useEffect and useState hooks from the React library. */
import { useEffect, useState } from 'react';

/* Importing the Button, Space, Table, and message components from the antd library. */
import { Button, Space, Table, message } from "antd";

/* Importing the Loading, CreateUser, ModalCustom, and FormUser components from the respective files. */
import Loading from '../Loading/Loading';

import CreateUser from '../CreateUser.js/CreateUser';

import ModalCustom from '../ModalCustom/ModalCustom';

import FormUser from '../FormUser/FormUser';

/* Importing the useHttp hook from the use-http.js file. */
import useHttp from "../../hooks/use-http";

/* Importing the CSS file for the ListUsers component. */
import './ListUsers.css'

const ListUsers = () => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    /* this variable will store the users after request */
    const [users, setUsers] = useState([])

    /* A state variable that is used to control the visibility of the modal. */
    const [isModalVisible, setIsModalVisible] = useState(false);

    /* this variable will store user selected */
    const [userSelected, setUserSelected] = useState(null)

    const handleEdit = (user) => {
        setIsModalVisible(true);
        setUserSelected(user)
    }

    const handleClose = () => {
        setIsModalVisible(false)
        setUserSelected(null)
        requestGetUsers()
    }

    /* here will get the response from the function requestGetUsers then it need to process */
    const getUsersDataResponse = (response) => {
        if (!response.success) {
            message.error(response.message)
            return;
        }
        setUsers(response.users)
    }

    /* this function will be used to get all user from server */
    const requestGetUsers = () => {
        /* get the token was taken */
        const token = localStorage.getItem('token')

        /* create my header */
        var myHeaders = new Headers();

        /* add the token because that will be necessary to get success in the request */
        myHeaders.append("Authorization", "Bearer " + token);

        requestData({ path: '/user/get-users', method: 'GET', headers: myHeaders }, getUsersDataResponse)
    }

    /* It's a hook that is called when the component is mounted. */
    useEffect(() => {
        requestGetUsers()
    }, [])

    const deleteUserDataResponse = (response) => {
        /* if the response success is false will show a message error */
        if (!response.success) {
            message.error(response.message)
            return;
        }

        /* if the user provide the correct email and password will show a message */
        message.success(response.message)

        /* we can call this function to update list user */
        requestGetUsers()
    }

    const onHandleDeleteUser = (id) => {
        /* get the token was taken */
        const token = localStorage.getItem('token')

        /* create my header */
        var myHeaders = new Headers();

        /* add the token because that will be necessary to get success in the request */
        myHeaders.append("Authorization", "Bearer " + token);

        requestData({ path: '/user/delete-user-by-id/' + id, method: 'DELETE', headers: myHeaders }, deleteUserDataResponse)
    }

    /* This is the columns of the table. */
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'User Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'User Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'User Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, user) => (
                <Space>
                    <Button htmlType="button" type="default" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button htmlType="button" type="danger" disabled={user.role === 'ADMIN'} onClick={() => onHandleDeleteUser(user.id)}>Delete</Button>
                </Space>
            )
        }
    ];

    return (
        <div className='list-user'>
            <div className='list-user-principal'>
                <h1 className='title-user-list'>Users List</h1>
                <div className="create-user-component">
                    < CreateUser getUsers={requestGetUsers} />
                </div>

            </div>
            <div className='table-users'>
                <Table columns={columns} dataSource={users} pagination={{ pageSize: 4 }} />
            </div>

            {
                userSelected && isModalVisible && (
                    <ModalCustom isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} title="Edit User" >
                        <FormUser user={userSelected} method='PUT' handleEvent={handleClose} path={`/user/update-user-by-id/${userSelected && userSelected.id}`} />
                    </ModalCustom>
                )
            }

            {isLoading && <Loading />}

        </div>
    )
}

/* Exporting the ListUsers component so that it can be used in other files. */
export default ListUsers;