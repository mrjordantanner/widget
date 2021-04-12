import React, { useRef, useState, useEffect } from 'react';
import anime from 'animejs';
import Draggable from 'react-draggable';

export default function BallWidget() {

    // const socket = io();
    
    const widget = useRef();

    function handleMouseDown(e) {
        e.preventDefault();
        const grow = anime({
            targets: '.ball',
            scale: [1, .85],
            duration: 300,
            autoplay: false,
          });

        // grow.restart();
        getWidgetData();
        console.log('mouseDown on widget');
      }

  // Get and emit widget position and size
  function getWidgetData() {
    const data = {
      x: widget.current.getClientRects()[0].x,
      y: widget.current.getClientRects()[0].y,
      width: widget.current.getClientRects()[0].width,
      height: widget.current.getClientRects()[0].height
    }
    console.log(data);
    // socket.emit('update_data', data);
  }

 // Receive widget data and update position
  // socket.on('update_data', function (data) {


  // });



 

    return (

        <Draggable
            bounds='parent'
            onMouseDown={handleMouseDown}
            onDrag={getWidgetData}>
              <div className='ball' id='draggable' ref={widget}></div>
        </Draggable>



    )
}
          {/* <div className='grid animate__bounce' id="draggable" ref={object} onClick={handleObjectClick}>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
        </div> */}