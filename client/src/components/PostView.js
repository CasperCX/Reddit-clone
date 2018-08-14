import React from 'react';

export default (props) => {
        const { title, body } = props.location.state;
        return (
            <div>
                <h1>{title}</h1> 
                 <p>{body}</p>
            </div>
        )
};

