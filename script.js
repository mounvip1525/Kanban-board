//Item Lists
const listColumns=document.querySelectorAll('.drag-item-list');
const backlogList=document.getElementById('backlog-list');
const progressList=document.getElementById('progress-list');
const completeList=document.getElementById('complete-list');
const onHoldList=document.getElementById('on-hold-list');

//Button groups
const addBtns=document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns=document.querySelectorAll('.solid');
const addItemContainers=document.querySelectorAll('.add-container');
const addItems=document.querySelectorAll('.add-item');

let backlogListArray=[];
let progressListArray=[];
let completeListArray=[];
let onHoldListArray=[];
let listArrays=[];

let updatedOnLoad=false;

let draggedItem;
let currentColumn;

//Add to column, reset textbox
function addToColumn(column){
    // console.log(addItems[column].textContent);
    const itemText=addItems[column].textContent;
    const selectedArray=listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent='';
    updateDOM();
}

function showInputBox(column){
    addBtns[column].style.visibility='hidden';
    saveItemBtns[column].style.display='flex';
    addItemContainers[column].style.display='flex';
}
function hideInputBox(column){
    addBtns[column].style.visibility='visible';
    saveItemBtns[column].style.display='none';
    addItemContainers[column].style.display='none';
    addToColumn(column);
}

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
    listEl.draggable=true;
    listEl.setAttribute('ondragstart','drag(event)')
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
         createItemEl(progressList,1,progressItem,index);
     });
      //complete column
    completeList.textContent=''; //set all the initial items ie. testing to dissappear
    completeListArray.forEach((completeItem,index)=>{
        createItemEl(completeList,2,completeItem,index);
    });
     //onHold column
     onHoldList.textContent=''; //set all the initial items ie. testing to dissappear
     onHoldListArray.forEach((onHoldItem,index)=>{
         createItemEl(onHoldList,3 ,onHoldItem,index);
     });
     //Run getSavedColumns only once, update local storage
     updatedOnLoad=true;
     updateSavedColumns();
}

//Allow arrays to reflect the drag and drop items
function rebuildArrays(){
    // console.log(backlogList.children);
    // console.log(progressList.children);
    backlogListArray=[];
    for(let i=0;i<backlogList.children.length;i++){
        backlogListArray.push(backlogList.children[i].textContent);
    }
    progressListArray=[];
    for(let i=0;i<progressList.children.length;i++){
        progressListArray.push(progressList.children[i].textContent);
    }
    completeListArray=[];
    for(let i=0;i<completeList.children.length;i++){
        completeListArray.push(completeList.children[i].textContent);
    }
    onHoldListArray=[];
    for(let i=0;i<onHoldList.children.length;i++){
        onHoldListArray.push(onHoldList.children[i].textContent);
    }
    updateDOM(); 
}

//When item starts dragging, call this function 
function drag(e){
    draggedItem=e.target;
    // console.log(draggedItem);
}
//Enable the droppability in the column
function allowDrop(e){
    e.preventDefault();
}
//When the dragged item enters a valid droppable area
function dragEnter(column){
    // console.log(listColumns[column])
    listColumns[column].classList.add('over');
    currentColumn=column;
}
//Dropping an item in the column
function drop(e){
    e.preventDefault();
    //Remove the padding (highlight)
    listColumns.forEach(listColumn=>{
        listColumn.classList.remove('over');
    });
    //Append the dragged item into the dropped column
    const parent=listColumns[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArrays();
}
updateDOM();

