import React from 'react';
import './bossabilities.css';

const BossAbilities = ({ abilities }) => {
    if (!abilities) return null;

    let sections = abilities.map(ability => {
        if (ability['sections']) { // for subsections
            return (
                <div className='infoFont'>
                    <h2 className='setColor'>{ability['title']}</h2>
                    <div >{ability['body_text']}</div>
                    <div>
                        {ability['sections'].map(subAbility =>
                            <span>
                                <h3 className='setColor' >{subAbility['title']}</h3>
                                <span className='setColor'>{subAbility['body_text']}</span>
                            </span>
                        )}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div >
                    <h2 className='setColor'>{ability['title']}</h2>
                    <span className='setColor'>{ability['body_text']}</span>
                </div>
            )
        }
    });

    return (
        <div>{sections}</div>
    );
}

export default BossAbilities