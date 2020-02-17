import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper'
import Map from './map'


class ImageSelector extends Component{

	constructor(props){
		super(props);
		this.logStr = " "
		this.MAP = new Map();
		//React-image-mapper package functions
		this.clicked = this.clicked.bind(this);
		this.load = this.load.bind(this);
		//this.clickedOutside = this.clickedOutside.bind(this);
		//last clicked is used for double click functionality
		this.lastClicked = {};
		this.state = {
			url: '/harlanSiteMap.png'
		};
	}


	//this function handles clicking on a hotspot area
	clicked(area,i,evt) {
		const DOUBLE_CLICK_SPEED = 500;
		/*this if statement handles double click testing
		lastClicked is a json object containing hot spot indexes
		and the time they were last clicked. */
		if (i in this.lastClicked) {
			if ((Date.now() - this.lastClicked[i]) < DOUBLE_CLICK_SPEED){
				//if an area was double clicked, remove it from the map. 
				this.MAP.removeAreaFromMap(i);
				//fixes a bug where indexes shift when an element is deleted
				for (var member in this.lastClicked) delete this.lastClicked[member];
				//recreate the text map as circles have been changed.
				this.MAP.createTextMap()
			}
		}
		//update the lastClicked time for the area that was clicked
		this.lastClicked[i] = Date.now()
		//redraw the component
		this.setState({})
	}




	load() {
	}

	/*Good de*/ 
	/*
	clickedOutside(evt) {
		//Add new hotspot to map
		
		this.logStr =  this.logStr + ',' + evt.nativeEvent.layerX.toString() + ',' + evt.nativeEvent.layerY.toString()
		console.log(this.logStr)
		this.MAP.addAreaToMap([evt.nativeEvent.layerX, evt.nativeEvent.layerY])
		//create the text map
		this.MAP.createTextMap()
		this.setState({});
	}
	*/




	/*
	This is based off of the react-image-mapper example
	app which can be found at the below two urls:
	https://coldiary.github.io/react-image-mapper/
	https://github.com/coldiary/react-image-mapper
	*/
	render() {
		return (
			<div className="grid"
			onContextMenu={(e)=> e.preventDefault()}>
				<div className="presenter">
					<div id = "imageMapper" style={{ position: "relative"}}>
						<ImageMapper	
							src={'harlanSiteMap.png'}
							map={this.MAP.getMap()}
							width={500}
							onLoad={() => this.load()}
							onClick={(area,i,e) => this.clicked(area,i,e)}
							onContextMenu={(area,i,e) => this.clicked(area,i,e)}
							onImageClick={evt => this.clickedOutside(evt)}
							lineWidth={4}
							strokeColor={"white"}
						></ImageMapper>
						{/* this is where the text map is drawn */}
				        {this.MAP.getTextMap().map(function(d, idx){
					           return (
					           	d
					           	);
				       	 })
				        }
				        
				    	
			        </div>
				</div>
			</div>
		);
	}
}

export default ImageSelector;