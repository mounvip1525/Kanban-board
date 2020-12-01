//Item Lists
const listItems=document.querySelectorAll('.drag-item-list');
const backlogList=document.getElementById('backlog-list');
const progressList=document.getElementById('progress-list');
const completeList=document.getElementById('complete-list');
const onHoldList=document.getElementById('on-hold-list');

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

let updatedOnLoad=false;

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

//Create DOM elements for each list item
function createItemEl(columnName,columnNo,item,index){
    console.log('column Name: ',columnName);
    console.log('column Num: ',columnNo);
    console.log('item: ',item);
    console.log('index: ',index);

    //List item
    const listEl=document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent=item;
    columnName.append(listEl);
}
function updateDOM(){
    //Check local storage
    if (!updatedOnLoad){
        getSavedItems();
    }
    //Backlog column
    backlogList.textContent=''; //set all the initial items ie. testing to dissappear
    backlogListArray.forEach((backlogItem,index)=>{
        createItemEl(backlogList,0,backlogItem,index);
    });
     //progress column
     progressList.textContent=''; //set all the initial items ie. testing to dissappear
     progressListArray.forEach((progressItem,index)=>{
         createItemEl(progressList,0,progressItem,index);
     });
      //complete column
    completeList.textContent=''; //set all the initial items ie. testing to dissappear
    completeListArray.forEach((completeItem,index)=>{
        createItemEl(completeList,0,completeItem,index);
    });
     //onHold column
     onHoldList.textContent=''; //set all the initial items ie. testing to dissappear
     onHoldListArray.forEach((onHoldItem,index)=>{
         createItemEl(onHoldList,0,onHoldItem,index);
     });
}

updateDOM();

