let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let data = [{}];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  addData();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let renderTasks = () => {
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.task}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);renderTasks()" data-id=${x.id} class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let addData = () => {
  fetch(`http://localhost:3000/task/addtask`, {
    method: "POST",
    body: JSON.stringify({
      task: textInput.value,
      date: dateInput.value,
      description: textarea.value,
    }),
  })
    .then((result) => {
      //return result.json();
      console.log("Added task");
      console.log(result);
      getAllTasks();
    })
    .catch((err) => {
      console.log("Could not fetch acceptData data");
      console.error(err);
    });
};

let deleteTask = (e) => {
  console.log(e);
  const id = e.dataset.id;
  console.log(id);
  fetch(`http://localhost:3000/task/delete/${id}`, {
    method: "DELETE",
    mode: "cors",
  })
    .then((result) => {
      // return result.json();
      console.log(result);
      getAllTasks();
    })
    .then((fetchedData) => {
      // data = fetchedData.todos;
      // console.log(data);
      // e.parentElement.parentElement.remove();
      // data.splice(e.parentElement.parentElement.id, 1);
      //   localStorage.setItem("data", JSON.stringify(data));
      getAllTasks();

      console.log(fetchedData);
    })
    .catch((err) => {
      console.log("Could not fetch deleteTask data");
      console.error(err);
    });
};

let editTask = (e) => {
  console.log(e);
  fetch(`http://localhost:3000/task/${id}`)
    .then((result) => {
      return result.json();
    })
    .then((fetchedData) => {
      data = fetchedData.todos;
      console.log(data);
      let selectedTask = e.parentElement.parentElement;

      textInput.value = selectedTask.children[0].innerHTML;
      dateInput.value = selectedTask.children[1].innerHTML;
      textarea.value = selectedTask.children[2].innerHTML;
    })
    .catch((err) => {
      console.log("Could not fetch editTasks data");
      console.error(err);
    });

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

function getAllTasks() {
  //The first spot your app should try to fetch the data
  data = JSON.parse(localStorage.getItem("data")) || [];
  //We would like to get that data from our server instead of localStorage, if possible

  fetch(`http://localhost:3000/task/list`)
    .then((result) => {
      return result.json();
    })
    .then((fetchedData) => {
      data = fetchedData.todos;
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      renderTasks();
    })
    .catch((err) => {
      console.log("Could not fetch previous data");
      console.error(err);
    });
}

getAllTasks();
