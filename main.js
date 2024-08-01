function getAllChores() {
    var storedChores = localStorage.getItem("chores");
    if (storedChores) {
        return JSON.parse(storedChores);
    } else {
        return [];
    }
}

function getAllFinishedChores() {
    var storedChores = localStorage.getItem("finishedChores");
    if (storedChores) {
        return JSON.parse(storedChores);
    } else {
        return [];
    }
}

function addChore(chore) {
    var chores = getAllChores();
    chores.push(chore);
    localStorage.setItem("chores", JSON.stringify(chores));
    return chores.length - 1;
}

function removeChore(id) {
    var chores = getAllChores();
    if (id >= 0 && id < chores.length) {
        chores.splice(id, 1);
        localStorage.setItem("chores", JSON.stringify(chores));
    }
}

function markAsDone(id) {
    var chores = getAllChores();
    var finishedChores = getAllFinishedChores();
    
    if (id >= 0 && id < chores.length) {
        var chore = chores.splice(id, 1)[0];
        finishedChores.push(chore);
        
        localStorage.setItem("chores", JSON.stringify(chores));
        localStorage.setItem("finishedChores", JSON.stringify(finishedChores));
    }
}

function initializeReading() {
    var insertionbutton = document.getElementById("insertionbutton");
    var insertionBox = document.getElementById("insertionBox");

    insertionbutton.addEventListener("click", function () {
        var inputvalue = insertionBox.value;
        if (inputvalue.trim() === "") {
            alert("Please enter a chore.");
            return;
        }
        addChore(inputvalue);
        insertionBox.value = "";
        loadChoresFromLocalStorage();
    });

    insertionBox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            var inputvalue = insertionBox.value;
            if (inputvalue.trim() === "") {
                alert("Please enter a chore.");
                return;
            }
            addChore(inputvalue);
            insertionBox.value = "";
            loadChoresFromLocalStorage();
        }
    });

    loadChoresFromLocalStorage();
}

function loadChoresFromLocalStorage() {
    var choresList = document.getElementById("choresList");
    var finishedChoresList = document.getElementById("finishedChoresList");

    choresList.innerHTML = "";
    finishedChoresList.innerHTML = "";

    var choresArray = getAllChores();
    var finishedChoresArray = getAllFinishedChores();

    choresArray.forEach(function (chore, index) {
        var listItem = document.createElement("li");
        listItem.textContent = chore;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            removeChore(index);
            loadChoresFromLocalStorage();
        });

        var markAsDoneButton = document.createElement("button");
        markAsDoneButton.textContent = "Done";
        markAsDoneButton.addEventListener("click", function () {
            markAsDone(index);
            loadChoresFromLocalStorage();
        });

        listItem.appendChild(markAsDoneButton);
        listItem.appendChild(removeButton);
        choresList.appendChild(listItem);
    });

    finishedChoresArray.forEach(function (chore) {
        var listItem = document.createElement("li");
        listItem.textContent = chore;
        finishedChoresList.appendChild(listItem);
    });
}

initializeReading();
