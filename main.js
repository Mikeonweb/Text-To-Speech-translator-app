// init speechSynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const readButton = document.querySelector('.btn');
const body = document.querySelector('body');

// init voices array
let voices = [];

// arrow funtion
const getVoices = () => {
    voices = synth.getVoices();
    
    //loop through each voices and create an option for each one
    voices.forEach(voice => {
        // create an option element
        const option = document.createElement('option')
        //fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    })
};

// call function
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {
    // check if speaking
    if(synth.speaking){
        console.error( 'Already speaking...');
        return;
    }
    if(textInput.value !== ''){
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // add background wave animation
        // body.style.background = 'black url(assets/giphy.gif)';
        // body.style.backgroundRepeat = 'repeat-x';
        // body.style.backgroundSize = '100% 100%';

        // speak end
        speakText.onend = e => {
            console.log('done speaking...');
            body.style.background = 'black';
        }
        //speak error
        speakText.onerror = e => {
            console.error('somethinmg went wrong...');
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak
        synth.speak(speakText);
    }
};

// event listeners

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();

    speak();
    textInput.blur();
});

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
// pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener('change', e => speak());
//speak on button click
readButton.addEventListener('click', e => speak());