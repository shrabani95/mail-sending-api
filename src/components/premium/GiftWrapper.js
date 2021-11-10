import React, { Component } from 'react';

import UserGifts from './UserGifts';
import HeaderClass from '../header_footer/HeaderClass';
import FooterClass from '../header_footer/FooterClass';

class GiftWrapper extends Component {
    constructor(props) {
        super(props);
        this.state={
            componentName: null
          }
    }

 
    componentDidMount() {
        let pathname = this.props.match.params;

       console.log(pathname)
      //  fetch(/* send request to http://www.example.com/api/urlcheck with pathname */)
        //.then((response)=>{ this.setState({componentName: response.componentName }) })
    }

   

    render (){
        const { componentName } = this.state
      
        if(componentName === 'gift') return <UserGifts/>
        else  return (
            <>
                    <HeaderClass/>                 
                        <div class="container-sm">
                            <div class="refpage" style="margin-bottom:250px;">
                            <img src="https://cdn.direct.me/images/fanbound-404.png" style="width:150px;"/>
                            <h1>Welp!</h1>
                            <h2>That was embarrassing…</h2>
                            <p>The page you are looking for doesn’t exist kinda like me.</p>
                            </div>
                        </div>   
                  <FooterClass/>
            </>
        )
              
      }
}

GiftWrapper.propTypes = {

};

export default GiftWrapper;