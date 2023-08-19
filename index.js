// 1 pet = one animal being added
class Pet {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
}

//  owner information
class owner {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        //array of all pets that get added to owner:
        this.pets = [];
    }

    // add method to class:
    addpet (pet) {
        this.pets.push(pet);
    }

    //to delete pet:
    deletepet(pet) {
        let index = this.pets.indexOf(pet);
        // splice = remove ..... only 1 element will be deleted.
        this.pets.splice(index, 1);
    }
}

// code that will enable us to use classes within html:

// every owner we create will be stored in this array
// use that data to render or draw the new html to DOM
let owners = [];
// each owner gets incrimented:
let ownerId = 0;

onClick('new-owner', () => {
    owners.push(new owner(ownerId++, getValue('new-owner-name')));
    drawDOM();
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    // clear out owner Div
    let ownerDiv = document.getElementById('owners');
    clearElement(ownerDiv);
    //iterate over owner:
    for (owner of owners) {
        // create table for each owner:
        let table = createownerTable(owner);
        let title = document.createElement('h2');
        // built title based off data
        title.innerHTML = owner.name;
        // create a delete button:
        title.appendChild(createownerDeleteButton(owner));
        ownerDiv.appendChild(title);
        ownerDiv.appendChild(table);
        //for table we need to add each pet to owner:
        for (pet of owner.pets) {
            createpetRow(owner, table, pet);
        }
    }
}

// create row:
function createpetRow(owner, table, pet) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = pet.name;
    row.insertCell(1).innerHTML = pet.species;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(owner, pet));
}

// delete row:
function createDeleteRowButton(owner, pet) {
    let btn = document.createElement('button');
    btn.classname = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = owner.pets.indexOf(pet);
        owner.pets.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// owner that will be deleted:
function createownerDeleteButton(owner) {
    let btn = document.createElement('button');
    btn.classname = 'btn btn-primary';
    btn.innerHTML = 'Delete owner';
    btn.onclick = () => {
        let index = owners.indexOf(owner);
        owners.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewpetButton(owner) {
    let btn = document.createElement('button');
    btn.classname = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        owner.pets. push(new Pet(getValue(`name-input-${owner.id}`),
        getValue(`species-input-${owner.id}`)));
        drawDOM();
    };
    return btn;
}

function createownerTable(owner) {
    // create table that will represent owner:
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let speciesColumn = document.createElement('th');
    nameColumn.innerHTML = 'Pet Name';
    speciesColumn.innerHTML = 'species';
    row.appendChild(nameColumn);
    row.appendChild(speciesColumn);
    // place where we can insert new owner pets:
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let speciesTh = document.createElement('th');
    let createTh = document.createElement('th');
    // where name will be inserted:
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${owner.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    // species input:
    let speciesInput = document.createElement('input');
    speciesInput.setAttribute('id', `species-input-${owner.id}`);
    speciesInput.setAttribute('type', 'text');
    speciesInput.setAttribute('class', 'form-control');
    let newpetButton = createNewpetButton(owner);
    nameTh.appendChild(nameInput);
    speciesTh.appendChild(speciesInput);
    createTh.appendChild(newpetButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(speciesTh);
    formRow.appendChild(createTh);
    return table;
}


function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
