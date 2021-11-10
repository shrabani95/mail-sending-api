import React, { Component } from 'react';


export class Custom extends Component
{
    constructor(props) {
        super(props);
        this.abc = this.abc.bind(this);
       }
        abc()
        {
          alert('Hello World');
        }
       
        render() {
          return null
        }
        
  
    
}

