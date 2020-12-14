(function() {
  
  
  const dayNames = [
      'Monday',
      'Tuesday',
      'Wendsday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'];
  const d = newDate();
  
  // Dátum parts
  const bodyDay = document.querySelector('.container__day');
  const bodyDate = document.querySelector('.container__date');
  
  
  //localstorage handler obj 
  
  const localDB = {
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key,value);
        },
        getItem(key) {
            const value = localStorage.getItem(key);
            if(!value) {
                return  null;
            }

            return JSON.parse(value);
        },
        removeItem(key) {
            localStorage.removeItem(key);
        }

    };

    //init
    const init = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }
        showDate();


    };

    //dátum
    const showDate = () => {
        
        const currentDate = newDate();
        const day = [
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
        ].map( num => num < 10 ? `0${num}`: num);

        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDate.textContent = day.join('-');


    };

    init();
    


})();

loadEvents();
// esemény betöltése
function loadEvents(){
  document.querySelector('form').addEventListener('submit',submit);
  document.getElementById('clear').addEventListener('click',clearList);
  document.querySelector('ul').addEventListener('click',deleteOrTick);

}
// adat submit 
function submit(e){
  e.preventDefault();
  let taskList;
  let input = document.querySelector('input');
  if(input.value != '')
    addTask(input.value);
  input.value = '';
}

// feladat hozzáadás
function addTask(task){
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
  ul.appendChild(li);
  document.querySelector('.tasksBoard').style.display = 'block';
}

// lista törlés
function clearList(e){
  let ul = document.querySelector('ul').innerHTML = '';
}

// pipa törlés
function deleteOrTick(e){
  if(e.target.className == 'delete')
    deleteTask(e);
  else {
    tickTask(e);
  }
}

// feladat töröl
function deleteTask(e){
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);
}

// feladat pipa
function tickTask(e){
  const task = e.target.nextSibling;
  if(e.target.checked){
    task.style.textDecoration = "line-through";
    task.style.color = "#ff0000";
  }else {
    task.style.textDecoration = "none";
    task.style.color = "#2f4f4f";
  }
}