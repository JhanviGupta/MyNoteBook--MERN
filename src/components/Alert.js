import React from 'react'

const Alert = (props) => {
    return (
            <div>
                {props.alert && <div className={`alert alert-${props.alert.type} alert-dismassable fade show`} role="alert">
                    {props.alert.msg}
                </div>}
            </div>
    )
}

export default Alert