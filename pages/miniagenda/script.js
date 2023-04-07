// Dıgıtal Clock

let time = document.getElementById("time");
let day = document.getElementById("day");

let clock = setInterval(
    function showTime(){
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let dayNum = date.getDay();
        let month = date.getMonth();
        let dateNow = date.getFullYear();

        const weekday = [
            "Pazar",
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi"
        ];
        hour = (hour < 10) ? "0" + hour : hour;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        time.innerHTML = hour + " : " + min + " : " + sec;
        day.innerHTML = dayNum + "." + month + "." + dateNow + " " + weekday[date.getDay()];
    },
    1000
)

// WEATHER APP

const url = "https://api.openweathermap.org/data/2.5/";
const key = '344f7ff7b295d5846be08faf5c51495d';

function setQuery () {
    getResult(searchBar.value)
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;
    
    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;
    
    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;
}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', setQuery);

// Window Onload
window.addEventListener("load", (event) => {
    getResult("ordu")
});

// TO DO LİST
const newTaskInput = document.querySelector("#new-task input");
const tasksPanel = document.querySelector("#tasks");
let deleteTasks;
let editTasks; 
let tasks;
let updateNote = "";
let count;

//Window onload Function
window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

//Function to Display The Tasks
const displayTasks = () => {
  tasksPanel.innerHTML = "";
  //Fetch tasks in local storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();
  for (let key of tasks) {
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;

    if (JSON.parse(value)) {
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
    tasksPanel.appendChild(taskInnerDiv);
  }

  //tasks completed
  tasks = document.querySelectorAll(".task");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      //local storage update
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });
  //Delete Tasks
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

document.querySelector("#push").addEventListener("click", () => {
  if (newTaskInput.value.length == 0) {
    alert("Please Enter A Task");
  } else {
    if (updateNote == "") {
      updateStorage(count, newTaskInput.value, false);
    } else {
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});