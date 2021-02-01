import React from 'react';
import { useState } from 'react';

const SignOut = () => {
    const [signOutClicked, setSignOutClicked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            {!signOutClicked && <form id='form' onSubmit={(e) => handleSubmit(e)} >
                <input type="submit" value="Sign In" />
            </form>}
        </div>
    );
}

export default SignOut;