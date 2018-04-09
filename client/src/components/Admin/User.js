import React from 'react';

export const User = (props) => {
    console.log(props);
    return (
        <div className="user_container">
            <div className="avatar">
            <img alt="avatar" src="/images/avatar.png" />
            </div>
            <div className="nfo">
            <div><span>Name: </span>{props.auth.user && props.auth.user.firstName}</div>
            <div><span>Last Name: </span>{props.auth.user && props.auth.user.lastName}</div>
            <div><span>Email: </span>{props.auth.user && props.auth.user.email}</div>
            </div>
        </div>
    )
}

export default User;