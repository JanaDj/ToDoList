
// methods 
/**
 * Method to add ToDo list item and buttons to the page
 * Based on the completed parameter, added item will be marked as completed or new 
 * @param {*} toDoToAdd  string, value of the toDo item that is being added 
 * @param {*} completed  bool, if item is already completed or new 
 */
let addListItem = (toDoToAdd, completed) => {
    // add list item
    let addTxt = '';
    // add completed class if passed item is completed 
    if ( completed === true){
        addTxt = `<li class='listItems completedToDo'> ${toDoToAdd}`;
    } else {
        addTxt = `<li class='listItems'> ${toDoToAdd}`;
    }
    // add span with btns
    addTxt += `<span>`;
    addTxt += `<button class="fa fa-arrow-up" aria-hidden="true"></button>`;
    addTxt += `<button class="fa fa-arrow-down" aria-hidden="true"></button>`;
    // disable completed btn if item is completed
    if ( completed === true){
        addTxt += `<button type="button" class="btn btn-success btn-sm disabled">Complete</button>`;
    } else {
        addTxt += `<button type="button" class="btn btn-success btn-sm">Complete</button>`;
    }
    addTxt += `<button type="button" class="btn btn-danger btn-sm">Remove</button>`;
    addTxt += `</span>`;
    addTxt += `</li>`;
    $('#todo-container').append(addTxt);
};
// GETing the data for ToDo list 
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
        // parse response and add items 
        console.log(xhr.responseText);
        let parsedToDo = JSON.parse(xhr.responseText);
        
        // adding each object from parsed json
        $(parsedToDo).each(function(index){
            addListItem(parsedToDo[index].todo, parsedToDo[index].completed);
        });
    }
};
xhr.open("GET", "todos.json", true);
xhr.send();
// button events 
/**
 * OnClick event for the addToDo Btn 
 * it adds new toDo to the list by calling the addListItem function
 */
$('#toDoBtn').on('click', (e) => {
    let newToDoInput = $('#newToDo');
    if (newToDoInput.val() !== ""){
        addListItem(newToDoInput.val(), false);
        $(newToDoInput).val("");
        $(e.target).prop('disabled',true);
    }
});
/**
 * OnClick event for the 'complete' btn of the item
 * once called, it adds a completedToDo class to the li item to mark it as compelete
 * and sets complete btn to disabled since it has been clicked 
 * if clicked again, removes the class compeltedToDo and re-enables the btn 
 */
$('#todo-container').on('click','.btn-success', e => {
    if($(e.target).hasClass('disabled')){
        $(e.target).parent().parent().removeClass('completedToDo');
        $(e.target).removeClass('disabled'); 
    } else {
        $(e.target).parent().parent().addClass('completedToDo');
        $(e.target).addClass('disabled');  
    }  
});
/**
 * Onclick event for the 'remove' btn 
 * It removes the li element for which the button was clicked 
 */
$(`#todo-container`).on('click', '.btn-danger', e => {
    $(e.target).parent().parent().remove(); 
});
/**
 * Input event for the newDto text input
 * Checks if value is entered and if it is add ToDo is enabled, else it is disabled 
 */
$('#newToDo').on('input', e => {
    if($(e.target).val() !== ""){
        $('#toDoBtn').prop('disabled',false);
    }  else {
        $('#toDoBtn').prop('disabled',true);
    }
});
/**
 * Onclick event for the up arrow 
 * function swaps positions of the clicked element with the previous li element
 */
$(`#todo-container`).on('click', '.fa-arrow-up', e => {
    let clickedLi = $(e.target).parent().parent();
    let upperLi = clickedLi.prev();
    $(clickedLi).insertBefore(upperLi);
    
});
/**
 * Onclick event for the down arrow
 * function swaps positions of the clicked element with the next li element
 */
$(`#todo-container`).on('click', '.fa-arrow-down', e => {
    let clickedLi = $(e.target).parent().parent();
    let lowerLi = clickedLi.next();
    $(clickedLi).insertAfter(lowerLi);
});





