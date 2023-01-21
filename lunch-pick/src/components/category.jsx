import React, { Component } from 'react';

function Category(){
    return (
        <ul className='category-wrap'>
            <li className="category pick">전체</li>
            <li className="category">밥</li>
            <li className="category">면</li>
            <li className="category">국∙찌개</li>
            <li className="category">간편</li>
            <li className="category">고기</li>
        </ul>
    );
}

export default Category;