import React, { Component, useRef } from 'react';
import './app.css';

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
  const resultName = document.querySelector('.result-name')
  resultName.innerText = resultArray[randomNum].MENU_NAME;
  const resultView = document.querySelector('.result-view')
  resultView.classList.remove('hidden')
  // alert('▶︎ 오늘의 Pick ◀︎ \n' + selectedMenu)
}

function handleCategory(e){
  let target = e.target;

  target = target.tagName === 'H4' ?
    target.parentElement : target


  const categoryCode = target.getAttribute('data-category');
  const categories = document.querySelectorAll('.category-wrap > li')
  const nomalCategories = document.querySelectorAll('.category-wrap > li:not([data-category=all])')
  const allCategory = document.querySelector('li[data-category=all]')
  const isAll = categoryCode === 'all'

  console.info('target : ', target, categoryCode, '\n categories : ', categories);
  let currentSelected = [];
  
  if(isAll){
    categories.forEach(item => item.classList.remove('pick'))
    target.classList.add('pick')
  } else {
    // pick 된 친구가 아니라면
    target.classList.value.indexOf('pick') > -1 ?
      target.classList.remove('pick') :
      target.classList.add('pick');

    if([...nomalCategories].filter( cates => cates.classList.value.indexOf('pick') > -1) .length === 5){
      nomalCategories.forEach( cate => cate.classList.remove('pick'))
      allCategory.classList.add('pick');
    } else {
      allCategory.classList.remove('pick')
    }
  }
  
  currentSelected = [...categories].filter( cate => cate.classList.value.indexOf('pick') > -1 ).map( picked => picked.getAttribute('data-category') )

  console.info('선택된 카테고리 : ', currentSelected);

  if(currentSelected.length === 0){
    allCategory.classList.add('pick');
  }

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

  if([...selected].length === 0){
    selectedCategory.push('all')
  }

  console.info('수정) 선택한 카테고리 : ', selectedCategory, isAll)
}


function reSelectMenu(e){
  const resultView = document.querySelector('.result-view')
  resultView.classList.add('hidden')
}


function geoOk(position){
  const latitude = position.coords.latitude    // 위도
  const longitude = position.coords.longitude  // 경도
  console.info(`현재 유저의 위치(위도 / 경도) : ${latitude} / ${longitude}`)
  
  var coord = new kakao.maps.LatLng(latitude, longitude);
  var callback = function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
          console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
      }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}

function geoDeny(){
  alert('위치 정보를 받아올 수 없습니다. 서비스를 원활히 사용할 수 없습니다.')
}

function getGeolocation(e){
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(geoOk, geoDeny)
}

function App(){



  /* 렌더링 되는 화면 */
  return (
    <>
      <div className="title-wrap">
        <h3 className='title'>오늘 <b>진짜 뭐</b> 먹지?</h3>
        <button
          type='button'
          className='btn-geolocation'
          onClick={ e => getGeolocation(e)}
        >🧭</button>
      </div>
      <div className='contents-wrap'>
        <ul className='category-wrap' >
            <li 
              data-category="all"
              className="category pick"
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-all'>전체</h4>
            </li>
            <li 
              data-category="04"
              className="category" 
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-04'>간편</h4>
            </li>
            <li 
              data-category="01"
              className="category" 
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-01'>밥</h4>
            </li>
            <li 
              data-category="02"
              className="category" 
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-02'>면</h4>
            </li>
            <li 
              data-category="03"
              className="category" 
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-03'>국∙찌개</h4>
            </li>
            <li 
              data-category="05"
              className="category" 
              onClick={ e => handleCategory(e)}
            > 
            <h4 className='catagory-name c-05'>고기</h4>
            </li>
        </ul>
      </div>
        <button 
          type='button'
          className='btn-roulette'
          data-action='start'
          onClick={ e => startRoulette() }
        ></button>
        
      {/* <section className='roulette'></section> */}

      {/* 결과 표출 영역 */}
      <section className='result-view hidden'>
        <div className='result-wrap'> 
          <div className='result-header'>
            <h2 className='result-title'></h2>
            <h4 className='result-name'></h4>
          </div>
          <button
            type='button'
            className='btn-result'
            onClick={ e => reSelectMenu(e)}
          > 다른거 추천해줘!</button>
        </div>
      </section>
    </>
  )
}



export default App;