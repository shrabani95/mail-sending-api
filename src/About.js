import React from 'react'
import { Link } from 'react-router-dom';
import DataList from './components/DataList';
import FunClick from './components/FunClick';
import './animate.css';
import './MyStyle.css';
import './responcive.css';
import './bootstrap.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PostData from './components/PostData';
export default function About()
{
    let base_url="http://localhost:3000/"
    let logo="Logo.png";
    return (
        <div>
      
            <PostData/>
            
        </div>
    )
}