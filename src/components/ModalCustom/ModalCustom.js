/* Importing the Modal component from the antd library. */
import { Modal } from "antd";

/**
 * It's a modal that takes in a title, a boolean to determine if it's visible, a function to set the
 * visibility, and children to render inside the modal
 * @returns A modal component that is being rendered.
 */
const ModalCustom = ({
    /* It's destructuring the props that are being passed into the component. */
    isModalVisible,
    setIsModalVisible,
    children,
    title = 'Edit'
}) => {

    /**
     * The function handleCancel() is called when the user clicks the Cancel button in the modal
     */
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /* It's returning a modal component that is being rendered. */
    return (
        <Modal footer={null} title={title} visible={isModalVisible} onCancel={handleCancel}>
            {children}
        </Modal>
    )
}

/* Exporting the component so that it can be imported in other files. */
export default ModalCustom