
function handleSubmitButton() {
  //get user input and print it to text area
  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {
  
    let textDiv = document.getElementById("text-area")
    document.getElementById("text-area").style.color = "black"
   
    textDiv.innerHTML =  `<p> ${userText}</p>`
  


    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);
    //request file
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("data: " + this.responseText)
        console.log("typeof: " + typeof this.responseText)
        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)
        console.dir(responseObj) //pretty print response data to console.
  
        //add text on file
        if (responseObj.puzzleLines) {
          words = [] //clear words on canvas
          for (line of responseObj.puzzleLines) {
            lineWords = line.split(" ")
            for (w of lineWords) {
              let word = {
                word: w
              }
              assignRandomIntCoords(word, canvas.width, canvas.height)
              words.push(word)
            }
          }
        }
        //==============================

        drawCanvas()
      }

    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

//solve function
function handleSolvePuzzle() {
  //get the text area and check if the canvas is correct
  let textDiv = document.getElementById("text-area")
  document.getElementById("text-area").style.color = checkCorrectness()
//clear the area
  textDiv.innerHTML = ''
  //create a duplicate copy of the list so we dont mess up the order read in for future checks
  let workWords = []
  
  for (let i = 0; i < words.length; i++) {
    workWords.push(words[i])
 }
 workWords.sort((a,b)=>a.y - b.y||a.x - b.x)
 //create a list that holds a row to print to text area
 let workRow =[]
 //counter to hold index of the work row
 let counter = 0;
 //add to workRow and take first from work List
 workRow.push(workWords.shift())
 while(workWords.length != 0){
  if(workWords.length != 1){
    //check if its "inline"
  if( Math.abs(workRow[counter].y-workWords[0].y) <25){
    workRow.push(workWords.shift())
    counter= counter +1;
  }else{
    //if next element is not in line then sort the order left to right then print.
  workRow.sort((a,b)=>a.x-b.x)
  textDiv.innerHTML = textDiv.innerHTML + `<p>`
  for (let i = 0; i < workRow.length; i++) { 
    let data = workRow[i]
   textDiv.innerHTML = textDiv.innerHTML +data.word + ` `
  }
  textDiv.innerHTML = textDiv.innerHTML + `</p>`
  workRow = []
  workRow.push(workWords.shift())
  counter = 0;
  } 
}else{
//if it is last element sort the list
  workRow.push(workWords.shift());
  workRow.sort((a,b)=>a.x-b.x)
  textDiv.innerHTML = textDiv.innerHTML + `<p>`
  for (let i = 0; i < workRow.length; i++) { 
    let data = workRow[i]
   textDiv.innerHTML = textDiv.innerHTML +data.word + ` `
  }
  textDiv.innerHTML = textDiv.innerHTML + `</p>`
}
}

 }
 

  

//=====================================================
