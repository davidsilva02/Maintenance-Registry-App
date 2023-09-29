import React, { Component, useState, useEffect } from 'react';
import './header.css';

class Header extends React.Component {
    clickLogo(){
        window.location.href='/'
    }

    render(){
        return<>
        <div>
            <body onClick={this.clickLogo}>
                    <div className='logo'>
                    <img src='https://pclight4x4.pt/wp-content/uploads/2021/03/site-lettering.png' alt=''></img>
                    </div>
                    <div className='banner'>
                        <h1 className='title'>Relatório Manutenção</h1>
                    </div>
            </body>
        </div>
        </>
    }
}

export default Header;