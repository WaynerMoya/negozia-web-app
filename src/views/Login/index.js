/* Importing the components from the antd library. */
import { Button, Form, Input, message } from 'antd';

/* Import the styles from the pages login */
import './index.css'

/* call the custom hook i created before */
import useHttp from "../../hooks/use-http";

const Login = ({ verifyAuth }) => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    const loginResponse = (response) => {

        /* if the response success is false will show a message error */
        if (!response.success) {
            message.error(response.message)
            return;
        }

        /* if the user provide the correct email and password will show a message */
        message.success(response.message)

        /* 
            Note: i'm gonna do that in this case because is only a CRUD, 
            Something important here the user can change the status of the local storage
            but i'm gonna validate that in the backend too, in the case the user is not 
            admin call a function with the role admin i am gonna remove the isAuth and 
            redirect to login agin.
        
        */

        /* add a new local storage call is auth */
        localStorage.setItem('isAuth', true)

        /* add a new local storage variable call token */
        localStorage.setItem('token', response?.response.token)

        /* call this function when the user provide a correct email and password */
        verifyAuth()

    }

    const onFinish = (values) => {

        /* make request to login  in the platform */
        requestData({
            path: '/auth/login',
            method: 'post',
            body: {
                "email": values.username,
                "password": values.password
            }
        }, loginResponse)

    };

    /**
     * If the user fails to fill out the form, the message "Missing Inputs" will appear
     * @param errorInfo - an object containing the error message and the field that caused the error.
     */
    const onFinishFailed = (errorInfo) => {
        message.error('Missing Inputs')
    };

    return (
        <div className="login">

            <div className='login-form'>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: "email", message: 'Please input a valid email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className='login-button' wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

/* Exporting the component to be used in other files. */
export default Login;