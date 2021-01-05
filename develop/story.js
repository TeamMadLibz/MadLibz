function renderSavedStories() {
    console.log('we are in renderSavedStories')
    if (localStorage.getItem('stored-stories')) {
        const savedStories = JSON.parse(localStorage.getItem('stored-stories'));
        const keysArray = Object.keys(savedStories);
        keysArray.forEach(function (title) {
            //Print the title
            console.log(title);
            //Print the story
            console.log(savedStories[title]);
        })
    }
}

renderSavedStories();