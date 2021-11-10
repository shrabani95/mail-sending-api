import React, { Component } from 'react';

import { DragDropContext, Droppable ,Draggable} from 'react-beautiful-dnd';

class DragableList extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            users:[
                      
                        {id:2,name:"ram"},
                        {id:3,name:"jadu"},
                        {id:4,name:"madu"}           
                    ],
                    selected:[ {id:1,name:"sam"}],
            };
           
    }
    onDragEnd=(result)=>
    {
        console.log(result)
            const {destination,source,reason}=result;
            if(!destination || reason==='CANCEL')
            {
                return;
            }
            if(destination.droppableId===source.droppableId && destination.index===source.index)
            {
                return;
            }
            const users=Object.assign([],this.state.users);
            const droppedUser=this.state.users[source.index];
            users.splice(source.index,1);
            users.splice(destination.index,0,droppedUser);

            this.setState({users})
    }

    render() 
    {
        // const users=[
        //     {id:1,name:"sam"},
        //     {id:2,name:"ram"},
        //     {id:3,name:"jadu"},
        //     {id:4,name:"madu"}           
        // ];
        
        return (
            <>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="dp1" >
                        {(provided) => (                          
                                <ul style={{width:'200px'}}  className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    
                                    {
                                        this.state.users.map(({id,name},index)=>{

                                            return (
                                                <Draggable  key={index} draggableId={index +" "} index={index}>
                                                    {(provided)=>(    


                                                        <li ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} >
                                                            <div style={{border: '1px solid',margin: '5px', padding: '5px'}}>
                                                              <p>{index + 1}</p>
                                                                <p>{name}</p>
                                                            </div> 
                                                        </li>  






                                                    )}
                                                </Draggable>
                                            );  

                                         })
                                    }
                                   {provided.placeholder}
                                </ul>                              
                          
                         )}
                        </Droppable>
                        <hr></hr>
                       
                    </DragDropContext>
            </>
        );
    }
}

DragableList.propTypes = {

};

export default DragableList;