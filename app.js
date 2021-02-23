//add color change to target on hover, but disable event bubbling
//add subtasks when you hover over the task
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
targetContainer.addEventListener('mouseover', collectGoalInfo);
subgoal.addEventListener('keydown', createListItem)

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
    targetContainer.appendChild(newCircle)
    setSize(newCircle);
    newCircle = saveInfo(e, newCircle);
}

function saveInfo(e, newCircle) {
    goal = e.target[0].value;
    subgoal = e.target[1].value;
    comment = e.target[2].value;
    newCircle.setAttribute('data-goal', goal);
    newCircle.setAttribute('data-subgoal', subgoal)
    newCircle.setAttribute('data-comment', comment)
    return newCircle
}

function setSize(circle) {
    var childCount = targetContainer.childElementCount;
    if (childCount == 1) {
        circle.style.cssText = "height: 50px; width: 50px;"
    } else {
        var size = (childCount * 50).toString() + "px"
        circle.style.height = size;
        circle.style.width = size;
    }
    var zIndex = (100000 - childCount).toString();
    circle.style.zIndex = zIndex;
}

function collectGoalInfo(e) {
    var x = e.clientX, y = e.clientY;
    let elementUnderMouse = document.elementFromPoint(x, y);
    let goal = elementUnderMouse.getAttribute('data-goal');
    let subgoal = elementUnderMouse.getAttribute('data-subgoal');
    let comment = elementUnderMouse.getAttribute('data-comment');
    updateTodoItem(goal);
    targetContainer.addEventListener('click', function() {
        showGoalInfo(goal, subgoal, comment)
    })
}

function updateTodoItem(goal) {
    var todoItem = document.querySelector('.todoItem')
    if (goal == null) {
        todoItem.classList.add('emptyTaskText')
    } else {
        todoItem.classList.remove('emptyTaskText');
        todoItem.innerText = goal;
    }
}

function showGoalInfo(goal, subgoal, comment) {
    console.log(subgoal, comment);
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
}

function removeBulletPoints() {
    while (subgoalList.childElementCount > 1) {
        subgoalList.removeChild(subgoalList.lastElementChild)
    }
}

