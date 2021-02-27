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
var selectedCircle

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
targetContainer.addEventListener('click', showGoalInfo);
targetContainer.addEventListener('click', removeGoalInfo);
document.querySelector('body').addEventListener('click', removeGoalInfo);
document.querySelector('.edit').addEventListener('click', makeEditable);
goalForm.addEventListener('submit', checkSubmit)
checkIcon.addEventListener('click', handleCompletion)

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
    if (document.querySelector('.goal.input').innerText.trim() == "") {
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
    clearText();
}

function clearText() {
    var input = document.getElementsByClassName("input")
    for (textBox of input) {
        textBox.innerText ="";
    }
}

function createCircle(e) {
    let newCircle = document.createElement('div');
    newCircle.classList.add('circle');
    newCircle.classList.add('dontRemoveGoal');
    targetContainer.appendChild(newCircle);
    setSize(newCircle);
    setZIndex();
    addAttributes(newCircle);
    setEventListeners(newCircle)
}

function setEventListeners(circle) {
    circle.addEventListener('mouseover', showGoalOnHover);
    circle.addEventListener('mouseout', decreaseOpacity)
}

function addAttributes(circle) {
    selectedCircle = circle;
    const goalInput = document.querySelector('.goal.input').innerText;
    const subgoalInput = document.querySelector('.subgoal.input').innerText;
    const commentInput = document.querySelector('.comments.input').innerText;
    circle.setAttribute('data-goal', goalInput)
    circle.setAttribute('data-subgoal', subgoalInput)
    circle.setAttribute('data-comment', commentInput)
}

function showGoalOnHover(e) {
    todoItem.innerText = e.target.getAttribute('data-goal')
    todoItem.style.opacity = "1";
}

function decreaseOpacity() {
    todoItem.style.opacity = ".7";
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
    for (var i=0; i< circles.length; i++) {
        var currentZIndex =window.document.defaultView.getComputedStyle(circles[i]).getPropertyValue('z-index')
        newZIndex = parseInt(currentZIndex) + 1;
        circles[i].style.zIndex = newZIndex.toString();
    }
    var iconZIndex = parseInt(newZIndex) + 1;
    document.querySelector('.color-icon').style.zIndex = iconZIndex
    document.querySelector('.plus-btn').style.zIndex = iconZIndex
}

function showGoalInfo(e) {
    e.stopPropagation();
    if (e.target.classList.contains('circle')) {
        appearAnimations();
        setGoalValue(e)
    }
}

function setGoalValue(e) {
    displayGoal.innerText = selectedCircle.getAttribute('data-goal');
    displaySubgoal.innerText = selectedCircle.getAttribute('data-subgoal');
    displayComment.innerText = selectedCircle.getAttribute('data-comment');
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
    resetGoalInfo();
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

function makeEditable(e) {
    selectedCircle = e.target
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
    updateAttributes();
    setGoalValue();
}

function updateAttributes() {
    const goal = displayGoal.innerText
    const subgoal = displaySubgoal.innerText
    const comment = displayComment.innerText
    selectedCircle.setAttribute('data-goal', goal)
    selectedCircle.setAttribute('data-subgoal', subgoal)
    selectedCircle.setAttribute('data-comment', comment)
}

function underlineRed() {
    document.querySelector('.goal.input').style.borderBottom = "2px solid red"
}

function underlineBlack() {
    document.querySelector('.goal.input').style.borderBottom = "2px solid black"
}

function handleCompletion(e) {
    e.preventDefault();
    clearIcons();
    enableGoalCrossout();
    submitCompleteGoals();
}

function enableGoalCrossout() {
    let inputBoxes = document.getElementsByClassName('editContent');
    for (inputBox of inputBoxes) {
        inputBox.addEventListener('click', e => {
            if (e.target.style.textDecoration == "none") {
                let completed = setCompleteStatus(e);
                crossoutGoal(completed)
            } else {
                let incomplete = removeCompleteStatus(e);
                uncrossGoal(incomplete)
            }
        })
    }
}

function updateTextDecoration() {
    let completed = getCompleteStatus();
    crossoutGoal(completed)
    let incomplete = getIncompleteStatus();
    uncrossGoal(incomplete)
}

function crossoutGoal(completedItems) {
    for(item of completedItems) {
        let selectedSpan = item;
        selectedSpan.style.textDecoration = 'line-through';
    }
}

function uncrossGoal(incompleteItems) {
    for(item of incompleteItems) {
        let selectedSpan = item;
        selectedSpan.style.textDecoration = 'none';
    }
}

function submitCompleteGoals() {
    editForm.addEventListener('submit', e => {
        e.preventDefault();
        removeCircle(e);
        resetCircleSize();
    });
}

function removeCircle(e) {
    if (displayGoal.style.textDecoration == "line-through") {
        moveItemToCompleteFolder() 
        selectedCircle.remove();
        removeAnimations();
        resetGoalInfo();
    }
}

function resetCircleSize() {

}

function moveItemToCompleteFolder() {
    listAppearAnimation();
}

function listAppearAnimation() {
    let listIcon = document.querySelector('.icon.list')
    listIcon.classList.add('listAppear')
}

function resetGoalInfo() {
    addIcons();
}

