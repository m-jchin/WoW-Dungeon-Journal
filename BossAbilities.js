import React from 'react';
import './bossabilities.css';

const BossAbilities = ({ journalEncounterIDResult }) => {

    console.log(journalEncounterIDResult['sections'])
    //let sections = journalEncounterIDResult['sections'][0]['title'];
    let sections = journalEncounterIDResult['sections'].map(ability => {
        if (ability['sections']) {
            return (
                <div>
                    <h2>{ability['title']}</h2>
                    <div>{ability['body_text']}</div>
                    <div>
                        {ability['sections'].map(subAbility =>
                            <span>
                                <h3 className='subAbility'>{subAbility['title']}</h3>
                                <span>{subAbility['body_text']}</span>
                            </span>
                        )}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h2>{ability['title']}</h2>
                    <span>{ability['body_text']}</span>

                </div>
            )
        }
    });

    return (
        <div>
            {
                <div>{sections}</div>
            }
        </div>
    );
}

export default BossAbilities