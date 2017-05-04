var WINDOW_WIDTH = document.documentElement.clientWidth;
var canvasWidth  = 0.9 * WINDOW_WIDTH;
var left = WINDOW_WIDTH *0.05



var sum;
var x; 
var y; 
var level = 1;
var bgColor = [
	['#900','#920202'],
	['#2196F3','#1589E6'],
	['#3F51B5','#3549B7'],
	['#F44336','#F73A21'],
	['#FFEB3B','#FBE845'],
	['#009688','#00A293'],
	['#795548','#825C4E'],
	['#F44336','#F32F21'],
	['#550035','#5D033B'],
	['#CDDC39','#D2E22E'],
	['#9E9E9E','#A5A3A3'],
]

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')

window.onload = function () {
	perpare()
	canvas.width = canvasWidth;
	canvas.height = canvasWidth;
	canvas.style.marginLeft= left+'px';
	
	newGame()

}
function perpare(){
	if (WINDOW_WIDTH> 500) {
		canvasWidth  = 0.4 * WINDOW_WIDTH;
		left = WINDOW_WIDTH *0.3
	};
}
function newGame(){
	sum = 2;
	level = 1;
	
	ctx.clearRect(0,0,canvasWidth,canvasWidth)
	init()
	
}
function clickBlock(){
	for( var i = 0 ; i < sum ; i ++)
		for( var j = 0 ; j < sum ; j ++)
			if (i == x && j == y ) {
				ctx.beginPath()
				ctx.rect(
					getPotTop(i,j,sum),
					getPotLeft(i,j,sum),
					getBlockSize(sum),
					getBlockSize(sum))
				ctx.closePath()
				
			}
	canvas.onclick = function(event){
		console.log(event)
		event.preventDefault();
		var _x = event.clientX - canvas.getBoundingClientRect().left;
		var _y = event.clientY - canvas.getBoundingClientRect().top;

		if (ctx.isPointInPath( _x , _y )) {
			sum++;
			level++
			if (level == 12) {
				pass()
			}else{
				init();
			}
			

			

		}
	}
}
function pass(){
	ctx.clearRect(0,0,canvasWidth,canvasWidth)
	ctx.font = "40px Courier New";
	ctx.textAlign = 'left';
	ctx.fillText('眼力真棒！',4*left,4*left);
	document.getElementsByTagName('p')[0].innerHTML = '通关'
}
function init(){
	document.getElementsByTagName('p')[0].innerHTML  = '第'+level+'关'
	x = parseInt(Math.random()*sum);
	y = parseInt(Math.random()*sum);

	for( var i = 0 ; i < sum ; i ++)
		for( var j = 0 ; j < sum ; j ++)
			if (i == x && j == y ) {
				drawBlock(
				getPotTop(i,j,sum),
				getPotLeft(i,j,sum),
				getBlockSize(sum),
				getBlockSize(sum),
				getBackground(sum,1))
			}else{
				drawBlock(
				getPotTop(i,j,sum),
				getPotLeft(i,j,sum),
				getBlockSize(sum),
				getBlockSize(sum),
				getBackground(sum,0))
			}
			
	//
	clickBlock()

}
function drawBlock(x,y,width,height,bg){
	ctx.strokeStyle = '#fff'
	ctx.fillStyle = bg;
	ctx.beginPath()
	ctx.rect(x,y,width,height);
	ctx.closePath();
	ctx.stroke()
	ctx.fill();
}
function getPotTop(i,j){
	return i*getBlockSize(sum);
}
function getPotLeft(i,j){
	return j*getBlockSize(sum);
}
function getBlockSize(sum){
	return canvasWidth/sum;
}
function getBackground(sum,j){
	return bgColor[sum-2][j]
}