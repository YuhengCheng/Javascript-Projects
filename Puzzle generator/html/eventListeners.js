


document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to submit button
  document.getElementById('get_button').addEventListener('click', handleSubmitButton)
  //PROBLEM 5 Answer part
  document.getElementById('solve_Puzzle').addEventListener('click', handleSolvePuzzle)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  timer = setInterval(handleTimer, 100)

  randomizeWordArrayLocations(words) //PROBLEM 1 ANSWER CODE

  drawCanvas()
})
