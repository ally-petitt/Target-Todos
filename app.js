//add color change to target on hover, but disable event bubbling
//make it so that a list comes up and they can drag items in order of 
//importance, and then rearrange the items in the circle to fit the order

const colorTheme_div = document.querySelector('.color-theme');
const colorThemes = document.querySelector('.color-theme .hide');
const plusBtn = document.querySelector('.plus-btn');
const saveBtn = document.querySelector('.save-btn');
const taskTemplateContainer = document.querySelector('.task-template-container')
var goal = document.querySelector('.goalEntry');
var subgoal = document.querySelector('.subgoalEntry');
var comment = document.querySelector('.commentEntry');
var subgoalList = document.querySelector('.subgoalList')
const targetContainer = document.querySelector('.target-container')
const form = document.querySelector('form')
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
form.addEventListener('submit', checkSubmit);
subgoal.addEventListener('keydown', createListItem)
targetContainer.addEventListener('click', showGoalInfo);
targetContainer.addEventListener('mouseover', updateTodoItem);
targetContainer.addEventListener('click', removeGoalInfo);
document.querySelector('body').addEventListener('click', removeGoalInfo);

//functions
function showThemes() {
    colorThemes.classList.remove('shrinkingAnimation')
    colorThemes.classList.add('growingAnimation')
    colorThemes.classList.remove('hide')
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
        form.reset();
        removeBulletPoints();
    }, 400)
}

function checkSubmit(e) {
    e.preventDefault();
    if (document.activeElement.classList.contains('subgoalItem')) {
        return false;
    } else {
        createCircle(e);
        form.reset();
        removeBulletPoints();
    }
}

function createCircle(e) {
    let newCircle = document.createElement('div');
    newCircle.classList.add('circle');
    newCircle.classList.add('dontRemoveGoal');
    targetContainer.appendChild(newCircle)
    setSize(newCircle);
    saveInfo(e, newCircle);
}

function saveInfo(e, newCircle) {
    var goal = e.target[0].value;
    var subgoalList = document.querySelectorAll('.subgoalItem')
    var subgoal = "";
    var comment = document.querySelector('.comments').value

    subgoalList.forEach((subgoalItem) => {
        if(subgoalItem.value == "") {
            return
        }else if (subgoalItem == subgoalList[subgoalList.length - 1]) {
            subgoal = subgoal.concat(subgoalItem.value.toString())
        } else {
            subgoal = subgoal.concat(subgoalItem.value.toString()) + '\n' + '\n'
        }
    })
    newCircle.setAttribute('data-goal', goal);
    newCircle.setAttribute('data-subgoal', subgoal)
    newCircle.setAttribute('data-comment', comment)
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
    var zIndex = (100000 - childCount).toString();
    circle.style.zIndex = zIndex;
}

function updateTodoItem(e) {
    var goal = e.target.getAttribute('data-goal');
    if (goal == null) {
        todoItem.classList.add('emptyTaskText')
    } else {
        todoItem.classList.remove('emptyTaskText');
        todoItem.innerText = goal;
    }
}

function showGoalInfo(e) {
    e.stopPropagation();
    if (e.target.classList.contains('circle')) {
        var goal = e.target.getAttribute('data-goal');
        var subgoal = e.target.getAttribute('data-subgoal');
        var comment = e.target.getAttribute('data-comment');
        document.querySelector('.displayGoal').innerText = goal;
        document.querySelector('.showSubgoalList').innerText = subgoal;
        document.querySelector('.displayComment').innerText = comment;
        appearAnimations();
    }
}

function createListItem(e) {
    if (e.code == "Enter") {
        if (e.target.value.trim() != "") {
            let li = document.createElement('li')
            let textBox = document.createElement('input')
            textBox.setAttribute('type', 'text');
            textBox.classList.add('subgoalItem')
            li.appendChild(textBox);
            document.querySelector('.subgoalList').appendChild(li);
            textBox.focus();
        }
    }
    checkLiDelete(e);
}

function checkLiDelete(e) {
    if (e.code == "Backspace") {
        if (e.target.value == "") {
            if (e.target != subgoalList.firstElementChild.firstElementChild) {
                let textBox = e.target;
                textBox.parentNode.remove();
                textBox.remove()
            }
        }
    }
}

function removeBulletPoints() {
    while (subgoalList.childElementCount > 1) {
        subgoalList.removeChild(subgoalList.lastElementChild)
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
