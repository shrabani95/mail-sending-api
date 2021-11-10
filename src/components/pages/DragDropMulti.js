import React, { Component } from 'react';

import { DragDropContext, Droppable ,Draggable} from 'react-beautiful-dnd';
class DragDropMulti extends Component {
    constructor(props) 
    {
        super(props);
        this.state = {
                        items:[
                                    {id:1,content:"sam"},
                                    {id:2,content:"ram"},
                                    {id:3,content:"jadu"},
                                    {id:4,content:"madu"}           
                                ],
                        selected:[ 
                                    {id:5,content:"amar"},
                                    {id:6,content:"dipu"},
                                    {id:7,content:"bukan"},
                                    {id:8,content:"tukan"}    
                                ]
                    };
    }
     getItems = (count, offset) =>{
      const  items=[
            {id:1,content:"sam"},
            {id:2,content:"ram"},
            {id:3,content:"jadu"},
            {id:4,content:"madu"}           
        ];

        return items;
     }
  // a little function to help us with reordering the result
 reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
 move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
id2List = {
    droppable: 'items',
    droppable2: 'selected'
};
getList = id => this.state[this.id2List[id]];
onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const items = this.reorder(
            this.getList(source.droppableId),
            source.index,
            destination.index
        );

        let state = { items };

        if (source.droppableId === 'droppable2') {
            state = { selected: items };
        }

        this.setState(state);
    } else {
        const result = this.move(
            this.getList(source.droppableId),
            this.getList(destination.droppableId),
            source,
            destination
        );
            console.log(result)
        this.setState({
            items: result.droppable,
            selected: result.droppable2
        });
    }
};

getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

 getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
});
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
             <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}>
                        {this.state.items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id + " "}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={this.getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
             <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}>
                        {this.state.selected.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id + ""}
                                index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={this.getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        );
    }
}

DragDropMulti.propTypes = {

};

export default DragDropMulti;