//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page
//define socket's userna,e
let userName = ''
//define what occurs hwne a private msg is recieved
socket.on('serverPrivMsg', function(message) {
  //create dom element with red text to print message
  let msgDiv = document.createElement('div')
  msgDiv.textContent = message
  msgDiv.style.cssText='color:red;'
  document.getElementById('messages').appendChild(msgDiv)
})
//recieve of regular msg
socket.on('serverSays', function(message) {
  let msgDiv = document.createElement('div')
  msgDiv.textContent = message
  document.getElementById('messages').appendChild(msgDiv)
})
//send message function, what occurs when send button is clicked
function sendMessage() {
  //get value from text field
  let message = document.getElementById('msgBox').value.trim()
  //check if user has logged in yet
  if(document.getElementById('msgBox').placeholder == 'Enter a Username'){
    //check if username is valid
    if(message.match("^[A-Za-z0-9]+$")){
      //create connection
      let welcome = document.createElement('div')
      userName = message
      welcome.textContent = 'Connected as '+message
        document.getElementById('messages').appendChild(welcome)
      //join the rooms
      socket.emit('join',userName)
      //update button values
      document.getElementById('msgBox').placeholder = 'Enter a message'
      document.getElementById('send_button').value = 'Send'
      document.getElementById('msgBox').value = ''
      return
    }
    //clear text box
    document.getElementById('msgBox').value = ''
    return
  }else{
    if(message === '') return //do nothing
    //check if it is a private message
    if(message.match(":")){
      //splitting string method was found here https://bobbyhadz.com/blog/javascript-split-string-only-on-first-instance-of-character
        let [key, ...rest] =  message.split(':')
        //join instances other instances of :
        let privMessage =rest.join(':');
        //write on client dom in blue
          let msgDiv = document.createElement('div')
          msgDiv.style.cssText='color:blue;'
          //format text to be sent to specific users
          msgDiv.textContent = userName+': '+privMessage
          document.getElementById('messages').appendChild(msgDiv)
          privMessage = userName+': '+rest.join(':');
          //check if multiple users are involved
          if(key.match(",")){
            //get users
          let keys = key.split(',')
          //emit to those users
          for(let i = 0; i<keys.length;i++){
            socket.emit('privMsg',{user:keys[i].trim(),msg:privMessage})
          }
          document.getElementById('msgBox').value = ''
        }else{
        socket.emit('privMsg',{user:key,msg:privMessage})
        document.getElementById('msgBox').value = ''
        }
    }else{
      //protoccol for regular message
    let msgDiv = document.createElement('div')
    msgDiv.style.cssText='color:blue;'
    msgDiv.textContent = userName+': '+message
    document.getElementById('messages').appendChild(msgDiv)
    socket.emit('clientSays',userName+': '+message)
    document.getElementById('msgBox').value = ''
    }
  }
}
//clear chat by deleting all div elements
function clearChat(){
  const list = document.getElementById("messages");
  let welcome = document.createElement('div')
      welcome.textContent = list.firstChild.textContent
while (list.hasChildNodes()) {
  list.removeChild(list.firstChild);
}
    
        document.getElementById('messages').appendChild(welcome)
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('clear_button').addEventListener('click', clearChat)
  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
