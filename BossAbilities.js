import React from 'react';
import './bossabilities.css';

const BossAbilities = ({ abilities }) => {
    if (!abilities) return null;

    // console.log(abilities);
    let sections = abilities.map(ability => {
        if (ability['sections']) { // for subsections
            return (
                <div >
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
                <div >
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