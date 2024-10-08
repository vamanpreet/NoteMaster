import React from 'react'

const Alert = (props) => {
    return (
        <div style={{height: '1rem'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show text-center`} role='alert'>
                <strong>{props.alert.msg}</strong>
            </div>}
        </div>
    )
}

export default Alert
