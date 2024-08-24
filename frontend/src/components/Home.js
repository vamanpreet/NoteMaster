import React from 'react'
import Notes from './Notes'

const Home = (props) => {
    return (
        <div className='mt-5'>
            <Notes showAlert={props.showAlert} />
        </div>
    )
}

export default Home
