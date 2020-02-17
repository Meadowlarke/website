import React from 'react';

/*
Class for working with JavaScript object representing
a React-Image-Mapper map. This class is mostly getter and 
setter methods. 
*/
class Map{
	constructor(){
		this.create_blank_map = this.create_blank_map.bind(this);
		this.create_preset_map = this.create_preset_map.bind(this);
		this.map = this.create_preset_map();
		this.addAreaToMap = this.addAreaToMap.bind(this);
		this.getMap = this.getMap.bind(this);
		this.removeAreaFromMap = this.removeAreaFromMap.bind(this);
		this.updateAreaNamesInMap = this.updateAreaNamesInMap.bind(this);
		this.setImageDimensions = this.setImageDimensions.bind(this);
		this.createTextMap = this.createTextMap.bind(this);
		//textMap stores a list of JSX componenets for text label overlay
		this.textMap = [];
		this.getTextMap = this.getTextMap.bind(this);
		this.reDrawMap = this.reDrawMap.bind(this);
	}

	create_preset_map(){return(
		{
		  name: "my-map",
		  areas: [
		    { name: "1", shape: "poly", coords: [32,304,35,488,222,450,223,360,468,349,462,283,117,296],                          },//preFillColor: "green", fillColor: "blue"  },
		    { name: "2", shape: "poly", coords: [299,388,324,393,373,572,240,566,299,476],                                        },//preFillColor: "pink"  },
		    { name: "3", shape: "poly", coords: [339,422,405,366,469,476,406,557],                                                },//fillColor: "yellow"  },
		    { name: "4", shape: "poly", coords: [235,397,282,398,285,472,224,558,30,568,35,506,234,461],                          },//preFillColor: "red"  },
		    { name: "5", shape: "poly", coords: [29,54,78,94,26,158,70,191,27,269,330,273,470,240,412,192,463,133,323,62,139,53], },//preFillColor:"yellow"},
			  ]
		}
	)}


	//returns a blank map
	create_blank_map(){return(
		{name: "my-map",
		areas: [
			]
		}
	);}

	//adds a hotspot/area to the image map
	addAreaToMap(coordinates, text = ""){
		coordinates.push(25)
			this.map.areas.push(
				{
						name: this.map.areas.length.toString(),
						shape: "circle",
						coords: coordinates,
						preFillColor: "rgb(255,255,255,0.3)",
						lineWidth: 2,
						description: text,
						imageDimensions:[0,0],
						imagePercentage:[0.0,0.0]
				}
			)
	}

	//removes a hotspot/area from the map
	removeAreaFromMap(index){
		this.map.areas.splice(index,1)
		this.updateAreaNamesInMap()
	}


	setImageDimensions(dims){

		for(const area of this.map.areas){
			if (area.imageDimensions.includes(0) === false){
				area.imagePercentage[0] = parseFloat(dims[0]) / parseFloat(area.imageDimensions[0]);
				area.imagePercentage[1] = parseFloat(dims[1]) / parseFloat(area.imageDimensions[1]); 
			}
			area.imageDimensions[0] = dims[0];
			area.imageDimensions[1] = dims[1];
		}
	}

	/*
	updates the area.name field. necessary to call when element have
	been deleted from the map.  
	*/
	updateAreaNamesInMap(){
		let i = 0;
		for(const area of this.map.areas){
			area.name = i.toString();
			i+=1; 
		}
	}
	getMap(){return(this.map)}
	getTextMap(){return(this.textMap)}

	//This function makes the text map in the this.textMap
	//variable. This is used in the render function to create
	//the text overlay labels for the cirlces. 
	createTextMap() {
	   this.textMap = [];
	   this.map.areas.map((d) => {
	       if (d.coords !== undefined && d.coords.length !== 0){
		       const CSSPosition = {
		       		position : "absolute",
		       		left : d.coords[0].toString() + "px",
		       		top : d.coords[1].toString() + "px",
		       		zIndex: 10
		       }
		       this.textMap.push(<span key={d.name} style={CSSPosition}>{d.name}</span>);
			}
			return null;
		})
	}

	/*
	handles redrawing points when user changes the image. An image where this is needed
	is changing from 1996.8 to 1996.2. This is passed as a callback on statechanges. It
	is only called as a call back from set state from within load image. 
	*/
	reDrawMap(){
		for(const area of this.map.areas){
			if (area.imagePercentage.includes(0) === false){
				area.coords[0] = parseFloat(area.coords[0])*area.imagePercentage[0];
				area.coords[1] = parseFloat(area.coords[1])*area.imagePercentage[1];
			}
		}
		this.createTextMap()
	}
}

export default Map;