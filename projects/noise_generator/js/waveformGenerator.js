// This object represent the waveform generator
var WaveformGenerator = {
    // The generateWaveform function takes 4 parameters:
    //     - type, the type of waveform to be generated
    //     - frequency, the frequency of the waveform to be generated
    //     - amp, the maximum amplitude of the waveform to be generated
    //     - duration, the length (in seconds) of the waveform to be generated
    generateWaveform: function(type, frequency, amp, duration) {
        var nyquistFrequency = sampleRate / 2; // Nyquist frequency
        var totalSamples = Math.floor(sampleRate * duration); // Number of samples to generate
        var result = []; // The temporary array for storing the generated samples

        switch(type) {
            case "sine-time": // Sine wave, time domain
                for (var i = 0; i < totalSamples; ++i) {
                    var currentTime = i / sampleRate;
                    result.push(amp * Math.sin(2.0 * Math.PI * frequency * currentTime));
                }
                break;

            case "square-time": // Square wave, time domain
                /**
                * TODO: Complete this generator
                **/
				var cycle = sampleRate / frequency;
				var halfCycle = cycle / 2;
				for (var i = 0; i < totalSamples; i++) {
					var sample = 0;
					var whereInTheCycle = i % parseInt(cycle);
					if (whereInTheCycle < halfCycle)
						sample = amp;
					else 
						sample = -amp;
					result.push(sample);
				}
                break;

            case "square-additive": // Square wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				for (var i = 0; i < totalSamples; i++) {
					var currentTime = i / sampleRate;
					var sample = 0;
					var k = 1;
					while (k * frequency < nyquistFrequency) {
						sample += amp * Math.sin(2 * Math.PI * k * frequency * currentTime) / k;
						k += 2;
					}
					result.push(sample);
				}
                break;

            case "sawtooth-time": // Sawtooth wave, time domain
                /**
                * TODO: Complete this generator
                **/
				var cycle = sampleRate / frequency;
				for (var i = 0; i < totalSamples; i++) {
					var whereInTheCycle = i % parseInt(cycle);
					var fractionInTheCycle = whereInTheCycle / cycle;
					sample = amp * (0.5 - fractionInTheCycle) * 2;
					result.push(sample);
				}
                break;

            case "sawtooth-additive": // Sawtooth wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				for (var i = 0; i < totalSamples; i++) {
					var currentTime = i / sampleRate;
					var sample = 0;
					var k = 1;
					while (k * frequency < nyquistFrequency) {
						sample += amp * Math.sin(2 * Math.PI * k * frequency * currentTime) / k;
						k++;
					}
					result.push(sample);
				}
                break;

            case "triangle-additive": // Triangle wave, additive synthesis
                /**
                * TODO: Complete this generator
                **/
				for (var i = 0; i < totalSamples; i++) {
					var t = i / sampleRate;
					var sample = 0;
					var k = 1;
					while (k * frequency < nyquistFrequency) {
						sample += amp * (1.0 / (k * k)) * Math.cos(2 * Math.PI * k * frequency * t);
						k += 2;
					}
					result.push(sample);
				}
                break;

            case "karplus-strong": // Karplus-Strong algorithm
                /**
                * TODO: Complete this generator
                **/
                // Obtain all the required parameters
                var base = $("#karplus-base>option:selected").val();
                var b = parseFloat($("#karplus-b").val());
                var delay = parseInt($("#karplus-p").val());
                var useFreq = $("#karplus-use-freq").prop("checked");
                console.log(useFreq);
                if (useFreq) {
                    delay = parseInt(sampleRate / frequency);
                }

                for (var i = 0; i < totalSamples; i++) {
                    var sample = 0;
                    var t = Math.random();
                    if (i <= delay) {
                        // white noise
                        if (base == 'white-noise') {
                            sample = amp * (Math.random() * 2 - 1);
                        }
                        // sawtooth
                        else {
                            var fractionInTheCycle = i / delay;
                            sample = amp * (1 - fractionInTheCycle * 2);
                        }
                    } 
                    else {
                        var pos = i - delay;
                        sample = 0.5 * result[pos] + 0.5 * result[pos-1];  
                        if (t >= b) sample = -sample;                   
                    }
                    result.push(sample);
                }

                break;

            case "white-noise": // White noise
                /**
                * TODO: Complete this generator
                **/
				for (var i = 0; i < totalSamples; i++) {
					result.push(amp * (Math.random() * 2 - 1));
				}
                break;

            case "customized-additive-synthesis": // Customized additive synthesis
                /**
                * TODO: Complete this generator
                **/

                // Obtain all the required parameters
				var harmonics = [];
				for (var h = 1; h <= 10; ++h) {
					harmonics.push($("#additive-f" + h).val())
				}
				
				for (var i = 0; i < totalSamples; i++) {
					var k = 1;
					var sample = 0;
					var currentTime = i / sampleRate;
					while (k * frequency < nyquistFrequency && k <= 10) {
						sample += amp * harmonics[k-1] * Math.sin(2 * Math.PI * k * frequency * currentTime);
						k++;
					}
					result.push(sample);
				}

                break;

            case "fm": // FM
                /**
                * TODO: Complete this generator
                **/
                // Obtain all the required parameters
                var carrierFrequency = parseFloat($("#fm-carrier-frequency").val());
                var carrierAmplitude = parseFloat($("#fm-carrier-amplitude").val());
                var modulationFrequency = parseFloat($("#fm-modulation-frequency").val());
                var modulationAmplitude = parseFloat($("#fm-modulation-amplitude").val());
                var useADSR = $("#fm-use-adsr").prop("checked");
                var useFreqAsMultiplier = $("#fm-use-freq-multiplier").prop("checked");

                if (useFreqAsMultiplier) {
                    modulationFrequency *= frequency;
                    carrierFrequency *= frequency;
                }

                if (useADSR) { // Obtain the ADSR parameters
                    var attackDuration = parseFloat($("#fm-adsr-attack-duration").val()) * sampleRate;
                    var decayDuration = parseFloat($("#fm-adsr-decay-duration").val()) * sampleRate;
                    var releaseDuration = parseFloat($("#fm-adsr-release-duration").val()) * sampleRate;
                    var sustainLevel = parseFloat($("#fm-adsr-sustain-level").val()) / 100.0;
                }

                for (var i = 0; i < totalSamples; i++) {
                    var currentTime = i / sampleRate;
                    var modulationSinewave = modulationAmplitude * Math.sin(2.0 * Math.PI * modulationFrequency * currentTime);

                    // apply ADSR into the modulation sine waves
                    if (useADSR) {
                        // attack
                        if (i < attackDuration) {
                            var multiplier = i / attackDuration;
                            modulationSinewave *= multiplier;
                        }
                        // decay
                        else if (i >= attackDuration && i < attackDuration + decayDuration) {
                            var multiplier = 1 - ((i - attackDuration) / decayDuration * (1 - sustainLevel));
                            modulationSinewave *= multiplier;
                        }
                        // sustain
                        else if (i >= attackDuration + decayDuration && i < totalSamples - releaseDuration) {
                            modulationSinewave *= sustainLevel;
                        }
                        // release
                        else {
                            var multiplier = (totalSamples - i) / releaseDuration;
                            modulationSinewave *= multiplier * sustainLevel;
                        }
                    }
                    
                    result.push(amp * carrierAmplitude * Math.sin(2.0 * Math.PI * frequency * currentTime + modulationSinewave));
                }                

                break;

            case "repeating-narrow-pulse": // Repeating narrow pulse
                var cycle = Math.floor(sampleRate / frequency);
                for (var i = 0; i < totalSamples; ++i) {
                    if(i % cycle === 0) {
                        result.push(amp * 1.0);
                    } else if(i % cycle === 1) {
                        result.push(amp * -1.0);
                    } else {
                        result.push(0.0);
                    }
                }
                break;

            default:
                break;
        }

        return result;
    }
};
