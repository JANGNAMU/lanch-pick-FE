import React, { Component, useRef } from 'react';
import RouletteItems from './roulette-items'; // 룰렛

function Roulette(){

    const rouletteRef = useRef();
    console.info('rouletteRef : ', rouletteRef.current)

    return (
        <>
            <canvas className="roulette-wrap" ref={rouletteRef}>
                {/* <RouletteItems /> */}
            </canvas>
            <button type='button' className='btn-roulette' data-action='start'>PICK</button>
        </>
    );
}

export default Roulette;