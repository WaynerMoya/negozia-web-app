/* Importing the useEffect hook from the react library. */
import { useEffect } from "react";

/* Importing the components from the antd library. */
import { Button, Form, Input, message } from "antd";

/* Importing the useHttp hook from the use-http.js file. */
import useHttp from "../../hooks/use-http";

/* Importing the Loading component from the Loading folder. */
import Loading from "../Loading/Loading";

/* Importing the css file for the component. */
import './FormUser.css'

/* A constant that is used to initialize the form. */
const initialStateForm = { email: '', name: '', lastName: '', phone: '', password: '' }

const FormUser = ({ user, method = 'POST', path, handleEvent }) => {

    /* Destructuring the useHttp hook. */
    const { isLoading, error, requestData } = useHttp()

    /* Initializing the form. */
    const [form] = Form.useForm()


    const fillForm = () => {
        if (Object.keys(user).length > 0) {
            console.log(user)
            form.setFieldsValue(user)
        } else {
            form.setFieldsValue(initialStateForm)
        }
    }

    /* This is a react hook that is used to run a function when the component is mounted. */
    useEffect(() => {
        fillForm()
    }, [])


    const requestUserDataProcess = (data) => {

        /* Checking if the status code is not 200, and if it is not, it displays an error message. */
        if (!data.success) {
            message.error(data.message)
            return;
        }

        /* Displaying a success message. */
        message.success(data.message)

        /* A function that is passed as a prop to the FormCompany component. It is used to update the
        state of the parent component. */
        handleEvent()

        /* Used to reset the form. */
        form.resetFields()
    }

    /**
     * It takes the values from the form and sends a request to the server with the values
     * @param values - The values of the form
     */
    const requestUser = (values) => {

        /* get the token was taken */
        const token = localStorage.getItem('token')

        /* create my header */
        var myHeaders = new Headers();

        /* add the token because that will be necessary to get success in the request */
        myHeaders.append("Authorization", "Bearer " + token);

        /* Adding the content type to the header. */
        myHeaders.append("Content-Type", "application/json")

        requestData({
            path: path,
            method: method,
            headers: myHeaders,
            body: {
                "name": values.name,
                "lastName": values.lastName,
                "email": values.email,
                "phone": values.phone,
                "password": values.password
            }
        }, requestUserDataProcess)
    }

    /**
     * It takes the values from the form and sends them to the requestCompany function
     * @param values - The values of the form
     */
    const handleUser = (values) => {
        requestUser(values)
    }

    /**
     * If the user fails to complete the form, a message will appear saying "Please complete the
     * missing inputs"
     * @param errorInfo - an object containing the error information.
     */
    const onFinishFailed = (errorInfo) => {
        message.error('Please complete the missing inputs')
    }

    return (
        <>

            {isLoading && < Loading />}

            <Form
                onFinish={handleUser}
                onFinishFailed={onFinishFailed}
                name="control-hooks"
                form={form}
                autoComplete="off"
                layout="vertical"
            >

                <Form.Item
                    label="User name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input user name' },
                        { min: 3, message: 'Please enter a name min 3 characters' }
                    ]}
                    className="input-user">
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    label="User last name"
                    name="lastName"
                    rules={[
                        { required: true, message: 'Please input lastName' },
                        { min: 3, message: 'Please enter last name min 3 characters' }
                    ]} className="input-user">
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    label="User Phone"
                    name="phone"
                    rules={[
                        { required: true, message: 'Please input user phone' },
                        { len: 10, message: 'Please phone must be 10 characters' },
                    ]}
                    className="input-user">
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="User Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input user email ' },
                        { type: "email", message: 'Please input a valid email' }
                    ]}
                    className="input-user">
                    <Input type="email" disabled={method === 'PUT'} />
                </Form.Item>

                <Form.Item
                    label="User Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input user password' },
                        { min: 8, message: 'Please password must be 8 characters' },
                    ]}
                    className="input-user">
                    <Input type="password" />
                </Form.Item>

                <div className="button-user">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

/* Exporting the component to be used in other files. */
export default FormUser;