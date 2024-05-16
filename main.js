
var gameParametrs = {
   player1:$('<p class="playerx">x</p>'),
   player2:$('<p class="player0">0</p>'),
   playerTurn: 'x',
   player: null,
 
} 
var cointer = 0;
var box = $(".somdiv");
var block = [
   ["","",""],
   ["","",""],
   ["","",""]
];
$(".text1").hide();
$(".text2").hide();


function tic_tac_toe(config) {
   var that = this;
   
   this.init = function(){
      $(".forPlayerx").on("click",function(){
         
         config.playerTurn = 'x';
         that.forPlayer();
         $(".text1").show();
         $(".text").hide();
      })
       
      $('.forPlayer0').on("click",function(){
         config.playerTurn = 'o';
         that.forPlayer();
         $(".text2").show();
         $(".text").hide();
      });
   }

   this.forPlayer = function (turn){
      $(".display div").on("click",function(){
         var a = $(this).data('a');
         var j = $(this).data('j');
         cointer = cointer + 1;
         if(!$(this).hasClass("activ")){
            
            if(config.playerTurn === 'x') {
               config.player = config.player1.clone();
               config.playerTurn = '0';
               $(".text2").show();
               $(".text1").hide();
               for(let i = 0; i < block.length; i++){
                  block[a][j] = 1;
               }
            } else {
               config.player = config.player2.clone();
               config.playerTurn = 'x';
               $(".text2").hide();
               $(".text1").show();
               for(let i = 0; i < block.length; i++){
                   block[a][j] = 4;
               }
            } 
            $(this).append(config.player);
            that.calculateHorizontalSum();
            that.calculateVerticalSum();
            that.calculateDiagonalSum();
            that.noWin();
            config.player.css("display", "flex");
         }            
         $(this).addClass("activ");
         
      }) 
   } 

   this.calculateHorizontalSum = function (){

      const result = block.map(subArr => {
      return subArr.reduce((pre, item) => pre + item, 0)
      })
      if(result[0] == 3 || result[1] == 3 || result[2] == 3){
         that.animateForWinx_1();
      
         that.animateForWinx_2();
      } else if (result[0] == 12 || result[1] == 12 || result[2] == 12) {
      
         that.animateForWin0();
         that.animateForWinx_1();
      };
      
      }

      this.calculateVerticalSum = function (){
         var result1 = block.reduce(function (r, a) {
         a.forEach(function (b, i) {
             r[i] = (r[i] || 0) + b;
         });
         return r;
      }, []);
      
      if(result1[0] == 3 || result1[1] == 3 || result1[2] == 3){
         that.animateForWinx_1();
         that.animateForWinx_2();
      
      } else if (result1[0] == 12 || result1[1] == 12 || result1[2] == 12){
          that.animateForWinx_1();
         that.animateForWin0();
      
      }
      };
   
   this.calculateDiagonalSum = function(matrix) {
   matrix = block;
   const size = matrix.length;
   let mainSum = 0;
   let secondarySum = 0;
 
   for (let i = 0; i < size; i++) {
     for (let j = 0; j < size; j++) {
       if (i === j) {
         mainSum += matrix[i][j];
       }
       if (i + j === size - 1) {
         secondarySum += matrix[i][j];
       }
     }
   }
    if( mainSum == 3 || secondarySum == 3){
         that.animateForWinx_1();
         that.animateForWinx_2();
      
} else if(mainSum == 12 || secondarySum == 12){
   that.animateForWinx_1();
   that.animateForWin0();


}
   return {
     mainSum,
     secondarySum
   };   
 }

 this.animateForWinx_1 = function(){
   $(".winx").show();
   this.reloadGame();
   $(".winx").animate({
   left: "653px",
},1000, "linear", function() {
   $(".winx").stop();
 
});
}

this.animateForWinx_2 = function(){
   this.reloadGame();
   $(".winx-1").show();
   $(".winx-1").animate({
   right: "585px",
},1000, "linear", function() {
   $(".winx").stop();
});
}

this.animateForWin0 = function(){
   this.reloadGame();
   $(".win0-1").show();
   $(".win0-1").animate({
      right: "595px",
   },1000, "linear", function() {
      $(".winx").stop();
    
   });
   }

   this.noWin = function(){
   if(cointer === 9 ){
      that.animateForTie();
      $(".reload").on("click",function(){
         location.reload();
      })
   
   }
}

this.animateForTie = function () {
   $(".Tie").show();
   $(".Tie").animate({
   top: "100px",
},1500, "linear", function() {
   $(".Tie").stop();

   $(".Tie").css("opacity","0.8");
  
});
};

this.reloadGame = function () {  
   $(".load").show();
   $(".load").on("click", function(){
    location.reload();
   })
}
}



(new tic_tac_toe(gameParametrs)).init();