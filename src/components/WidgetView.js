import '../widget.css';
import '../App.css';
import React, { useRef, useState, useEffect } from 'react';
import BallWidget from './widgets/BallWidget';
import Draggable from 'react-draggable';

export default function WidgetView({widgets}) {

    let Draggable = require('react-draggable');

    return (
			<div className='main-grid'>
				<div className='widget-container'>

				{widgets.map((widget) => {
					return <BallWidget key={widget._id} />;
				})}

                    <Draggable bounds='parent'>
						<BallWidget />
                    </Draggable>

				</div>
			</div>
		);
}
