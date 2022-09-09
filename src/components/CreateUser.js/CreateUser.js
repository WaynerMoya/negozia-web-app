
/* Importing the useState hook from the react library. */
import { useState } from "react";

/* Importing the Button component from the antd library. */
import { Button } from "antd";

import ModalCustom from "../../components/ModalCustom/ModalCustom";

import FormUser from "../../components/FormUser/FormUser";

const CreateUser = ({ getUsers }) => {

    /* Creating a state variable called isModalVisible and setting it to false. */
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    /**
     * When the modal is closed, the modal is set to invisible and the companies are fetched again
     */
    const handleClose = () => {
        setIsModalVisible(false)
        getUsers()
    }

    return (
        <div className="create-company">

            <Button
                htmlType="button"
                type="primary"
                onClick={showModal}
            >
                +
            </Button>

            <ModalCustom
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                title="Create User"
            >
                <FormUser
                    path="/user/create-user"
                    user={{}}
                    handleEvent={handleClose}
                />
            </ModalCustom>
        </div>
    )

}

/* Exporting the CreateUser component. */
export default CreateUser;