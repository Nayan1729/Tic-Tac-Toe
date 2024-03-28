var started=false;
var chance = true;
var win =false;
var count=0;
var checkClicked = [false,false,false,false,false,false,false,false,false];
var matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
$("body").click (function (event){
    
        if(event.handled === false) return ;
        event.stopPropagation();
        event.preventDefault();
        event.handled = true;
        if(!started)
    {
        matrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
        remClass();
        begin();

    }
  
});
function begin(){
        started=true;
        $("h1").text("Player1's Turn");
    
};

$(".btn").click(function(event){
    if(event.handled === false) return ;
    event.stopPropagation();
    event.preventDefault();
    event.handled = true;
    var buttonClicked = $(this).attr("id");
    changeTurn(buttonClicked);
});

function changeTurn(buttonClicked){
    if(started)
    {
        var num= buttonClicked.slice(3,4)-1;
        if(num<3)
        {
            num1=0;
        }
        else if(num < 6)
        {
            num1=1;
        }
        else
        num1=2;
        
        num2=num%3;
        if(chance && !checkClicked[num ])
        {
            chance=false;
            $("#"+buttonClicked).addClass("cross");
            $("#"+buttonClicked).addClass("bg-cross");
            $("h1").text("Player2's Turn");
            matrix[num1][num2]=1;
            count++;
        }
        else
        {
            if(!checkClicked[num])
            {
                chance=true;
                $("#"+buttonClicked).addClass("zero");
                $("#"+buttonClicked).addClass("bg-zero");
                $("h1").text("Player1's Turn");
                matrix[num1][num2]=2;
                count++;
            }
        }
        checkClicked[num]=true;
        if(count>4)
        {
            var win = checkWin(num1,num2);
            if(win==true){
                // alert("yes");
               setTimeout(gameOver(win),10000) ;
            }
           else if(count==9)
            {
                setTimeout(gameOver(win),100) ;    
            }
        }
        }
  
}
function checkWin(row, col) {
    // Check row
    var symbol = matrix[row][col];
    var win = true;
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][col] !== symbol) {
            win = false;
            break;
        }
    }
    // alert(win+"row");
    if (win) return true;

    // Check column
    win = true;
    for (var j = 0; j < matrix[row].length; j++) {
        if (matrix[row][j] !== symbol) {
            win = false;
            break;
        }
    }
    // alert(win+"col");
    if (win) return true;
 
    // Check diagonal
    if (row === col) {
        win = true;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][i] !== symbol) {
                win = false;
                break;
            }
        }
        // alert(win+"dia");
        if (win) return true;
    }

    // Check reverse diagonal
    if (row + col === matrix.length - 1) {
        win = true;
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][matrix.length - 1 - i] !== symbol) {
                win = false;
                break;
            }
        }
        // alert(win+"rev-dia");
        if (win) return true;
    }
    return false;
}

function gameOver(win){
    if(win){
        // alert("yooo")
        if(chance)
        {
            // alert("p1");
            $("h1").text("Player2 wins");
        }
        else 
        {
            // alert("p2");
            $("h1").text("Player1 wins");
        }
    }
    else if (count==9)
    {
        $("h1").text("Play again!! Its a draw!!!");
    }
    
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000)
    started=false;
    chance=true;
    win=false;
    count=0;

}
function remClass(){
    for(var i=1;i<=9;i++)
    {
        if(checkClicked[i-1])
        {
            checkClicked[i-1]=false;
            if($("#btn"+i).hasClass("zero"))
            {
                $("#btn"+i).removeClass("zero");   
            }
            else
            $("#btn"+i).removeClass("cross");
        }
    }
    
}