// Your script here.
// Check if the browser supports the SpeechSynthesis API
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      let voices = [];
      let utterance = new SpeechSynthesisUtterance();

      // Fetch available voices and populate the dropdown
      function fetchVoices() {
        voices = synthesis.getVoices();
        const voiceSelect = document.getElementById('voice-select');
        
        // Filter voices that are not deprecated
        const filteredVoices = voices.filter(voice => !voice.deprecated);
        
        // Clear any existing options
        voiceSelect.innerHTML = '';
        
        // Add voices as options
        filteredVoices.forEach(voice => {
          const option = document.createElement('option');
          option.textContent = voice.name;
          option.setAttribute('data-lang', voice.lang);
          option.setAttribute('data-name', voice.name);
          voiceSelect.appendChild(option);
        });
      }

      // Start speaking the entered text
      function startSpeaking() {
        const voiceSelect = document.getElementById('voice-select');
        const selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].getAttribute('data-name');
        const rate = document.getElementById('rate-range').value;
        const pitch = document.getElementById('pitch-range').value;
        const textInput = document.getElementById('text-input').value;
        
        utterance.voice = voices.find(voice => voice.name === selectedVoice);
        utterance.text = textInput;
        utterance.rate = rate;
        utterance.pitch = pitch;

        synthesis.speak(utterance);
      }

      // Stop speaking
      function stopSpeaking() {
        synthesis.cancel();
      }

      // Fetch voices when they are loaded
      synthesis.addEventListener('voiceschanged', fetchVoices);

      // Add event listeners to buttons
      const startButton = document.getElementById('start-button');
      startButton.addEventListener('click', startSpeaking);

      const stopButton = document.getElementById('stop-button');
      stopButton.addEventListener('click', stopSpeaking);
      
      // Fetch voices initially
      fetchVoices();
    } else {
      // SpeechSynthesis API is not supported
      alert('Speech synthesis is not supported in this browser.');
    }
