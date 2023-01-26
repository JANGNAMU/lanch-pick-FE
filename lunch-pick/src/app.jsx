import React, { Component, useRef } from 'react';
import './app.css';
import { createRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const links = {
  Local : 'localhost:9090',
  Dev : 'http://3.39.47.35:9090/pickmenu',
  Stg : '',
  Prod : ''
}

let selectedCategory = ['all'];

const startRoulette = () => {
  let endpointParam = selectedCategory.includes('all') ? 
  `/all` : `?categoryCode=${selectedCategory.join(',')}`
  
  console.info('선택되어 있는 카테고리 : ', endpointParam)
  getMenuData(endpointParam)
}

/**
 * API 통신을 위한 함수
 * @param {string}  categoryCode    메뉴 카테고리 번호(01 : 밥 | 02 : 면 | 03 : 국물/찌개 | 04 : 간편식 | 05 : 고기 | 06 : 기타)
 * @returns {JSON}  JSON    메뉴 정보를 담은 JSON 반환
 */
const getMenuData = async (categoryCode) => {
  const res = await fetch(
    links.Dev + categoryCode
  ).then((res) => res.json());

  console.info('categoryCode : ', categoryCode);
  lunchPick(res)
}

/**
 * 선택된 카테고리 코드 배열을 받아 결과 표출을 위해 전달
 * @param {Array} resultArray 선택된 카테고리의 Code 배열
 */
function lunchPick(resultArray){
  const randomNum = Math.floor(Math.random() * resultArray.length);
  console.info('API 통신값 : ', resultArray, resultArray[randomNum].MENU_NAME)

  alert('▶︎ 오늘의 Pick ◀︎ \n' + resultArray[randomNum].MENU_NAME )
}

function handleCategory(e){
  const target = e.target;
  const categoryCode = target.getAttribute('data-category');
  const categories = document.querySelectorAll('.category-wrap > li')
  const allCategory = document.querySelector('li[data-category=all]')
  const isAll = categoryCode === 'all'

  console.info('target : ', target, categoryCode, '\n categories : ', categories);
  let currentSelected = [];
  
  if(isAll){
    categories.forEach(item => item.classList.remove('pick'))
    target.classList.add('pick')
  } else {
    target.classList.value.indexOf('pick') > -1 ?
      target.classList.remove('pick') :
      target.classList.add('pick');

    [...categories].filter( cate => cate.classList.value.indexOf('pick') > -1) .length === 5 ?
      allCategory.classList.add('pick') :
      allCategory.classList.remove('pick')
  }
  
  currentSelected = [...categories].filter( cate => cate.classList.value.indexOf('pick') > -1 ).map( picked => picked.getAttribute('data-category') )
  console.info('선택된 카테고리 : ', currentSelected);
  
  modifyCategory(currentSelected)
}

function modifyCategory(selected){
  console.info(' 이전 선택되어 있던 카테고리 : ', selectedCategory, '\n 현재 선택한 카테고리 : ', selected);
  const isAll = selected.includes('all')
  selectedCategory = [];

  if(isAll){
    selectedCategory.push('all')
  } else {
    [...selected].forEach( current => {
      selectedCategory.push(current)
    })
  }

  console.info('수정) 선택한 카테고리 : ', selectedCategory, isAll)
}

function App(){
  /* 렌더링 되는 화면 */
  return (
    <>
      <div className="title-wrap">
        <h1 className='title'></h1>
      </div>
      <ul className='category-wrap' >
          <li 
            data-category="all"
            className="category pick"
            onClick={ e => handleCategory(e)}
          > 전체
          </li>
          <li 
            data-category="01"
            className="category" 
            onClick={ e => handleCategory(e)}
          > 밥
          </li>
          <li 
            data-category="02"
            className="category" 
            onClick={ e => handleCategory(e)}
          > 면
          </li>
          <li 
            data-category="03"
            className="category" 
            onClick={ e => handleCategory(e)}
          > 국∙찌개
          </li>
          <li 
            data-category="04"
            className="category" 
            onClick={ e => handleCategory(e)}
          > 간편
          </li>
          <li 
            data-category="05"
            className="category" 
            onClick={ e => handleCategory(e)}
          > 고기
          </li>
      </ul>
      <div className='contents-wrap'>
        <div className="roulette-wrap" data-state="ready" >
          <div className='roulette' data-state='init'> </div>
        </div>
        <button 
          type='button'
          className='btn-roulette'
          data-action='start'
          onClick={ e => startRoulette() }
        ></button>
      </div>
      {/* 결과 표출 영역 */}
      <div className='result-view'>
        <div className='result-wrap'>
          <h4 className='result-title'></h4>
          <h2 className='result-name'></h2>
          <button
            type='button'
            className='btn-result'
            // onClick={}
          > 다른거 추천해줘!</button>
        </div>
      </div>
    </>
  )
}



export default App;