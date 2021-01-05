
function renderSavedStories() {
    console.log('we are in renderSavedStories')
    if (localStorage.getItem('stored-stories')) {
        const savedStories = JSON.parse(localStorage.getItem('stored-stories'));
        const keysArray = Object.keys(savedStories);
        keysArray.forEach(function (title) {
            //print the title
            console.log(title);
            //print the story
            console.log(savedStories[title]);
        })
    }

}

$('#view-stories').click(renderSavedStories);