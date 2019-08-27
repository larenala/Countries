import React from 'react';

const Form = ({onChange }) => {
    return (
        <div>
            <form>
                <input type="text" onChange={onChange} />
            </form>
        </div>        
    )
}

export default Form;