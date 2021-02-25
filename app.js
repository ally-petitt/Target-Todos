//add color change to target on hover, but disable event bubbling
//make it so that a list comes up and they can drag items in order of 
//importance, and then rearrange the items in the circle to fit the order

const colorTheme_div = document.querySelector('.color-theme');
const colorThemes = document.querySelector('.color-theme .hide');
const plusBtn = document.querySelector('.plus-btn');
const saveBtn = document.querySelector('.save-btn');
const taskTemplateContainer = document.querySelector('.task-template-container')
var subgoal = document.querySelector('.subgoalEntry');
var comment = document.querySelector('.commentEntry');
var subgoalList = document.querySelector('.subgoalList');
const targetContainer = document.querySelector('.target-container')
const goalForm = document.querySelector('.submitGoal');
const editForm = document.querySelector('.editForm')
const showTodoItem = document.querySelector('.showTodoItem');
const todoInfo = document.querySelector('.todoInfo');
const todoItem = document.querySelector('.todoItem')

//event listeners
colorTheme_div.addEventListener('mouseover', showThemes);
colorTheme_div.addEventListener('mouseout', removeThemes);
plusBtn.addEventListener('click', () => {
    if (taskTemplateContainer.style.display == "block") {
        hideTaskTemplate();
    } else {
        showTaskTemplate()
    }
    });
goalForm.addEventListener('submit', checkSubmit);
targetContainer.addEventListener('click', showGoalInfo);
// targetContainer.addEventListener('mouseover', updateTodoItem);
targetContainer.addEventListener('click', removeGoalInfo);
document.querySelector('body').addEventListener('click', removeGoalInfo);
document.querySelector('.edit').addEventListener('click', makeEditable);
editForm.addEventListener('submit', updateInfo)

//functions
function showThemes() {
    colorThemes.classList.remove('shrinkingAnimation')
    colorThemes.classList.add('growingAnimation')
    colorThemes.classList.remove('hide');
}

function removeThemes() {
    colorThemes.classList.add('shrinkingAnimation')
    colorThemes.classList.add('hide');
    colorThemes.classList.remove('growingAnimation')
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
  if   (document.querySelector('.goal.input').innerText.trim() == "") {
        underlineRed();
        return false;
    }else {
        createCircle(e);
        resetForm();
    }
}

function resetForm() {
    goalForm.reset();
    underlineBlack();
}

function createCircle(e) {
    let newCircle = document.createElement('div');
    newCircle.classList.add('circle');
    newCircle.classList.add('dontRemoveGoal');
    targetContainer.appendChild(newCircle)
    setSize(newCircle);
    setZIndex();
    addEventListeners(newCircle);
}

function addEventListeners(circle) {
    console.log('event listener')
    circle.addEventListener('mouseover', () => {
        circle.style.backgroundColor = "black";
        updateTodoItem();
    })
    circle.addEventListener('mouseout', () => {
        circle.style.backgroundColor = "red";
    })
}

function setSize(circle) {
    var childCount = targetContainer.childElementCount;
    if (childCount == 1) {
        circle.style.cssText = "height: 50px; width: 50px;"
    } else {
        var numPixels = childCount * 50;
        var size = numPixels.toString() + "px"
        if (numPixels > 300) {
            targetContainer.style.height = size;
        }
        circle.style.height = size;
        circle.style.width = size;
    }
}

function setZIndex() {
    var newZIndex;
    var circles = targetContainer.children;
    //task-template-container, and color-theme
    for (var i=0; i< circles.length; i++) {
        var currentZIndex =window.document.defaultView.getComputedStyle(circles[i]).getPropertyValue('z-index')
        newZIndex = parseInt(currentZIndex) + 1;
        circles[i].style.zIndex = newZIndex.toString();
    }
    var iconZIndex = parseInt(newZIndex) + 1;
    document.querySelector('.color-icon').style.zIndex = iconZIndex
    document.querySelector('.plus-btn').style.zIndex = iconZIndex
}

function updateTodoItem() {
    var goal = document.querySelector('.goal.input').value;
    console.log(goal)
    if (goal == null) {
        todoItem.classList.add('emptyTaskText');
    } else {
        todoItem.classList.remove('emptyTaskText');
        todoItem.innerText = goal;
    }
}

function showGoalInfo(e) {
    e.stopPropagation();
    if (e.target.classList.contains('circle')) {
        appearAnimations();
        setGoalInfo(e);
    }
}

function setGoalInfo(e) {
    const inputGoal = e.target.firstElementChild.value
    for (var i=0; i<e.target.childNodes.length; i++) {
        if (e.target.childNodes[i].classList.contains('inputSubgoal')) {
            console.log(e.target.childNodes[i].value)
        }
    }

    document.querySelector('.displayGoal').innerText = inputGoal;
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
    const editContent = document.getElementsByClassName('editContent');
    var i;
    for (i=0; i < editContent.length; i++) {
        editContent[i].contentEditable = "true";
        editContent[i].setAttribute('role', 'textbox');
        editContent[i].style.borderBottom = "1px solid black"
    }

    document.querySelector('.subgoalItem.hide').style.visibility = "visible";
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
    document.querySelector('.subgoalItem.hide').style.visibility = "hidden"
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

function updateInfo(e) {
    e.preventDefault();
    addIcons();
    removeEditAbility();
}

function underlineRed() {
    const underline = document.querySelector('.task-template-underline');
    underline.style.backgroundColor = "red";
}

function underlineBlack() {
    const underline = document.querySelector('.task-template-underline');
    underline.style.backgroundColor = "black";
}