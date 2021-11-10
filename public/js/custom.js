// Set the date we're counting down to
var countDownDate = new Date("Oct 1, 2020 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML =hours;
  document.getElementById("minuites").innerHTML =minutes;
  document.getElementById("seconds").innerHTML =seconds;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    document.getElementById("days").innerHTML = "00";
  document.getElementById("hours").innerHTML ="00";
  document.getElementById("minuites").innerHTML ="00";
  document.getElementById("seconds").innerHTML ="00";
  }
}, 1000);

var Api_url="http://localhost:9000/";
function Get_User_Details(JM_ID)
{
  let inserted_id=0;
  let API_url=Api_url+"Api/userDetails";
  var JSONdata  = {           
      JM_ID:JM_ID            
    };	
  fetch(API_url, {
  method: 'post',
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(JSONdata)
    }).then(function(response) {
      return response.json();
    }).then(data => {       
      if(data.status===1)
        {    
          
        }
        else
        {

        }          

  });
}
