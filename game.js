// $(".box").on("click",()=>{
//     $(".winnerBox").show();
// })

let boxes=$(".box");
let reset=$(".reset");
// let reset=$(".reset");
let winner=$(".winner");
let turn="O";
let count=0;
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

boxes.each((index,box) => {
    // console.log($(box).text());
    $(box).on("click",()=>{
        count++;
        if(turn==="O"){
            $(box).text("O");
            turn="X";
             $(box).prop('disabled',true);
        }else{
            $(box).text("X");
            turn="O";
            $(box).prop('disabled',true);
        }
        checkwinner();
    })
});


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
    console.log("here")
    // boxes.each((box=>{
    //     $(box).prop("disabled",false);
    // }))
     boxes.prop("disabled", false);
     boxes.text("");
     count=0;
     turn="O";
     winner.text("");
     $(".winnerBackground").hide();
}

reset.on("click",resetGame);

