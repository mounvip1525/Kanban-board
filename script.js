//Item Lists
const listItems=document.querySelectorAll('.drag-item-list');
const backlogList=document.querySelectorAll('.backlog-list');
const progressList=document.querySelectorAll('.progress-list');
const completeList=document.querySelectorAll('.complete-list');
const onHoldList=document.querySelectorAll('.on-hold-list');

//Button groups
const addBtns=document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns=document.querySelectorAll('.solid');
const addItemContainer=document.querySelectorAll('.add-container');
const addItems=document.querySelectorAll('.add-item');

let backlogListArray=[];
let progressListArray=[];
let completeListArray=[];
let onHoldListArray=[];
let listArrays=[];

//Retrieve from LocalStorage if available or set default values
function getSavedItems(){
    if(localStorage.getItem('backlogItems')){
        backlogListArray=JSON.parse(localStorage.backlogItems);
        progressListArray=JSON.parse(localStorage.progressItems);
        completeListArray=JSON.parse(localStorage.completeItems);
        onHoldListArray=JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}

//Set to LocalStorage
function updateSavedColumns() {
    // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
    // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
    // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
    // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
    listArrays=[backlogListArray,progressListArray,completeListArray,onHoldListArray];
    const arrayNames=['backlog','progress','complete','onHold'];
    arrayNames.forEach((arrayName,index)=>{
        localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[index]));
    });
}

getSavedItems();
updateSavedColumns();

