import dummy from './dummy.json'
import React, { Component, useRef } from 'react';
import './app.css';
import { createRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import Title from './components/title';       // 타이틀
// import Category from './components/category'; // 카테고리
// import Contents from './components/contents'; // 룰렛 / 버튼

const links = {
  Local : 'https://jsonplaceholder.typicode.com/comments',
  Dev : 'http://3.39.47.35/pickmenu/all',
  Stg : '',
  Prod : ''
}


/**
 * API 통신을 위한 함수
 * @param {string}  categoryCode    메뉴 카테고리 번호(01 : 밥 | 02 : 면 | 03 : 국물/찌개 | 04 : 간편식 | 05 : 고기 | 06 : 기타)
 * @returns {JSON}  JSON    메뉴 정보를 담은 JSON 반환
 */
const getData = async (categoryCode) => {
  const res = await fetch(
    links.Dev
  ).then((res) => res.json());

  console.info('categoryCode : ', categoryCode ,'\n res : ', res);
}

/* 로컬 json 파일과 통신 
const getData = () => {
  console.info('categoryCode :', dummy)
}
*/


function App(){
  let roulette;
  let rouletteRef = createRef();
  let ctx;

  useEffect( () => {
    roulette = rouletteRef.current;
    ctx = roulette.getContext("2d");
    console.info('rouletteRef : ', rouletteRef)
  })

  /* 렌더링 되는 화면 */
  return (
    <>
      <div className="title-wrap">
          <h1 className='title'></h1>
      </div>
      <ul className='category-wrap'>
          <li data-category="all" className="category pick">전체</li>
          <li data-category="01" className="category">밥</li>
          <li data-category="02" className="category">면</li>
          <li data-category="03" className="category">국∙찌개</li>
          <li data-category="04" className="category">간편</li>
          <li data-category="05" className="category">고기</li>
      </ul>
      <div className='contents-wrap'>
        <div 
          className="roulette-wrap"
          data-state="ready"
        >
          <canvas className='roulette' ref={rouletteRef}>

          </canvas>
        </div>
        <button 
          type='button'
          className='btn-roulette'
          data-action='start'
          onClick={ e => getData() }
        ></button>
      </div>
    </>
  )
}



export default App;