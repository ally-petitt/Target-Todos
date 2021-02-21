//add color change to target on hover, but disable event bubbling
const colorTheme_div = document.querySelector('.color-theme');
const colorThemes = document.querySelector('.color-theme .hide');

colorTheme_div.addEventListener('mouseover', showThemes);
colorTheme_div.addEventListener('mouseout', removeThemes);

function showThemes() {
    colorThemes.classList.remove('hide')
}

function removeThemes() {
    colorThemes.classList.add('hide');
}

