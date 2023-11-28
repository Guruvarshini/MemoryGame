$("h3").click(function(){$(".hidden").slideToggle();});
var arr=[];
var userarr=[];
var backgroundColors = ["grey", "orange", "lime", "purple", "green", "darkblue", "gold", "cyan", "magenta", "darkorange", "aqua", "yellow", "red", "lightcyan", "slateblue", "lightsalmon", "teal"];
var level=0;
var score=0;
var high=0;
function createSequence(){
    $(".high").html("<em>Highest Score: "+high+" </em>");
    var random=Math.floor(Math.random()*16)+1;
    arr.push(random+"");
    playSound(random);
    colourButton(random);
    $("h2").html("Level "+level);
    level++;
}
$('.btn').on('click', function() {
    if(arr.length!=0){
      var clickedId = $(this).attr('id');
      colourButton(clickedId);
      playSound(clickedId);
      userarr.push(clickedId);
      var c=checkAnswer(userarr.length-1);
      if((userarr.length)===(level)&&c){
        userarr=[];
        score+=level*100;
        setTimeout(function(){   
          createSequence();
          },1000);
      }
    }
});
function playSound(num){  
    var audio=new Audio("sounds/"+num+".mp3");
    audio.play();

}
function colourButton(num){
    $("#"+num).css("backgroundColor",backgroundColors[num]);
    $("#"+num).addClass("pressed");
setTimeout(function(){
    $("#"+num).removeClass("pressed");
    $("#"+num).css("backgroundColor","grey"); 
},200);
}

$(".start").on("click",function(){
    $(".start").hide();
    createSequence();
})
function checkAnswer(ind){
    if(arr[ind]===userarr[ind]){
        return true;
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        showScore();
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h2").html("Game Over!!Press Start!");
            restartGame();
            $(".start").show();
        },1000);
        return false;
        
    }
}
function restartGame(){
    level=0;
    arr=[];
    userarr=[];
    if(high<score){
        high=score;
        $(".high").html("<em>Highest Score: "+high+" </em>");
    }
    score=0;
}
function showScore() {
    $('#scoreDisplay').text('Score: ' + score).fadeIn(); // Display the score with fading effect
    setTimeout(function() {
      $('#scoreDisplay').fadeOut(); // Hide the score after 1000ms
    }, 1000);
  }