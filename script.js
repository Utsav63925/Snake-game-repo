let board=document.querySelector('.board');
let blockHeight=30;
let blockWidth=30;
let rows=Math.floor(board.clientHeight/blockHeight);
let cols=Math.floor(board.clientWidth/blockWidth);
let blocks=[];/*blocks={}..object bhi bnaa skte hai*/
snakes=[{x:1,y:3},{x:1,y:4},{x:1,y:5}];
let direction="right";
let intervalId=null;
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};/*imp*/
let highScoreElement=document.querySelector("#high-score");
let scoreElement=document.querySelector("#score");
let timeElement=document.querySelector("#time");
let highScore=localStorage.getItem("highScore")||0;
let score=0;
let time=`00-00`;
highScoreElement.textContent=highScore;
let startButton=document.querySelector(".btn-start");
let modal=document.querySelector(".modal");
let startGame=document.querySelector(".start-game");
let gameOver=document.querySelector(".game-over");
let buttonRestart=document.querySelector(".btn-restart");
for(let row=0;row<rows;row++)
{
    blocks[row]=[];
    for(let col=0;col<cols;col++)
    {  
let block=document.createElement('div');
block.classList.add("block");
board.appendChild(block);
/*block.textContent=`${row}-${col}`;*/
blocks[row][col]=block;
}
}
/*for blocks as object creation
let blocks={};
for(let row=0;row<rows;row++)
{
    for(let col=0;col<cols;col++)
    {  
let block=document.createElement('div');
block.classList.add("block");
board.appendChild(block);
block.textContent=`${row}-${col}`;
blocks[`${row}-${col}`]=block;
}
}*/
function render(){
    let head=null;
    blocks[food.x][food.y].classList.add("food");
    if(direction==="left")
    head={x:snakes[0].x,y:snakes[0].y-1};
    else if(direction==="right")
    head={x:snakes[0].x,y:snakes[0].y+1};
    else if(direction==="up")
    head={x:snakes[0].x-1,y:snakes[0].y};
else
head={x:snakes[0].x+1,y:snakes[0].y};
if(head.x==0||head.y==0||head.x>=rows||head.y>=cols){
alert('Game Over');
clearInterval(intervalId);
modal.style.display="flex";
startGame.style.display="none";
gameOver.style.display="flex";
return;
}
if(food.x==head.x && food.y==head.y)
{
 snakes.unshift(head);
blocks[food.x][food.y].classList.remove("food");
food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
blocks[food.x][food.y].classList.add("food");

    snakes.forEach(segment=>{
        blocks[segment.x][segment.y].classList.remove("fill")});
        score=score+10;
        scoreElement.textContent=score;
        if(score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
        }
    }
    else
    {
        snakes.forEach(segment=>{
            blocks[segment.x][segment.y].classList.remove("fill")});
    /*sabse fill htaado*/
        /*snakes ke object--->block se css htaa do*/
        /*alternative*/
       /* let tail=snakes[snakes.length-1];
        blocks[tail.x][tail.y].classList.remove("fill");*/
    snakes.unshift(head);/*new head with css add kardo*//*object+1 in snakes*/
    snakes.pop();/*object-1 in snakes*/
        }
    snakes.forEach(segment=>{
            blocks[segment.x][segment.y].classList.add("fill");
    })
}
timeIntervalId=setInterval(()=>{
    let [min,sec]=time.split("-").map(Number);
    if(sec==59)
    {
        min=min+1;
        sec=0;
    }
    else
    sec=sec+1;
time=`${min}-${sec}`;
timeElement.textContent=time;
},1000);
startButton.addEventListener("click",()=>{
    modal.style.display="none";
    intervalId=setInterval(()=>{
        render();
        
    },300);
})
buttonRestart.addEventListener("click",()=>{
    blocks[food.x][food.y].classList.remove("food");
    snakes.forEach(segment=>{
        blocks[segment.x][segment.y].classList.remove("fill");
    })
    modal.style.display="none";
    direction="right";
    snakes=[{x:1,y:3},{x:1,y:4},{x:1,y:5}];
    food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    time=`00-00`;
    intervalId=setInterval(()=>{
        render();
        
    },300);
})
addEventListener("keydown",(event)=>  
{
    if(event.key==="ArrowUp")
    direction="up";
    else if(event.key==="ArrowDown")
    direction="down";
    else if(event.key==="ArrowRight")
    direction="right";
    else if(event.key==="ArrowLeft")
    direction="left";
})/**/

