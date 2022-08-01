 
//  To set the currentDay
 $('#currentDay').text(moment().format('dddd MMMM Do'));

 //Array of working hours
 const workHours = [9,10,11,12,13,14,15,16,17];

 //To get the current time
 let currentHour = moment().format('ha');


// to set Colors dynamically
let timeColor;

// to set past appointments to read only 
let textStatus

//The inner text for each schedule
let scheduleText

//To disable button for past appointments so they cannot be overwritten
let btnStatus

//To get other working hours that are not the current hour
let otherHours


//Iterating over the working hours array
 for(let i =0; i < workHours.length; i++){
     
     otherHours = moment().hours(workHours[i ]).format('ha')

     //To check if appointments are in the past and set them dynamically
    if(moment(otherHours, 'ha').isBefore(moment(currentHour,'ha'))){
        timeColor = 'past'
        scheduleText = localStorage.getItem(moment().hours(workHours[i]).format('ha')) || ''
        textStatus = 'readonly'
        btnStatus = 'disabled'
    }
  
    //To set the currenthour styles and text
    else if(otherHours === currentHour){
        timeColor = 'present'
        scheduleText = localStorage.getItem(moment().hours(currentHour).format('ha')) || ''
        textStatus = ''
        btnStatus = ''
    }

    //To set future styles and text
    else{
        timeColor = 'future'
        scheduleText = localStorage.getItem(moment().hours(workHours[i]).format('ha')) || ''
    }

    //To select the container and create a row for each element
    $('.container').append(`
    <div class="row my-1">
    <p class="col-2 col-md-1 hour">
        ${otherHours}
    </p>
    <textarea  class=" description ${timeColor} col-8 col-md-10" ${textStatus}>${scheduleText}</textarea>
    <button class="col-2 btn saveBtn col-md-1" ${btnStatus}><i class="fas fa-save"></i></button>
  </div> </div>`)
 }

 // variable to store selected textarea values
let textAreaText
 // variable to time of the selected textarea values
let timeSelected

//To listen for click events on the save btn and save text to the local storage
$('.container').on('click','.saveBtn', function(){
    textAreaText = $(this).siblings('textarea').val().trim();
    timeSelected = $(this).siblings('p').text().trim();
    localStorage.setItem(timeSelected,textAreaText)
})




