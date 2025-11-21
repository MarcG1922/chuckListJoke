const buttonFetch = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");
let jokes = [];

const getJokes = async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        if(!response.ok) {
            throw new Error(`ERROR no se pudo obtener el chiste ${response.status}`)
        }
        const data = await response.json();
        jokes.push(data.value);
        saveToLocalStorage(jokes);
        renderJoke(data.value, jokes.length - 1);
    
        return data.value;
    } catch (error) {   
        console.log(`ERROR: ${error.message}`)
    }
}


function renderJoke(joke, index){
    const li = document.createElement("li");
    li.textContent = joke;
    
const deleteButton = document.createElement("button");
deleteButton.textContent = "Eliminar";
deleteButton.style.marginLeft = "10px";
deleteButton.style.backgroundColor = "red";
deleteButton.style.color = "white";

li.appendChild(deleteButton);
jokeList.appendChild(li);

deleteButton.addEventListener("click", () => {
    deleteJoke(index);
});
}


function saveToLocalStorage(jokes) {
  localStorage.setItem("jokes", JSON.stringify(jokes));
}

function loadJokes() {
  const jokes = JSON.parse(localStorage.getItem("jokes")) || [];
  jokes.forEach((joke, index) => renderJoke(joke, index));
}



function deleteJoke(index){
    jokes.splice(index, 1);
    saveToLocalStorage(jokes);
    refreshJokeList();
}

function refreshJokeList(){
    jokeList.innerHTML = "";
    loadJokes();
}

buttonFetch.addEventListener("click", async () => {
   await getJokes()
});