import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper'
import Map from './map'


class ImageSelector extends Component{

	constructor(props){
		super(props);
		this.logStr = " "
		this.MAP = new Map();
		this.MAP.createTextMap()
		//React-image-mapper package functions
		this.clicked = this.clicked.bind(this);
		this.load = this.load.bind(this);
		this.moveOnArea = this.moveOnArea.bind(this)
		//this.clickedOutside = this.clickedOutside.bind(this);
		//last clicked is used for double click functionality
		this.lastClicked = {};
		this.state = {
			url: '/harlanSiteMap.png'
		};
	}


	//this function handles clicking on a hotspot area
	clicked(area,i,evt) {
		this.setState({})
	}

	load() {
	}

	enterArea(area) {
		this.MAP.makeTextOnMapVisible(area.id)
		this.MAP.createTextMap()
		this.setState({hoveredArea: area})
		this.setState({
			hoveredArea: area
		});
	}

	moveOnArea(area) {
		//this.MAP.makeTextOnMapVisible(area.id)
		//this.MAP.createTextMap()
		//this.setState({hoveredArea: area})
		
	}

	/*Good dev function but don't need at present*/ 
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
							onMouseEnter={area => this.enterArea(area)}
							onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
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