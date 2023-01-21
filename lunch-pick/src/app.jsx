import React, { Component } from 'react';
import './app.css';
import Title from './components/title';       // 타이틀
import Category from './components/category'; // 카테고리
import Contents from './components/contents'; // 룰렛 / 버튼
import Modal from './components/modal'; // 모달


function App(){
    return (
      <>
        <Title />
        <Category />
        <Contents />
        <Modal />
      </>
    )
}

export default App;