 $('#currentDay').text(moment().format('dddd MMMM Do'));
 const workHours = [9,10,11,12,13,14,15,16,17];
 let currentHour = moment().format('ha');
//  moment().format('ha');

let timeColor;
let timeHr;
let textStatus
let scheduleText
let btnStatus
let otherHours
let exactTime

 for(let i =0; i < workHours.length; i++){
     
     otherHours = moment().hours(workHours[i ]).format('ha')

    if(moment(otherHours, 'ha').isBefore(moment(currentHour,'ha'))){
        timeColor = 'past'
        scheduleText = localStorage.getItem(moment().hours(workHours[i]).format('ha')) || ''
        textStatus = 'readonly'
        btnStatus = 'disabled'
    }
  
    else if(otherHours === currentHour){
        timeColor = 'present'
        scheduleText = localStorage.getItem(moment().hours(currentHour).format('ha')) || ''
        textStatus = ''
        btnStatus = ''
    }
    else{
        timeColor = 'future'
        scheduleText = localStorage.getItem(moment().hours(workHours[i]).format('ha')) || ''
    }

    $('.container').append(`
    <div class="row my-1">
    <p class="col-2 col-md-1 hour">
        ${otherHours}
    </p>
    <textarea  class=" description ${timeColor} col-8 col-md-10" ${textStatus}>${scheduleText}</textarea>
    <button class="col-2 btn saveBtn col-md-1" ${btnStatus}><i class="fas fa-save"></i></button>
  </div> </div>`)
 }


 
let textAreaText
let timeSelected

$('.container').on('click','.saveBtn', function(){
    textAreaText = $(this).siblings('textarea').val().trim();
    timeSelected = $(this).siblings('p').text().trim();
    localStorage.setItem(timeSelected,textAreaText)
})




