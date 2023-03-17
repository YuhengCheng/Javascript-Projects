/*line Check
this file holds the function that is called to verify if the answer on canvas
*/
//checks if canvas is correct
function checkCorrectness(){
    //create a working list to compare wit
    let workWordsC = []
  
    //copy words list
    for (let i = 0; i < words.length; i++) {
        workWordsC.push(words[i])
    }
    //sort veritcally (similar to printing process but instead of printing append to the wokring list)
    workWordsC.sort((a,b)=>a.y - b.y||a.x - b.x)
 
    let checkList=[]
    let workRowC =[]
    let counter = 0;
    workRowC.push(workWordsC.shift())
    while(workWordsC.length != 0){
     if(workWordsC.length != 1){
     if( Math.abs(workRowC[counter].y-workWordsC[0].y) <25){
       workRowC.push(workWordsC.shift())
       counter= counter +1;
     }else{
     workRowC.sort((a,b)=>a.x-b.x)
     checkList=checkList.concat(workRowC)
  
     workRowC = []
     workRowC.push(workWordsC.shift())
     counter = 0;
     } 
   }else{
     workRowC.push(workWordsC.shift());
     workRowC.sort((a,b)=>a.x-b.x)
     checkList=checkList.concat(workRowC)

   }
   } 
   //compare working list with words list
   for (let i = 0; i < words.length; i++) {
        if(!(words[i].word == checkList[i].word)){
            return `red`
        }
    }
    return `green`
   
}

