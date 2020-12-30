$(document).ready(function renderPage() {
    // ajax call to madlibz api
    $.ajax( {
        url: 'https://madlibz.herokuapp.com/api/random'
    }).then(function renderUserEntry(result) {
        // API data
        const wordTypes = result.blanks;
        const storyTitle = result.title;
        const storyText = result.value;
        // Generate story button variable with class and id added.
        const storyBtn = $('<button>').text('MadLibz!').addClass('btn').attr('id', 'story-btn');

        // Append start button to start button div line 16.
        $('.story-btn').append(storyBtn);

        // For loop to render word inputs, word type, and random word buttons from the wordTypes array coming from the API.
        for (let i = 0; i < wordTypes.length; i++) {
            // Current word type in the array.
            const blankIndex = wordTypes[i];
            // Reworked code using variables to create the word type, input fields and random buttons. Classes added to each, we can add more or change these if needed.
            const wordTypeField = $('<p>').text(blankIndex).addClass('word-type');
            const wordInputField = $('<input>').addClass('user-input-field');
            const randomWordBtn = $('<button>').text('Random!').addClass('btn random-btn');

            // Append the word type, input and random button on the word-blanks div line 13.
            $('.word-blanks').append(wordTypeField, wordInputField, randomWordBtn);
        };

        // user input stored here
        let userWords = [];
        let userStory = [];

        // render story on click with event listener
        function renderStory(){
            // store user words in array
            $('.user-input-field').each(function(){
                console.log('each user input val: ', $(this).val());
                const wordToPush = $(this).val();
                userWords.push(wordToPush);
            });

            // map the story array and merge with user input 
            // will need to figure out how to make this part asyncronous due to possible api timing issues once live
            const storyP$ = $('<p>');
            storyText.map(function(phrase, index){
                const wordSpan$ = $('<span>').text(userWords[index]);
                if(userWords[index] === ''){  
                    wordSpan$.text('Whoops!').attr('class', 'missing-input');
                }
                storyP$.append(phrase);
                storyP$.append(wordSpan$);
            });

            // change story array to sting
           userStory.toString();

           //added local storage
           localStorage.setItem(storyTitle, JSON.stringify($(storyP$).text()));
            // append title and story
            $('#storyTitle').text(storyTitle);
            $('#madlibzText').append(storyP$);
        };

        // event listener
        $('#story-btn').click(renderStory);
    });

// Array of possible words for each part of speech
const adjectives = ['brave', 'strong', 'bright', 'yellow', 'tall', 'ugly', 'painful', 'depressing', "aggressive", "agreeable", "calm", "delightful", "ambitious", "faithful", "eager", "elegant", "drab", "gentle", "happy", "lazy", "jealous", "mysterious", "gorgeous", "handsome", "magnificent", "plump", "thin", "thick", "unkempt", "jolly", "kind", "fierce", "grumpy", "embarassed", "small", "gigantic", "angry", "silly", "victorious", "polite", "scary", "fun"];

const nouns = ['table', 'finger', 'pirate', 'chair', 'crown', 'man', 'mountain', 'building', 'country', 'airline', 'house', 'ocean', 'speaker', 'clock', 'pen', 'eyes', 'light', 'sun', 'suitcase', 'flowers', 'bed', 'movie', 'train', 'song', 'milk', 'rice', 'tablecloth', 'water', 'food', 'rain', 'sock', 'ship', 'hero', 'baby', 'people', 'history', 'software', 'problem', 'community', 'safety', 'thought', 'boyfriend', 'girlfriend', 'friend', 'army', 'camera', 'week', 'month', 'player', 'technology', 'news', 'department', 'audience'];

const adverbs = ['lovely', 'boldy', 'cheerfully', 'deftly', 'courageously', 'fortunately', 'gracefully', 'gently', 'gleefully', 'honestly', 'devotedly', 'powerfully', 'justly', 'perfectly', 'politely', 'anxiously', 'badly', 'boastfully', 'poorly', 'obnoxiously', 'selfishly', 'warily', 'rudely', 'foolishly', 'hopelessly', 'always', 'eventually', 'rarely', 'seldom', 'usually', 'frequently', 'finally', 'never', 'sometimes', 'quickly', 'tediously', 'accidentally', 'crazily', 'dutifully', 'doubtfully', 'morally', 'madly', 'awkwardly', 'defiantly', 'deliberately', 'doubtfully', 'sharply', 'seriously', 'silently', 'technically', 'shakily'];

const partOfBody = ['abdomen', 'adrenal gland', 'anus', 'arm', 'Adam\'s apple', 'appendix', 'artery', 'ankle', 'back', 'belly button', 'big toe', 'buttocks', 'brain', 'belly', 'bladder', 'body', 'breast', 'calf', 'cheek', 'chest', 'clavicle', 'chin', 'coccyx', 'diaphragm', 'ear', 'eyebrow', 'earlobe', 'elbow', 'eye', 'face', 'femur', 'finger', 'foot', 'fingernail', 'forehead', 'feet', 'groin', 'gums', 'hair', 'heart', 'hand', 'heel', 'head', 'hip', 'iris', 'kidney', 'knee', 'lip', 'leg', 'liver', 'lungs', 'mouth', 'muscle', 'nail', 'nostril', 'navel', 'nipple', 'neck', 'nose', 'palm', 'pupil', 'pinky', 'rectum', 'ribs', 'sacrum', 'skull', 'spinal cord', 'sternum', 'scalp', 'shin', 'skeleton', 'sole', 'spine', 'stomach', 'shoulder', 'skin', 'spleen', 'throat', 'toenail', 'tooth', 'teeth', 'thigh', 'tongue', 'toe', 'uvula', 'vein', 'waist', 'wrist'];

const verbs = ["run", "kick", "travel", "dance", "walk", "paint", "write", "code", "draw", "smuggle", "steal", "kidnap", "think", "drool", "fight", "shoot", "yodle", "sing", "tickle", "create", "bounce", "jump", "seduce", "fly", "bamboozle", "trick", "mop", "wash", "flop", "talk", "splash", "mash"];

const foreignCountry = ["Ireland", "North Korea", "Nicaragua", "Argentina", "South Africa", "India", "Costa Rica", "Mexico", "Australia", "United Arab Emirates", "Thailand", "Somalia", "France", "Russia", "Norway", "Iceland", "China", "United Kingdom", "Canada", "Iran", "Palestine", "Estonia", "Slovenia", "Netherlands", "Belarus", "New Zeland", "Fiji", "Jamacia", "Cuba"];

const animals = ['kangaroo', 'wallaby', 'leopard', 'crocodile', 'alligator', 'swan', 'duck', 'tasmanian devil', 'hawk', 'eagle', 'falcon', 'lion', 'jackal', 'hyena', 'gecko', 'iguana', 'turtle', 'tortoise', 'tiger', 'panther', 'jaguar', 
'cardinal', 'giraffe', 'elephant', 'hippo', 'emu', 'ostrich', 'bull', 'cow', 'ox', 'rhino', 'water buffalo', 'bison', 'dog', 'cat', 'lizard', 'hamster', 'rabbit', 'gerbil', 'racoon', 'jellyfish', 'salmon', 'manta ray', 'tuna', 'dolphin', 'great white shark', 'tiger shark', 'moray eel', 'walrus', 'sea lion', 'seal', 'condor', 'pelican', 'warthog', 'mongoose', 'cobra', 'salamander', 'deer', 'elk', 'moose', 'caribou', 'reindeer', 'bear', 'wolf', 'fox', 'coyote', 'gorilla', 'chimpanzee', 'orangutan', 'bonobo', 'baboon', 'lemur', 'zebra', 'gazelle', 'cougar', 'puma', 'frog', 'toad', 'tarantula', 'black widow', 'brown recluse', 'crab', 'lobster', 'shrimp', 'stingray', 'blue whale', 'orca', 'anaconda', 'python'];

const places = ['Dubai', 'Rishikesh', 'Nosara', 'jungle', 'here', 'there', 'everywhere', 'nowhere', 'your house', 'the garden', 'the park', 'backyard', 'church', 'temple', 'Hogwarts', 'Maine', 'New Castle', 'Amsterdam', 'the cabin', 'the woods', 'heaven', 'outer space', 'inner space', 'Detroit', 'Cancun', 'Neverland', 'colosseum', 'Rome', 'Mount Ida', 'Mount Hood', 'thrift store', 'bookshop', 'drycleaner', 'coffee shop', 'bar', 'deli', 'convenience store', 'gas station', 'grocery store', 'laboratory', 'hair salon', 'hardware store', 'florist', 'bank', 'music store', 'office', 'restaurant', 'lobby', 'room', 'kitchen'];

const typesOfLiquids = ['water', 'soda', 'pop', 'soda pop', 'juice', 'alcohol', 'tea', 'coffee', 'milk', 'soymilk', 'liquid nitrogen', 'wine', 'cider', 'hard cider', 'beer', 'whisky', 'rum', 'gin', 'bourbon', 'vodka', 'almond milk', 'apple juice', 'orange juice', 'bleach', 'soap', 'hand sanitizer', 'coke', 'sprite', 'smoothie', 'milkshake', 'hot chocolate'];

const ingVerbs = ["sleeping", "indoctrinating", "mapping", "pacing", "boxing", "racing", "smashing", "chasing", "crying", "laughing", "dropping", "working", "twerking", "swimming", "diving", "drowning", "skate-boarding", "snow-boarding", "thrashing", "liking", "biking", "hiking", "looking", "finding", "dining", "driving", "trying", "typing", "puking", "joking", "choking", "seeing", "being", "hating", "making", "taking", "faking", "shaking", "smirking", "jerking", "lurking", "staring", "sharing", "caring", "daring", ];

// Function to get Url based on the arrya we pass into it
function constructUrl(array){
  const randomNum = Math.floor(Math.random() * array.length - 1) + 1;
  const randomWord = array[randomNum];
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${randomWord}?key=3151b7fe-956b-4ad6-93df-1f1961de36c4`;
  return url;
}

// Function for ajax call to get synonyms
function getSynFromAjax(partofSpeech, randomURL) {
  console.log(randomURL);
  $.ajax({url: randomURL}).then(function(response){
    const wordResponse = response.find(function(entry){
      return entry.fl === partofSpeech
    });
    synonymArray = wordResponse.meta.syns[0];
    const randomNum = Math.floor(Math.random() * synonymArray.length - 1) + 1;
    console.log(synonymArray[randomNum]);
  })
}


// Where event listeners will go
const randomAdjUrl = constructUrl(adjectives);
const randomNounUrl = constructUrl(nouns);
getSynFromAjax('adjective', randomAdjUrl);
getSynFromAjax('noun', randomNounUrl);





// End documentReady
});