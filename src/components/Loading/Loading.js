/* Importing the React library from the node_modules folder. */
import React from 'react'

/* Importing the loading icon from the ant design library. */
import { LoadingOutlined } from '@ant-design/icons';

/* Importing the CSS file for the Loading component. */
import './Loading.css'

/**
 * It returns a div with a loading icon
 * @returns A div with a loading icon
 */
const Loading = () => {
    return (
        <div className='loading-container'>
            <LoadingOutlined />
        </div>
    )
}

/* Exporting the Loading component so that it can be used in other files. */
export default Loading