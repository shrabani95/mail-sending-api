import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[
               { id:1,name:"ram1"},
               { id:2,name:"ram2"},
               { id:3,name:"ram3"},
               { id:4,name:"ram4"},
               { id:5,name:"ram5"},
               { id:6,name:"ram6"},
               { id:7,name:"ram7"},
               { id:8,name:"ram8"},
               { id:9,name:"ram9"},
               { id:10,name:"ram10"},
               { id:11,name:"ram11"},      
               { id:12,name:"ram12"},

            ]
        }

    }

   
    render() {

        let tableData=this.state.data.map((item,i)=>{
            return (
                <tr>
                    <td>{item.id}</td>     
                    <td>{item.name}</td>
                </tr>
            )
        })


        return (
            <div>
                     <table  id="tbl_purchased" className="table table-bordered">  
                        <tr>
                        <th>id</th>
                        <th>name</th>
                        </tr>
                        {tableData}
                     </table>
            </div>
        );
    }
}

Pagination.propTypes = {

};

export default Pagination;