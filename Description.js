import React from 'react';


const Description = ({ journalEncounterIDResult }) => {
    let description = journalEncounterIDResult['description'];
    console.log(description);

    return (
        <div>
            <p>{description}</p>

        </div>
    );
}

export default Description;