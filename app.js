const colorTheme_div = document.querySelector('.color-theme');
const colorThemes = document.querySelector('.color-theme .hide');
const plusBtn = document.querySelector('.plus-btn');
const saveBtn = document.querySelector('.save-btn');
const taskTemplateContainer = document.querySelector('.task-template-container')
const targetContainer = document.querySelector('.target-container')
const goalForm = document.querySelector('.submitGoal');
const editForm = document.querySelector('.editForm')
const showTodoItem = document.querySelector('.showTodoItem');
const todoInfo = document.querySelector('.todoInfo');
const todoItem = document.querySelector('.todoItem');
const displayGoal = document.querySelector('.displayGoal');
const displaySubgoal = document.querySelector('.displaySubgoal');
const displayComment = document.querySelector('.displayComment');
const input = document.querySelector('.input');
const inputGoal = document.querySelector('.goal.input')
const checkIcon = document.querySelector('.icon.check'); 
const completedItemsList = document.querySelector('.completedListMain')
const listIcon = document.querySelector('.icon.list')
const mainColorTheme = document.getElementById('mainColorTheme')
const neonGreenTheme = document.getElementById('neonGreenTheme')
const tanColorTheme = document.getElementById('tanColorTheme');
const mixedtheme = document.getElementById('mixedColorTheme')
const boxes = document.getElementsByClassName('box')
const circles = document.getElementsByClassName('circle')
let root = document.documentElement;
var selectedCircle
var circleIndex

//event listeners
if (screen.width >= 768) {
    colorTheme_div.addEventListener('mouseover', showThemes);
    colorTheme_div.addEventListener('mouseout', removeThemes);
    todoItem.defaultValue = "Hover over the target to see your goals..."
}
plusBtn.addEventListener('click', () => {
    if (taskTemplateContainer.style.display == "block") {
        hideTaskTemplate();
    } else {
        showTaskTemplate()
    }
    });
targetContainer.addEventListener('click', showGoalInfo);
targetContainer.addEventListener('click', removeGoalInfo);
document.querySelector('body').addEventListener('click', removeGoalInfo);
document.querySelector('.edit').addEventListener('click', makeEditable);
goalForm.addEventListener('submit', checkSubmit)
checkIcon.addEventListener('click', handleCompletion);
listIcon.addEventListener('click', handleListClick);
mainColorTheme.addEventListener('click', applyMainColors)
neonGreenTheme.addEventListener('click', applyGreenTheme);
tanColorTheme.addEventListener('click', applyTanTheme);
mixedColorTheme.addEventListener('click', applyMixedTheme)

//event listeners for smaller devices
if (screen.width < 768) {
    colorTheme_div.addEventListener('click', () => {
        if (document.querySelector('.color-pallete').classList.contains('hide')) {
            showThemes();
        } else {
            removeThemes();
        }
    })
    listIcon.addEventListener('click', scrollToList)
    alterDefaultText();
}

window.addEventListener('DOMContentLoaded', showDefaultText)

//functions
function showThemes() {
    colorThemes.classList.remove('shrinkingAnimation')
    colorThemes.classList.add('growingAnimation')
    colorThemes.classList.remove('hide');
    document.querySelector('.color-icon').style.color = "var(--font-color)";
}

function removeThemes() {
    colorThemes.classList.add('shrinkingAnimation')
    colorThemes.classList.add('hide');
    colorThemes.classList.remove('growingAnimation')
    document.querySelector('.color-icon').style.color = "var(--secondary-color)";
}

function showTaskTemplate() {
    plusBtn.classList.add('rotate-plus-forward');
    plusBtn.classList.remove('rotate-plus-back');
    taskTemplateContainer.classList.remove('template-exit-anim');
    taskTemplateContainer.style.display = "block";
}

function hideTaskTemplate() {
    plusBtn.classList.add('rotate-plus-back');
    plusBtn.classList.remove('rotate-plus-forward');
    taskTemplateContainer.classList.add('template-exit-anim');
    setTimeout(() => {
        taskTemplateContainer.style.display = "none";
        resetForm();
    }, 400)
}

function checkSubmit(e) {
    e.preventDefault();
    if (document.querySelector('.goal.input').value.trim() == "") {
        underlineRed();
        return false;
    }else {
        createObject();
        createCircle();
        resetForm();
    }
}

function resetForm() {
    goalForm.reset();
    underlineBlack();
    clearText();
}

function clearText() {
    var input = document.getElementsByClassName("input")
    for (textBox of input) {
        textBox.value ="";
    }
}

function createCircle() {
    setEventListeners()
    setSize();
    setZIndex();
    dragNDropCircles();
}

function setEventListeners() {
    for (var i=0; i<circles.length; i++) {
        circles[i].addEventListener('mouseover', showGoalOnHover);
        circles[i].addEventListener('mouseout', decreaseOpacity)
    }
}

var allGoals = []

function createObject() {
    var goalInput = {
        goal: document.querySelector('.goal.input').value,
        subgoal: document.querySelector('.subgoal.input').value,
        comment: document.querySelector('.comments.input').value
    }
    allGoals.push(goalInput);
    readInput();
}

function readInput() {
    targetContainer.innerHTML = '';
    for (var i=0; i<allGoals.length; i++) {
        targetContainer.innerHTML += `
            <div class="circle dontRemoveGoal" draggable="true"></div>`
    }
    setCircleProperties();
}

function setCircleProperties() {
    for (var i=0; i<circles.length; i++) {
        circles[i].info = {
            goal: allGoals[i].goal,
            subgoal: allGoals[i].subgoal,
            comment: allGoals[i].comment
        }
    }
}

function showGoalOnHover(e) {
    for (var i=0; i<circles.length; i++) {
        if (e.target == circles[i]) {
            todoItem.innerText = allGoals[i].goal;
        }
    }
    todoItem.style.opacity = "1";
}

function decreaseOpacity() {
    todoItem.style.opacity = ".7";
}

function setZIndex() {
    var maxZIndex = circles.length + 1;
    for (var i=0; i<circles.length; i++) {
        maxZIndex -= 1 ;  
        circles[i].style.zIndex = maxZIndex.toString();
    }
    document.querySelector('.color-icon').style.zIndex = maxZIndex.toString();
    document.querySelector('.plus-btn').style.zIndex = maxZIndex.toString();
}

function showGoalInfo(e) {
    e.stopPropagation();
    if (e.target.classList.contains('circle')) {
        selectedCircle = e.target;
        appearAnimations();
        setGoalValue()
    }
}

function setGoalValue() {
    for(var i=0; i<circles.length; i++) {
        if (circles[i] == selectedCircle) {
            circleIndex = i;
            displayGoal.innerText = circles[i].info.goal
            displaySubgoal.innerText = circles[i].info.subgoal
            displayComment.innerText = circles[i].info.comment
        }
    }
}

function appearAnimations() {
    todoInfo.classList.remove('fadeDown');
    showTodoItem.classList.remove('fadeUp')
    showTodoItem.classList.add('disappear-anim');
    setTimeout(function() {showTodoItem.style.display = 'none';
    todoInfo.style.display = "flex";
    todoInfo.classList.add('scaleUp')}, 150)
}

function removeGoalInfo(e) { 
    e.stopPropagation();
    if (e.target == document.querySelector('body') || e.target.classList.contains('remove')) {
    removeAnimations();
    addIcons();
    }
}

function removeAnimations() {
    showTodoItem.classList.remove('disappear-anim');
    todoInfo.classList.remove('scaleUp');
    todoInfo.classList.add('fadeDown')
    setTimeout(function() {
        todoInfo.style.display = "none";
        showTodoItem.style.display = "block"
        showTodoItem.classList.add('fadeUp')
    }, 170)
}

function makeEditable() {
    clearIcons();
    submitEditedGoals();
    const editContent = document.getElementsByClassName('editContent');
    var i;
    for (i=0; i < editContent.length; i++) {
        editContent[i].contentEditable = "true";
        editContent[i].setAttribute('role', 'textbox');
        editContent[i].style.borderBottom = "1px solid black"
    }
}

function removeEditAbility() {
    addIcons();
    const editContent = document.getElementsByClassName('editContent');
    var i;
    for (i=0; i<editContent.length; i++) {
        editContent[i].contentEditable = "false";
        editContent[i].setAttribute('role', 'layout');
        editContent[i].style.borderBottom = "none"
    }
}

function submitEditedGoals() {
    editForm.addEventListener('submit', updateGoalDisplay)
}

function clearIcons() {
    const saveEditBtn = document.querySelector('.submitEdit-btn');
    const icons = document.getElementsByClassName('icon-hide')
    icons[0].style.display = "none"
    icons[1].style.display = "none"
    saveEditBtn.style.display = "block";
}

function addIcons() {
    document.querySelector('.submitEdit-btn').style.display = "none";
    const icons = document.getElementsByClassName('icon-hide');
    icons[0].style.display = "inline"
    icons[1].style.display = "inline"
}

function updateGoalDisplay(e) {
    e.preventDefault();
    addIcons();
    removeEditAbility();
    updateProperties();
    setGoalValue();
}

function updateProperties() {
    circles[circleIndex].info = {
        goal: displayGoal.innerText,
        subgoal: displaySubgoal.innerText,
        comment: displayComment.innerText
    }
}

function underlineRed() {
    document.querySelector('.goal-underline').style.backgroundColor = "red"
}

function underlineBlack() {
    document.querySelector('.goal-underline').style.backgroundColor = "var(--secondary-color)"
}

function handleCompletion(e) {
    e.preventDefault();
    removeCircle()
}

function removeCircle() {
    allGoals.splice(circleIndex, 1)
    moveItemToCompleteFolder() 
    removeAnimations();
    selectedCircle.remove();
    resetText();
    setSize();
}

function setSize() {
    let circles = document.getElementsByClassName('circle');
    for (var i=0; i< circles.length; i++) {
        const numPixels = ((i + 1) * 50).toString() + 'px';
        circles[i].style.height = numPixels
        circles[i].style.width = numPixels
    }
}

function resetText() {
    todoItem.innerText = todoItem.defaultValue;
}

function moveItemToCompleteFolder() {
    listAppearAnimation();
    createList();
}

function listAppearAnimation() {
    let listIcon = document.querySelector('.icon.list')
    listIcon.classList.add('listAppear')
}

function createList() {
    const mainListItem = document.createElement('li');
    const nestedCompletedList = document.createElement('ul')
    const nestedSubgoalElem = document.createElement('li');
    const nestedCommentElem = document.createElement('li');
    let liArray = [mainListItem, nestedSubgoalElem, nestedCommentElem, nestedCompletedList]

    appendCompletedListChildren(liArray)
    addCompletedListClassNames(liArray)
    addListValues(liArray)
    showValuesOnClick(liArray)
}

function appendCompletedListChildren(arr) {
    const [main, sub, com, list] = arr;
    const newLine = document.createElement('br')
    completedItemsList.appendChild(main);
    completedItemsList.appendChild(list);
    completedItemsList.appendChild(newLine)
    list.appendChild(sub)
    list.appendChild(com)

}

function addCompletedListClassNames(arr) {
    arr[0].classList.add('completedGoal')
    arr[1].classList.add('completedSubgoal')
    arr[2].classList.add('completedComment');
    arr[3].classList.add('completedListNested')
}

function addListValues(arr) {
    arr[0].innerText = selectedCircle.info.goal
    arr[1].innerText = selectedCircle.info.subgoal
    arr[2].innerText = selectedCircle.info.comment
    for (var i=1; i<3; i++) {
        arr[i].style.display = "none";
        if (arr[i].innerText == "") {
            arr[i].remove();
        } 
        if (arr[3].childElementCount == 0) {
            arr[3].remove()
        }
    }
}

function showValuesOnClick(arr) {
    arr[0].addEventListener('click', () => {
        for (var i=1; i<3; i++) {
            if (arr[i].style.display == "none"){
                arr[i].style.display = "list-item";
            } else {
                arr[i].style.display = "none";
                arr[0].style.cursor = "auto";
            }
        }
    })
}

function handleListClick() {
    const container = document.querySelector('.completedItemsContainer')
    if (container.classList.contains('hide')) {
        container.classList.remove('hide')
        completeListAppearAnimation(container)
    } else {
        completeListDisappearAnimation(container);
        container.classList.add('hide')
    }
}

function completeListAppearAnimation(elem) {
    elem.classList.remove('scaleDown');
    elem.classList.add('fadeUp')
}

function completeListDisappearAnimation(elem) {
    elem.classList.remove('fadeUp');
    elem.classList.add('scaleDown')
}

function applyMainColors() {
    root.style.setProperty('--background-color', "white");
    root.style.setProperty('--box-color', "white");
    root.style.setProperty('--main-color', "red");
    root.style.setProperty('--secondary-color', "#01994d");
    root.style.setProperty('--third-color', "#ddd");
    root.style.setProperty('--font-color', "black");
    handleBoxShadow();
}

function applyTanTheme() {
    root.style.setProperty('--background-color', "#AA8C77");
    root.style.setProperty('--box-color', "#e4e3cc");
    root.style.setProperty('--main-color', "#157F9E");
    root.style.setProperty('--secondary-color', "#332c30");
    root.style.setProperty('--third-color', "#E4E3CC");
    root.style.setProperty('--font-color', "black");
    handleBoxShadow();
}

function applyGreenTheme() {
    root.style.setProperty('--background-color', "rgb(13, 18, 24)");
    root.style.setProperty('--box-color', "white");
    root.style.setProperty('--main-color', "rgb(0, 145, 0)");
    root.style.setProperty('--secondary-color', "pink");
    root.style.setProperty('--third-color', "#aaa");
    root.style.setProperty('--font-color', "var(--background-color)");
    document.querySelector('.underline').style.backgroundColor = "white"
    handleBoxShadow();
}

function applyMixedTheme() {
    root.style.setProperty('--background-color', "#551b17");
    root.style.setProperty('--box-color', "#2a4d53");
    root.style.setProperty('--main-color', "#e4e3cc");
    root.style.setProperty('--secondary-color', "#e4e3cc");
    root.style.setProperty('--third-color', "#bb2321");
    root.style.setProperty('--font-color', "e8e8c6");
    handleBoxShadow();
}

function handleBoxShadow() {
    if (root.style.getPropertyValue('--main-color') == "red") {
        for (var i=0; i<boxes.length; i++) {
            boxes[i].style.boxShadow = "2px 2px 5px var(--third-color)"
        }
    } else {
        for (var i=0; i<boxes.length; i++) {
            boxes[i].style.boxShadow = "none"
        }
    }
}

function alterDefaultText() {
    todoItem.defaultValue = "Click the target to see your goals..."
}

function showDefaultText() {
    todoItem.innerText = todoItem.defaultValue;
}

function scrollToList() {
    const listContainer = document.querySelector('.completedItemsContainer')
    const anchorTag = document.querySelector('.scrollToList');
    if (listContainer.classList.contains('hide')) {
        anchorTag.removeAttribute('href');
    } else {
        anchorTag.setAttribute('href', '#listContainer');
    }
}

//drag-n-drop 
//e.target of all events is the element that is being dragged
//on dragenter, dragover, dragleave or drop, e.target is the element that is a drop target
function dragNDropCircles() {
    for (circle of circles) {
        circle.addEventListener('dragstart', dragStart)
        circle.addEventListener('drop', dropCircle)
        circle.addEventListener('dragover', dragOver)
        circle.addEventListener('dragleave', dragLeave)
    }
}

let index

function dragStart(e) {
    for (var i=0; i < circles.length; i++) {
        if (circles[i] == e.target) 
        index = i
    }
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('changeColor')
}

function dragLeave(e) {
    e.target.classList.remove('changeColor')
}

function dropCircle(e) {
    e.preventDefault();
    e.target.classList.remove('changeColor')
    for (var i=0; i < circles.length; i++) {
        if (circles[i] == e.target) {
            assignNewCircleValues(index, i);
        }
    }
}

function assignNewCircleValues(droppedCircleIndex, recievingCircleIndex) {
    allGoals[droppedCircleIndex] = circles[recievingCircleIndex].info;
    allGoals[recievingCircleIndex] = circles[droppedCircleIndex].info;
    createCircle();
}

