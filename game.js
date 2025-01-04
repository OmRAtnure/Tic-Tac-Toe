// $(".box").on("click",()=>{
//     $(".winnerBox").show();
// })

let boxes=$(".box");
let reset=$(".reset");
// let reset=$(".reset");
let winner=$(".winner");
let turn="O";
let count=0;
let mode="friend";
let difficulty="easy";
let gameOver=false;
let winningPatter=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]


if(mode==="friend"){
    $(".diff").hide();
}

$(".mod").on("click",()=>{
    if(mode==="friend"){
        $('input[value="friend"]').prop("checked",true);
        $(".diff").hide();
    }
    else{
        $('input[value="computer"]').prop("checked",true);
        $(".diff").show();
    }
})

$(".diff").on("click",()=>{
    if(difficulty==="easy"){
        $('input[value="easy"]').prop("checked",true);
    }
    else{
        $('input[value="medium"]').prop("checked",true);
    }
})


$(".ok").on("click",()=>{
    $(".model").hide();
    let selectedMode=$('input[name="mode"]:checked').val();
    mode=selectedMode;
    let selectedDiff=$('input[name="difficulty"]:checked').val();
    difficulty=selectedDiff;
    $(".diff").text(`Difficulty:${difficulty}`);
    $(".mod").text(`Mode:${mode}`);
    if(mode==="computer"){
        $(".diff").show();
    }else{
        $(".diff").hide();
    }
    
})

const computerTurn=()=>{
    if(!gameOver){
        if(difficulty==="easy"){
            let cTurn=Math.floor(Math.random()*9);
            if($(boxes[cTurn]).text()===""){
                $(boxes[cTurn]).text("X").addClass("x");
                turn="O";
                $(boxes[cTurn]).prop('disabled',true);
            }
            else{
                computerTurn();
            }
        }
        if(difficulty==="medium"){
            for(let pattern of winningPatter){
                let pos1=$(boxes[pattern[0]]).text();
                let pos2=$(boxes[pattern[1]]).text();
                let pos3=$(boxes[pattern[2]]).text();
                let pos1Id=$(boxes[pattern[0]]);
                let pos2Id=$(boxes[pattern[1]]);
                let pos3Id=$(boxes[pattern[2]]);
                if((pos1===pos2||pos2===pos3||pos1===pos3)&&(pos1!==""||pos2!=="")){   
                    if(pos1===pos2 && pos3===""){
                       $(pos3Id).text("X").addClass("x").prop('disabled',true);
                       count++;
                       turn="O"; 
                       checkwinner();
                       return;
                    }
                    else if(pos2===pos3 && pos1===""){
                        $(pos1Id).text("X").addClass("x").prop('disabled',true);
                        count++;
                        turn="O";
                        checkwinner();
                        return;
                    }
                    else if(pos1===pos3 && pos2===""){
                        $(pos2Id).text("X").addClass("x").prop('disabled',true);
                        count++;
                        turn="O";
                        checkwinner();
                        return;
                    }
                }
            }
            let cTurn=Math.floor(Math.random()*9);
            if($(boxes[cTurn]).text()===""){
                $(boxes[cTurn]).text("X").addClass("x");
                count++;
                turn="O";
                $(boxes[cTurn]).prop('disabled',true);
            }
            else{
                computerTurn();
            }

        }
    }
}

boxes.each((index,box) => {
    // console.log($(box).text());
    $(box).on("click",()=>{
        count++;
        $(".turn").show();
        $(".edit").hide();
        if(turn==="O"){
            $(box).text("O").addClass("o");
            turn="X";
            $(box).prop('disabled',true);
            showTurn();
            checkwinner();
            if(mode==="computer"){
                setTimeout(computerTurn,500);
            }
        }else{
            if(mode==="friend"){
                $(box).text("X").addClass("x");
                turn="O";
                $(box).prop('disabled',true);
            }
            showTurn();
            checkwinner();
            // else{
            //     computerTurn();
            // }
        }
        // showTurn();
        // checkwinner();
    })
});

const showTurn=()=>{
    if(turn==="O"){
        $(".turn").text("Turn:O");
    }else{
        $(".turn").text("Turn:X");
    }
}

const checkwinner=()=>{
    
    for(let pattern of winningPatter){
            let pos1=$(boxes[pattern[0]]).text();
            // console.log(pos1);
            let pos2=$(boxes[pattern[1]]).text();
            let pos3=$(boxes[pattern[2]]).text();
            if(pos1!=""&&pos2!=""&&pos3!=""){   
                if(pos1===pos2 && pos2===pos3){
                    winner.text(`winner is ${pos1}`);
                    console.log(`winner is${pos1}`);
                    $(".winnerBackground").show();
                    gameOver=true;
                    return;
                }
            }
        }

    if(count===9){
        winner.text("Tie");
        $(".winnerBackground").show();
    }
    
        
    }


const resetGame=()=>{
     boxes.prop("disabled", false);
     boxes.text("");
     boxes.removeClass("o").removeClass("x")
     count=0;
     turn="O";
     gameOver=false;
     showTurn();
     winner.text("");
     $(".mod").show();
     if(mode==="computer"){
         $(".diff").show();
     }
     $(".winnerBackground").hide();
     $(".turn").hide();
}

reset.on("click",resetGame);
$(".diff").on("click",()=>{
    $(".diffmodel").show();
})
$(".mod").on("click",()=>{
    $(".modemodel").show();
})
