const savedStories = JSON.parse(localStorage.getItem('stored-stories'));

function renderSavedStories() {
    console.log('we are in renderSavedStories')
    if (localStorage.getItem('stored-stories')) {
        const savedStories = JSON.parse(localStorage.getItem('stored-stories'));
        const keysArray = Object.keys(savedStories);
        keysArray.forEach(function (title) {
            //Print the title
            console.log(title);
            // render button 
            var storyButton = $("<button>").text(title).val(title).addClass("viewStories");
            $("#savedStories").append(storyButton);
            //Print the story
            console.log(savedStories[title]);
        })
    }
}

renderSavedStories();

$(".viewStories").on("click", function() {
    $("#savedRenderedStories").empty();
    console.log(this);
    var savedStory = savedStories[$(this).val()]
    console.log(savedStory)
    var pTag = $("<p>").text(savedStory);   
    $("#savedRenderedStories").append(pTag);

})