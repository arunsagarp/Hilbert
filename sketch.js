let order=7;
let N;
let total;
let path = [];
let px=[]
let counter = 0;
let myImage;
let maxx=0;
let maxy=0;
let slider;
var isColor;

function hilbert(d){
	let vec= [
	createVector(0,0),
	createVector(0,1),
	createVector(1,1),
	createVector(1,0)]
	let index = d & 3;

	let v =  vec[index]
	for(let j=1;j<order;j++){
	d = d >>> 2;
	index = d & 3;
	let len = pow(2,j);
	if(index==0){
		var tmp=v.x;
		v.x = v.y
		v.y=tmp;
		
	}else if (index==1){
		v.y+=len;
	}else if (index==2){
		v.x+=len;
		v.y+=len;
	}else {
		var temp = len-1-v.x;
		v.x=len-1-v.y;
		v.y=temp;
		v.x+=len;
	}
	}
	return v;
	
}
function preload() {
  var urlParams = getParameterByName('name');
  isColor = getParameterByName('color');
  if(isColor == null)
	  isColor="false";
	myImage = loadImage('assets/'+urlParams+'.JPG');
	
}
function setup() {
	createCanvas(570, 570);
	colorMode(RGB, 255, 255, 255);
	N=pow(2, order);
	total = N * N;
	for(let i=0;i<total;i++){
		path[i]=hilbert(i)
		c = myImage.get(path[i].x,path[i].y);
		if(isColor.toLowerCase()=="true")
			px[i]= [c[0],c[1],c[2]];
		else
			px[i]=[c[0],c[0],c[0]]
		let len=width/N;
		path[i].mult(len)
		path[i].add(len/2,len/2);
		
	}
	slider = createSlider(1,20,1);
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function draw() {
	
		background(90);
		beginShape();
		stroke(255);
		strokeWeight(2.7);
		noFill();
		for (let i=1;i<counter;i++)
		{	
		stroke(px[i][0],px[i][1],px[i][2],)
		
		line(path[i-1].x,path[i-1].y,path[i].x,path[i].y);
		}
		counter+=slider.value();
		if (counter==total+1)
			counter=0;
		
		endShape();
}