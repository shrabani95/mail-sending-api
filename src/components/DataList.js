import React from 'react';

export default function DataList() {
    const arrDelails=[
        {name:"sam",age:28,address:"kolkata"}
];
    const arrList=arrDelails.map(obj=><h2 key={obj.name}>Name: {obj.name} address: {obj.address}</h2>)
  return (
    <>
    <div> {arrList}</div>        
    </>
  );
}
