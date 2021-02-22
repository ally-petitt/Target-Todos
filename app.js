//add color change to target on hover, but disable event bubbling
//add subtasks when you hover over the task
const colorTheme_div = document.querySelector('.color-theme');
const colorThemes = document.querySelector('.color-theme .hide');
const plusBtn = document.querySelector('.plus-btn');
const saveBtn = document.querySelector('.save-btn');
const taskTemplateContainer = document.querySelector('.task-template-container')
var goal = document.querySelector('.goalEntry');
var subgoal = document.querySelector('.subgoalEntry');
var comment = document.querySelector('.commentEntry')
const targetContainer = document.querySelector('.target-container')
const form = document.querySelector('form');

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
form.addEventListener('submit', createCircle)

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
        taskTemplateContainer.style.display = "none"}, 400)
}

function createCircle(e) {
    e.preventDefault();
    let newCircle = document.createElement('div');
    newCircle.classList.add('circle');
    targetContainer.appendChild(newCircle)
    setSize(newCircle);
    newCircle = saveInfo(e, newCircle);

    form.reset();
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
    var zIndex = (0 - childCount).toString();
    circle.style.zIndex = zIndex;
}