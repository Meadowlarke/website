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
		this.curr_vis = -1;
		this.MAP_SCALE_X = 500;
		this.MAP_SCALE_Y = 800;
		this.addAreaToMap = this.addAreaToMap.bind(this);
		this.getMap = this.getMap.bind(this);
		this.removeAreaFromMap = this.removeAreaFromMap.bind(this);
		this.updateAreaNamesInMap = this.updateAreaNamesInMap.bind(this);
		this.setImageDimensions = this.setImageDimensions.bind(this);
		this.createTextMap = this.createTextMap.bind(this);
		this.makeTextOnMapVisible = this.makeTextOnMapVisible.bind(this)
		//textMap stores a list of JSX componenets for text label overlay
		this.textMap = [];
		this.getTextMap = this.getTextMap.bind(this);
		this.reDrawMap = this.reDrawMap.bind(this);
		this.scaleMap = this.scaleMap.bind(this);
	}

	create_preset_map(){

		return(
		{
		  name: "my-map",
		  areas: [
		    { id : 1, url : "/content/Recordings.html", name: "Recordings", shape: "poly", coords: [32,304,35,488,222,450,223,360,468,349,462,283,117,296],                        fillColor:  "#516987"  , optional_override : [-150,0] },
		    { id : 2, url : "/content/About.html", name: "About", shape: "poly", coords: [299,388,324,393,373,572,240,566,299,476],                                           fillColor:  "#AC7F5B"   },
		    { id : 3, url : "/content/Press.html", name: "Press", shape: "poly", coords: [339,422,405,366,469,476,406,557],                                                   fillColor:  "#E4AD74" },
		    { id : 4, url : "/content/Book.html", name: "Book", shape: "poly", coords: [235,397,282,398,285,472,224,558,95,568,100,506,234,461],                             fillColor:  "#84BFD1"    },
		    { id : 5, url : "/content/Concerts.html", name: "Concerts", shape: "poly", coords: [29,54,78,94,26,158,70,191,27,269,330,273,470,240,412,192,463,133,323,62,139,53], fillColor: "#647B3F" },
			  ]
		}
	)}

	scaleMap(width,height,max_width,screen_scale){
		const multiplier = ((width*screen_scale)/this.MAP_SCALE);
		let new_map = this.create_preset_map();
		const adj_width  = Math.min((width*screen_scale),max_width);
		const adj_height = Math.min((this.MAP_SCALE_Y*((width*screen_scale)/this.MAP_SCALE_X)),(max_width/this.MAP_SCALE_X)*this.MAP_SCALE_Y);
		console.log(adj_width)
		//console.log(multiplier)
		for (var i in new_map.areas){
			for (var j in new_map.areas[i]["coords"]){
				if ((j%2) == 0){
					const x_perc = new_map.areas[i]["coords"][j]/this.MAP_SCALE_X
					//console.log(x_perc)
					const x_new = adj_width * x_perc
					//console.log(x_new)
					new_map.areas[i]["coords"][j] = x_new
				}
				else{
					const y_perc = new_map.areas[i]["coords"][j]/this.MAP_SCALE_Y
					const y_new =  adj_height * y_perc
					new_map.areas[i]["coords"][j] = y_new
				}
			}
		}
		console.log(new_map)
		this.map = new_map
	}


	//returns a blank map
	create_blank_map(){return(
		{name: "my-map",
		areas: [
			]
		}
	);}

	makeTextOnMapVisible(id, hide = false){
		if (hide){
			this.curr_vis = -1
			return
		}
		let cnt = 0;
		this.curr_vis = id
	}


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
		       let x = 0;
		       let y = 0;
		       let i = 0;
		       for (i = 0; i < d.coords.length; i++) {
               		if((i%2) === 0){
               			x += d.coords[i];
               		}
               		else{
               			y += d.coords[i];
               		}
			   }
			   x = x/(d.coords.length/2);
			   y = y/(d.coords.length/2);
			   if (d.optional_override != undefined){
			   	 	x += d.optional_override[0]
			   	 	y += d.optional_override[1]
			   }

			   let vis = "hidden"
			   if (d.id == this.curr_vis){
			   		vis = "visible"
			   	}
		       const CSSPosition = {
		       		position : "absolute",
		       		left : x.toString() + "px",
		       		top : y.toString() + "px",
		       		zIndex: 10,
		       		color: "white",
		       		fontWeight: 900,
		       		visibility: vis,
		       		MozUserSelect:"none",
					WebkitUserSelect:"none",
					msUserSelect:"none",
					pointerEvents:"none"

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