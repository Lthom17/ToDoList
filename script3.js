let alertTracker = {};
let col = 0;
let colList = [];
let day = 'days';
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
      var valid_form = form.checkValidity()

        if (!valid_form) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
        if(valid_form){
        event.preventDefault()
        get_alert()
       }
      }, false)
    })

})()

//removes the divs created in the columns upon neew task added
function removeColumns(colList){
  if (colList.length != 0){
      for (var i = 0; i < colList.length; i++) {
          var c = document.getElementById(colList[i]);
          c.removeChild(c.childNodes[0]);
          col = 0;
    }
  }
}

//tracks the number of columns in grid
function colTracker(col) {
  if (col < 5) {
    col = col +=1
  }
  else {
    col = 1
  };
  return col
}

//checks to see if the column is empty
function isEmpty(column) {
 return document.getElementById(column).innerHTML === ''
}

//calculates the difference in the current date and completed date
function differenceInDays(day1, day2) {
  // One day Time in ms (milliseconds)
    var one_day = 1000 * 60 * 60 * 24
    var diff = Math.ceil((day2.getTime() - day1.getTime())/(one_day));
    return diff;
}

//Sort the dictionary
function sortDict(dict) {
   let item = [];
  // Create items array
   items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
  return first[1] - second[1];
  });

  let tempDict = {};
  for (var i = 0; i < items.length; i++) {
     tempDict[items[i][0]]= items[i][1];
    }
      return tempDict;
}

//make dictionary of task and days to complete
function alertTrack(task, days_to_complete) {
    alertTracker[task] = days_to_complete;
    alertDict = sortDict(alertTracker);
    return alertDict;
}

//function will make sure date is in the future
function checkDate(today, date) {
  var validDate = true;
  if(today >= date) {
      alert("Please select a future date.")
      event.preventDefault();
      event.stopPropagation();
      validDate = false;
    }
    return validDate;
}


//creates and posts alert to page
function get_alert(){
      var message = '';
      removeColumns(colList);
      colList = [];
      var task = document.getElementById('task').value;
      //make date input a date object
      var date =  new Date(document.getElementById('date_to_complete').value.replace(/-/g, '\/'));
      var today = new Date();
      //make sure date is in the future
      var futureDate = checkDate(today, date);

    //  days = document.getElementById('days_to_complete').value;
      if (futureDate){


        var days_to_complete = differenceInDays(today, date);
        let tempDict = alertTrack(task, days_to_complete);

        for (const [key, value] of Object.entries(tempDict)){
              if (value < 3){
                 message = "alert alert-danger"
              }
              else if (value < 7){
                message = "alert alert-warning"
              }else {
                message = "alert alert-secondary"
              }

              const div = document.createElement('div');
              div.className = message + " alert-dismissible fade show"
              col = colTracker(col);
              div.IdName = 'col' + col;
              colList.push(div.IdName);
              div.role = 'alert';
              if (value == 1){
                  day = " day"
              }else{
                day = ' days'
              }
              div.innerHTML= key + ' ' + "<br />"  + value + day + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
              document.getElementById(div.IdName).appendChild(div);
              document.getElementById('myForm').classList.remove('was-validated');
          }
         }
   }
