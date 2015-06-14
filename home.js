window.onload = function() {
  // Get a random background.
  var bg = Math.floor((Math.random() * 15) + 1);
  document.body.style.backgroundImage = "url('images/" + bg + ".jpg')";

  // Get a random motivational message.
  var motivation_messages = ["You can do it!", "Soon you'll be home hanging on your couch.", "It's almost the end of the day..", "You're almost there!", "You got this!", "You're amazing!", "At least some amount of time has passed since you last checked...", "...maybe you need a new job?"];
  var random_message = motivation_messages[Math.floor(Math.random() * motivation_messages.length)];

  // Listener for a form submit.
  document.getElementById("save").addEventListener("click", saveOptions);
  // Show and hide form to set options.
  document.getElementById("show-form").addEventListener("click", function() {
    document.getElementById("set-time").style.display = "block";
  })

  // Get the stored time information as variables.
  var stored_hour = localStorage["hour"];
  var stored_minute = localStorage["minute"];
  var stored_ampm = localStorage["ampm"];

  // Get current time and do time magic.
  var now_time = new Date();
  var end_time = new Date();

  end_time.setHours(stored_hour);
  end_time.setMinutes(stored_minute);

  if(stored_hour) {
    if (now_time >= end_time) {
      document.getElementById("message").innerHTML = "GO HOME";
      document.getElementById("message").style.fontSize = "70px";
      document.getElementById("display").innerHTML = "You survived!";
      document.getElementById("motivation").innerHTML = ".. until tomorrow.";
    }
    else {
      var new_time = countdown(end_time);
      document.getElementById("message").innerHTML = "You can leave work in: ";
      if (new_time.hours == 0) {
        if (new_time.minutes == 1) {
          document.getElementById("display").innerHTML = new_time.minutes + " minute";
        }
        else {
          document.getElementById("display").innerHTML = new_time.minutes + " minutes";
        }
      }
      else {
        if (new_time.minutes == 1) {
          document.getElementById("display").innerHTML = new_time.hours + " hours " + new_time.minutes + " minute";
        }
        else {
          document.getElementById("display").innerHTML = new_time.hours + " hours " + new_time.minutes + " minutes";
        }
      }
      document.getElementById("motivation").innerHTML = random_message;
    }
  }
}

// When form is saved.
function saveOptions() {
  // Get user inputs.
  var select_hour = document.getElementById("hour");
  var select_minute = document.getElementById("minute");
  var select_ampm = document.getElementById("ampm");
  // Set options as variables.
  var selected_hour = select_hour.options[select_hour.selectedIndex].value;
  var selected_minute = select_minute.options[select_minute.selectedIndex].value;
  var selected_ampm = select_ampm.options[select_ampm.selectedIndex].value;
  // Store variables in local storage, and convert PM times to military time.
  if ((selected_ampm == "PM") && (selected_hour != 12)) {
    localStorage["hour"] = Number(selected_hour) + 12;
  }
  else {
    localStorage["hour"] = selected_hour;
  }
  localStorage["minute"] = selected_minute;
  localStorage["ampm"] = selected_ampm;
}
