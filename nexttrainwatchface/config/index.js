// To whomever is adventuring here:
// for my defense, at least it all works (probably)

var data = {
    colors: {
        "outer-background": {
            "base-style": {
                default: "555555",
                value: null,
            },
            "station-1": {
                default: "555555",
                value: null,
            },
            "station-2": {
                default: "555555",
                value: null,
            },
        },
        "frame": {
            "base-style": {
                default: "AAAAAA",
                value: null,
            }
        },
        "inner-background": {
            "base-style": {
                default: "555555",
                value: null,
            }
        },
        "digital-clock": {
            "base-style": {
                type: "color",
                default: "ffffff",
                value: null,
            }
        },
        "hour-hand": {
            "base-style": {
                type: "color",
                default: "ff0000",
                value: null,
            }
        },
        "minute-hand": {
            "base-style": {
                type: "color",
                default: "000000",
                value: null,
            }
        },
        "train-1": {
            "base-style": {
                type: "color",
                default: "ff0000",
                value: null,
            },
            "station-1": {
                type: "color",
                default: "ff0000",
                value: null,
            },
            "station-2": {
                type: "color",
                default: "ff0000",
                value: null,
            },
        },
        "train-2": {
            "base-style": {
                type: "color",
                default: "ff5555",
                value: null,
            },
            "station-1": {
                type: "color",
                default: "ff5555",
                value: null,
            },
            "station-2": {
                type: "color",
                default: "ff5555",
                value: null,
            },
        },
        "train-3": {
            "base-style": {
                type: "color",
                default: "ffaaaa",
                value: null,
            },
            "station-1": {
                type: "color",
                default: "ffaaaa",
                value: null,
            },
            "station-2": {
                type: "color",
                default: "ffaaaa",
                value: null,
            },
        },
        "tick-marks": {
            "base-style": {
                type: "color",
                default: "ffffff",
                value: null,
            },
            "station-1": {
                type: "color",
                default: "ffffff",
                value: null,
            },
            "station-2": {
                type: "color",
                default: "ffffff",
                value: null,
            },
        },
        "train-indicator": {
            "base-style": {
                type: "color",
                default: "000000",
                value: null,
            },
            "station-1": {
                type: "color",
                default: "000000",
                value: null,
            },
            "station-2": {
                type: "color",
                default: "000000",
                value: null,
            },
        },
    },
    toggles: {
        "base-style-digital-clock-active": {
            default: true,
            value: null,
        },
        "base-style-analog-clock-active": {
            default: true,
            value: null,
        },
        "base-style-tick-marks-active": {
            default: "true",
            value: null,
        },
        "station-1-tick-marks-active": {
            default: "true",
            value: null,
        },
        "station-2-tick-marks-active": {
            default: "true",
            value: null,
        },
        "trains-times-privacy-active": {
            default: false,
            value: null,
        },
    },
    stations: {
        "station-1": {
            enabled: true,
            stationId: null,
            trains: null,
            mode: "",
            time: null,
            distance: null,
            topIcon: null
        },
        "station-2": {
            enabled: true,
            stationId: null,
            trains: null,
            mode: "",
            time: null,
            distance: null,
            topIcon: null
        },    
    },
    requestFrequency: 10
};

const toggles = {
    "base-style-digital-clock-active" : {
        formDependents: ["base-style-digital-clock-label"],
        colorInputDependents: [{
            id: "digital-clock",
            entry: "base-style"
        }],
        conflict: "base-style-analog-clock-active",
        toggle: true
    },
    "base-style-analog-clock-active": {
        formDependents: ["base-style-hour-hand-label", "base-style-minute-hand-label"],
        colorInputDependents: [{
            id: "hour-hand",
            entry: "base-style"
        },
        {
            id: "minute-hand",
            entry: "base-style"
        }],
        conflict: "base-style-digital-clock-active",
        toggle: true
    },
    "base-style-tick-marks-active": {
        formDependents: ["base-style-tick-marks-label"],
        colorInputDependents: [{
            id: "tick-marks",
            entry: "base-style"
        }],
        toggle: true
    },
    "station-1-active": {
        formDependents: ["section-station-1"],
        toggle: true
    },
    "station-1-tick-marks-active": {
        formDependents: ["station-1-tick-marks-label"],
        colorInputDependents: [{
            id: "tick-marks",
            entry: "station-1"
        }],
        toggle: true
    },
    "station-1-train-indicator-active": {
        formDependents: ["station-1-train-indicator-label"],
        colorInputDependents: [{
            id: "train-indicator",
            entry: "station-1"
        }],
        toggle: true
    },
    "station-2-active": {
        formDependents: ["section-station-2"],
        toggle: true
    },
    "station-2-tick-marks-active": {
        formDependents: ["station-2-tick-marks-label"],
        colorInputDependents: [{
            id: "tick-marks",
            entry: "station-2"
        }],
        toggle: true
    },
    "station-2-train-indicator-active": {
        formDependents: ["station-2-train-indicator-label"],
        colorInputDependents: [{
            id: "train-indicator",
            entry: "station-2"
        }],
        toggle: true
    },
};

// COLOR INPUTS
const colorInputs = {
    "outer-background": {
        previewType: "background-color",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#555555",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-1": {
                default: "#555555",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#555555",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "frame": {
        previewType: "background-color",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#AAAAAA",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "inner-background": {
        previewType: "background-color",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#555555",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "digital-clock": {
        previewType: "color",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#ffffff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "hour-hand": {
        previewType: "stroke",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#ff0000",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "minute-hand": {
        previewType: "stroke",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#000000",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "train-1": {
        previewType: "stroke",
        previewElement: null,
        entries: {
            "base-style": {
                default: "transparent",
                value: "transparent",
                enabled: false
            },
            "station-1": {
                default: "#ff0000",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#0000aa",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "train-2": {
        previewType: "stroke",
        previewElement: null,
        entries: {
            "base-style": {
                default: "transparent",
                value: "transparent",
                enabled: false
            },
            "station-1": {
                default: "#ff5555",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#0000ff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "train-3": {
        previewType: "stroke",
        previewElement: null,
        entries: {
            "base-style": {
                default: "transparent",
                value: "transparent",
                enabled: false
            },
            "station-1": {
                default: "#ffaaaa",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#55aaff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "tick-marks": {
        previewType: "tick-marks",
        previewElement: null,
        entries: {
            "base-style": {
                default: "#ffffff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-1": {
                default: "#ffffff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#ffffff",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        }
    },
    "train-indicator": {
        previewType: "fill",
        previewElement: null,
        entries: {
            "base-style": {
                default: "transparent",
                value: "transparent",
                enabled: false
            },
            "station-1": {
                default: "#000000",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            },
            "station-2": {
                default: "#aaaaaa",
                value: null,
                valueSunlight: null,
                labelElement: null,
                inputElement: null,
                spanElement: null,
                enabled: true
            }
        },
        topIcon: {
            "base-style": {
                value: "icon-circle",
                enabled: false
            },
            "station-1": {
                value: "icon-circle",
                enabled: true
            },
            "station-2": {
                value: "icon-circle",
                enabled: true
            }
        }
    }
};

let palette = [];

var currentPreviewDisplay = "base-style";
var showPreviewOnClose = false;

fetch('data/pebble-palette.json')
    .then(response => response.json())
    .then(data => {
        palette = data;
        setupColorPicker();
    });

const topIcon = document.getElementById("top-icon");

function convertToSunlight(hex) {
    const entry = palette.find(color => color.uncorrected.toLowerCase() === hex.toLowerCase());
    return entry ? entry.sunlight : "#000000";
}

function setColorForPreviewElement(type, element, value) {
    switch (type) {
        case "background-color":
            element.style.backgroundColor = value;
            break;
        case "stroke":
            element.style.stroke = value;
            break;
        case "color":
            element.style.color = value;
            break;
        case "fill":
            element.style.fill = value;
            break;
        case "tick-marks":
            element.style.backgroundColor = value;
            document.getElementById("top-icon").style.backgroundColor = value;
            break;          
        default:
            break;
        }
}

function setColorValueForInput(inputID, entryID, hex){
    const currentInput = colorInputs[inputID];
    const entry = currentInput.entries[entryID];

    if(entry){
        var valueToSet = "transparent";
        if(entry.enabled) {
            entry.value = hex;
            entry.valueSunlight = convertToSunlight(hex);
            valueToSet = entry.valueSunlight;

            entry.spanElement.style.background = entry.valueSunlight;
            entry.inputElement.value = hex;

            entry.inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
        setColorForPreviewElement(currentInput.previewType, currentInput.previewElement, valueToSet);
    }
}

function setAllPreviewsFromEntry(entryKey) {
    for (const [colorKey, colorData] of Object.entries(colorInputs)) {
        if (colorData.entries[entryKey]) {
            let valueToSet = "transparent";
            if (colorData.entries[entryKey].enabled) {
                valueToSet = colorData.entries[entryKey].value;
                if (colorData.entries[entryKey].valueSunlight) valueToSet = colorData.entries[entryKey].valueSunlight;
            }
            setColorForPreviewElement(colorData.previewType, colorData.previewElement, valueToSet);
            if(colorData.topIcon) {
                document.getElementById("top-icon").style.maskImage = 
                    colorData.topIcon[entryKey].enabled ? 
                        "url(resources/img/topIcons/"+ colorData.topIcon[entryKey].value +".png)" : 
                        "url(resources/img/topIcons/icon-circle.png)";
            }
        }
    }
}

function setupColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    const pickedColor = document.getElementById('picked-color-value');
    const pickedElement = document.getElementById('picked-color-element');

    var currentPickerTarget = null;

    const colorBoxes = document.querySelectorAll(".color-box.selectable");

    colorBoxes.forEach(colorBox => {
        colorBox.addEventListener('click', function() {
            pickedColor.value = colorBox.dataset.value;

            setColorValueForInput(currentPickerTarget, currentPreviewDisplay, '#' + colorBox.dataset.value);

            const selectedColorBoxes = document.querySelectorAll(".color-box.selected");

            selectedColorBoxes.forEach(sCB => {
                sCB.classList.remove("selected");
            });
            
            colorBox.classList.add('selected');

            setTimeout(function(){
                colorPicker.classList.remove('show');
                if(showPreviewOnClose) {
                    togglePreview();
                    showPreviewOnClose = false;
                }
            }, 300);
        });
    });

    for (const [colorKey, colorData] of Object.entries(colorInputs)) {
        colorData.previewElement = document.getElementById(colorKey);
        for (const [entryKey, entryData] of Object.entries(colorData.entries)) {
            var valueToSet = "transparent";
            if(entryData.enabled) {
                entryData.labelElement = document.getElementById(entryKey + "-" + colorKey + '-label');
                entryData.spanElement = document.getElementById(entryKey + "-" + colorKey + '-color-value');
                entryData.inputElement = document.getElementById(entryKey + "-" + colorKey + '-color-input');

                entryData.value = entryData.default;
                entryData.valueSunlight = convertToSunlight(entryData.value);
                if(!entryData.valueSunlight){
                    console.error("Error getting sunlight color for " + colorKey + " hex #" + entryData.value);
                }
                valueToSet = entryData.valueSunlight;
                entryData.spanElement.style.background = entryData.valueSunlight;
                entryData.inputElement.value = entryData.value;

                entryData.labelElement.addEventListener('click', function() {
                    if(!entryData.labelElement.disabled) {
                        if(previewShowing) {
                            togglePreview();
                            showPreviewOnClose = true;
                        }
                        colorPicker.classList.add('show');
                        currentPickerTarget = colorKey;
                        currentPreviewDisplay = entryKey;
                        const selectedColorBoxes = document.querySelectorAll(".color-box.selected");
                        selectedColorBoxes.forEach(sCB => {
                            sCB.classList.remove("selected");
                        });
                        const selectedColorBox = [...colorBoxes].find(colorBox => '#' + colorBox.dataset.value === entryData.value);
                        if(selectedColorBox) {
                            selectedColorBox.classList.add('selected');
                        }
                    }
                });
            }

            if(entryKey === "base-style") 
                setColorForPreviewElement(colorData.previewType, colorData.previewElement, valueToSet);

        }
    }

}

function setDisabledState(element, disabled, label = false) {
    if (!element) return;
    element.disabled = disabled;
    element.classList.toggle("disabled", disabled);
    if (label) {
        const labelElement = document.getElementById(element.id + "-label");
        if (labelElement) {
            labelElement.classList.toggle("disabled", disabled);
        }
    }
}

// TODO: UNIFY SET COLOR FUNCTIONS
function updateColorInput(dependent, enabled) {
    const entry = colorInputs[dependent.id].entries[dependent.entry];
    entry.enabled = enabled;
    const value = enabled ? entry.value : "transparent";
    setColorValueForInput(dependent.id, dependent.entry, value);
}

for (const [toggleKey, toggleData] of Object.entries(toggles)) {
    const toggleInput = document.getElementById(toggleKey);
    toggleInput?.addEventListener("change", (event) => {
        const checked = event.target.checked;
        toggleData.toggle = checked;
        toggleData.formDependents?.forEach(id => {
            setDisabledState(document.getElementById(id), !checked);
        });
        
        toggleData.colorInputDependents?.forEach(dependent => {
            updateColorInput(dependent, checked);
        });
        
        if (toggleData.conflict !== null) {
            const conflictingElement = document.getElementById(toggleData.conflict);
            setDisabledState(conflictingElement, !checked, true);
        }
    });
}

const stationsSections = [
    document.getElementById('section-base-style'),
    document.getElementById('section-station-1'),
    document.getElementById('section-station-2')
];

const previewLabel = document.getElementById("current-preview-label");

window.addEventListener('load', function() {
    stationsSections.forEach((section, index) => {
        section.addEventListener('change', (event) => {
            // console.log(event);

            if (event.target.name === 'icons-1') {
                colorInputs["train-indicator"].topIcon["station-1"].value = event.target.value;
            }

            if (event.target.name === 'icons-2') {
                colorInputs["train-indicator"].topIcon["station-2"].value = event.target.value;
            }

            if (event.currentTarget.id === "section-base-style") {
                console.log("preview for base-style");
                setAllPreviewsFromEntry("base-style");
                previewLabel.textContent = "Base Style";
            }

            if (event.currentTarget.id === "section-station-1") {
                console.log("preview for station-1");
                if (event.target.id === "station-1-active" && !event.target.checked) {
                    previewLabel.textContent = "Base Style";
                    setAllPreviewsFromEntry("base-style");
                } else {
                    previewLabel.textContent = "Station #1";
                    setAllPreviewsFromEntry("station-1");
                }
            }

            if (event.currentTarget.id === "section-station-2") {
                console.log("preview for station-2");
                if (event.target.id === "station-2-active" && !event.target.checked) {
                    previewLabel.textContent = "Base Style";
                    setAllPreviewsFromEntry("base-style");
                } else {
                    previewLabel.textContent = "Station #2";
                    setAllPreviewsFromEntry("station-2");
                }
            }

        });
    });
});

// TRAIN SELECTION IFRAMES

const iframes = [
    document.getElementById('station1-iframe'),
    document.getElementById('station2-iframe')
];

iframes.forEach(iframe => {
    iframe.addEventListener('load', function () {
        try {
            const contentDoc = iframe.contentDocument || iframe.contentWindow.document;
            const newHeight = contentDoc.body.scrollHeight;

            iframe.style.height = newHeight + 'px';
            console.log("iframe loaded, new height:", newHeight);
        } catch (e) {
            console.warn("Couldn't access iframe content (cross-origin?):", e);
        }
    });
});

window.addEventListener('message', (event) => {
    if(event.data.type === 'resize') {
        for (const iframe of iframes) {
            if (iframe.contentWindow === event.source) {
                iframe.style.height = event.data.height + 'px';
                console.log(`Resized ${iframe.id} to ${event.data.height}px`);
                break;
            }
        }
        return;
    }
    if(event.data.type === 'result') {
        for (const iframe of iframes) {
            if (iframe.contentWindow === event.source) {
                console.log(`Result from station #${iframe.id}: station ${event.data.station} / trains ${JSON.stringify(event.data.trains)} / direction ${event.data.direction}`);
                break;
            }
        }
    }
});

// SUBMIT CONFIG

function toMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

function addDayInterval(i) {
    return { start: i.start + 1440, end: i.end + 1440 };
}

function normalizeInterval(start, end) {
    if (end <= start) {
        // Spans midnight
        end += 1440; // Add 24h in minutes
    }
    return { start, end };
}

function intervalsOverlap(a, b) {
return a.start < b.end && b.start < a.end;
}

function checkOverlap() {
    const t1 = document.getElementById('s1-t1').value;
    const t2 = document.getElementById('s1-t2').value;
    const t3 = document.getElementById('s2-t1').value;
    const t4 = document.getElementById('s2-t2').value;

    if (!t1 || !t2 || !t3 || !t4) {
        alert("Please fill all times.");
        return;
    }

    let i1 = normalizeInterval(toMinutes(t1), toMinutes(t2));
    let i2 = normalizeInterval(toMinutes(t3), toMinutes(t4));

    // Handle both intervals possibly spanning midnight by duplicating and comparing in extended space
    const overlap =
        intervalsOverlap(i1, i2) ||
        intervalsOverlap(i1, addDayInterval(i2)) ||
        intervalsOverlap(addDayInterval(i1), i2);

    // alert(overlap ? "wrong" : "yay");
    return overlap;

    // if(overlap){
    //     showError("Intervals Overlap");
    // }

}

// function getDataFromColorInputs(){
//     for (const [colorKey, colorData] of Object.entries(colorInputs)) {
//         for (const [entryKey, entryData] of Object.entries(colorData.entries)) {
//             console.log(colorKey + "  " + entryKey + "  " );
//             data.colors[colorKey][entryKey].value = entryData.value;
//         }
//     }
// }

function getDataFromColorInputs() {
    const result = {};

    for (const section in colorInputs) {
        const entries = colorInputs[section].entries;
        result[section] = {};

        for (const entryKey in entries) {
            const entry = entries[entryKey];
            // if(toggles[entryKey + "-" + section + "-active"]){
            //     console.log("toggle exists: " + entryKey + "-" + section + "-active");
            // }
            result[section][entryKey] = entry["value"]; 
        }
    }

    return result;
}

function getDataFromToggleInputs() {
    const result = {};

    for (const inputKey in colorInputs) {
        const entries = colorInputs[inputKey].entries;

        for (const entryKey in entries) {
            const entry = entries[entryKey];
            let toggleKey = entryKey + "-" + inputKey + "-active";
            if(toggles[toggleKey]){
                console.log("toggle exists: " + toggleKey);
                if (toggles[entryKey + "-active"] && toggles[entryKey + "-active"]?.toggle)
                    result[toggleKey] = toggles[toggleKey].toggle;
            }
            // result[section][entryKey] = entry["value"]; 
        }
    }

    // result[""] = toggles[toggleKey].toggle;

    // for (const section in toggles) {
    //     result[section] = toggles[section].toggle;
    // }

    return result;
}

function getDataFromStations() {
    const result = {};

    for (const section in toggles) {
        result[section] = toggles[section].toggle;

        // const colorInputs = toggles[section].colorInputDependents;
        // if (colorInputs) {
        //     colorInputs.forEach(color => {
        //         result[color.id][color.entry] = toggles[section].toggle;
        //     });
        // }
    }

    return result;
}

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
    // const stationId = stationValue.value;
    // const stationName = filteredStops.find(s => s.id === stationId).name;
    // const direction = directionSelect.value;
    // const errors = [];
    // if(checkOverlap) {
    //     errors.push("Time intervals overlap")
    // }
    // console.log(errors);
    // getDataFromColorInputs();

    // var dataToSend = {
    //     colors: getDataFromColorInputs(),
    //     toggles: getDataFromToggleInputs(),
    //     stations: {},
    //     requestFrequency: {}
    // }

    var dataToSend = {
        digitalClock: toggles["base-style-digital-clock-active"].toggle,
        analogClock: toggles["base-style-analog-clock-active"].toggle,
        outerColor: colorInputs["outer-background"].entries["base-style"].value,
        frameColor: colorInputs["frame"].entries["base-style"].value,
        innerColor: colorInputs["inner-background"].entries["base-style"].value,
        digitalColor: colorInputs["digital-clock"].entries["base-style"].value,
        hourColor: colorInputs["hour-hand"].entries["base-style"].value,
        minuteColor: colorInputs["minute-hand"].entries["base-style"].value,
        ticksColor: colorInputs["tick-marks"].entries["base-style"].value
    }

    console.log(dataToSend);
    // checkOverlap();

    // if (!direction) {
    //   alert("Please select a direction.");
    //   return;
    // }

    // var dataToBeSent = {
    //   'station': `${stationId}${direction}`
    // }

    

    // alert(`You selected: Line ${lineValue.value} → ${stationName} (${direction})\nSending ${dataToBeSent['station']}`);


    // // Determine the correct return URL (emulator vs real watch)
    function getQueryParam(variable, defaultValue) {
      var query = location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      return defaultValue || false;
    }
    var return_to = getQueryParam('return_to', 'pebblejs://close#');

    document.location = return_to + encodeURIComponent(JSON.stringify(dataToSend));

    // var checkedValue = document.querySelector('.line-checkbox:checked').value;
    // alert(trainsChecked.value);

    // alert(``);

    // getSelectedTrains();

});

function showError(string){
    const errorBox = document.getElementById("error");
    errorBox.textContent = string;
    // errorBox.style.display = "block";
    errorBox.style.opacity = 1;
    setTimeout(function(){
        // errorBox.style.display = "none";
        errorBox.style.opacity = 0;
    }, 4000);
}

const showDefaultToggle = document.getElementById("default-preview-toggle");
const showStation1Toggle = document.getElementById("station-1-preview-toggle");
const showStation2Toggle = document.getElementById("station-2-preview-toggle");

showDefaultToggle.addEventListener("click", function(){
    showDefaultToggle.dispatchEvent(new Event('change', { bubbles: true }));
});
showStation1Toggle.addEventListener("click", function(){
    if(document.getElementById("station-1-active").checked)
        showStation1Toggle.dispatchEvent(new Event('change', { bubbles: true }));
});
showStation2Toggle.addEventListener("click", function(){
    if(document.getElementById("station-2-active").checked)
        showStation2Toggle.dispatchEvent(new Event('change', { bubbles: true }));
});

var previewShowing = false;
const showPreviewButton = document.getElementById("show-preview");
const previewHeader = document.getElementById("preview-header");
const watchfacePreviewComponent = document.getElementById("component-preview");
const watchfacePreviewBG = document.getElementById("watchface-preview-background");

showPreviewButton.addEventListener("click", function(){
    togglePreview();
});

function togglePreview() {
    if (previewShowing) {
        showPreviewButton.style.backgroundImage = "url(resources/img/eye-icon-slash.svg)";
        watchfacePreviewComponent.classList.remove("preview-active");
        watchfacePreviewBG.style.display = "none";
        previewHeader.style.marginBottom = "unset";
    } else {
        showPreviewButton.style.backgroundImage = "url(resources/img/eye-icon.svg)";
        watchfacePreviewComponent.classList.add("preview-active");
        watchfacePreviewBG.style.display = "block";
        previewHeader.style.marginBottom = "calc(180px + 2rem)";
    }
    previewShowing = !previewShowing;
}