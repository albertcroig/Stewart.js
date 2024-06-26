/**
 * @license textToSvg.js v1.0.0 23/05/2024
 * 
 * Copyright (c) 2024, Albert Castellanos Roig (albertcastellanosrg@gmail.com)
 * Licensed under the MIT License.
 *
 * This script is part of the Stewart.js project.
 * 
 * Original project license:
 * Stewart.js v1.0.1 17/02/2019
 * https://raw.org/research/inverse-kinematics-of-a-stewart-platform/
 * 
 * Copyright (c) 2019, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * The fonts object in this script contains the fonts from the repository hersheytextjs by techninja.
 */


// Initial font selection
let selectedFont = 'sans1Stroke';

// Get the font selector element and add an event listener to it
const selectElement = document.getElementById("fontSelector");
selectElement.addEventListener('change', function(event) {
    // Update the selected font when a new option is selected
    selectedFont = event.target.value;
});

// Add event listener to the button that changes parameters
drawTextBtn.addEventListener('click', function() {
    // Call the function to draw text to SVG with the selected font
    drawTextToSVG(selectedFont);
});

// Get the text input field and add event listeners for focus and blur
var textToDrawInput = document.getElementById('textToDrawInput');

textToDrawInput.addEventListener('focus', function() {
    // Set flag to true when input field is focused
    isInputFocused = true;
});     
textToDrawInput.addEventListener('blur', function() {
    // Set flag to false when input field loses focus
    isInputFocused = false;
});

// Add event listener for keydown events in the input field
textToDrawInput.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the function to draw text to SVG with the selected font
        drawTextToSVG(selectedFont);
    }
});

// Function to create SVG path from Hershey font data
function createSVGPathFromHershey(text, boundingBox, font) {
    // Function to find the bounding box of a given SVG path
    function findBoundingBox(path) {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svgElement = document.createElementNS(svgNamespace, "svg");
        svgElement.setAttribute('style', 'position:absolute; visibility:hidden; width:0; height:0;');
        document.body.appendChild(svgElement);

        const pathElement = document.createElementNS(svgNamespace, "path");
        pathElement.setAttribute("d", path);
        svgElement.appendChild(pathElement);

        const bbox = pathElement.getBBox();
        svgElement.removeChild(pathElement);
        return bbox;
    }

    // Array to store fonts as SVG path for each of the letters
    const fonts = {
        sans1Stroke: [
            {
                "d": "M5,1 L5,15 M5,20 L4,21 5,22 6,21 5,20",
                "o": 5
            },
            {
                "d": "M4,1 L4,8 M12,1 L12,8",
                "o": 8
            },
            {
                "d": "M11,-3 L4,29 M17,-3 L10,29 M4,10 L18,10 M3,16 L17,16",
                "o": 11
            },
            {
                "d": "M8,-3 L8,26 M12,-3 L12,26 M17,4 L15,2 12,1 8,1 5,2 3,4 3,6 4,8 5,9 7,10 13,12 15,13 16,14 17,16 17,19 15,21 12,22 8,22 5,21 3,19",
                "o": 10
            },
            {
                "d": "M21,1 L3,22 M8,1 L10,3 10,5 9,7 7,8 5,8 3,6 3,4 4,2 6,1 8,1 10,2 13,3 16,3 19,2 21,1 M17,15 L15,16 14,18 14,20 16,22 18,22 20,21 21,19 21,17 19,15 17,15",
                "o": 12
            },
            {
                "d": "M23,10 L23,9 22,8 21,8 20,9 19,11 17,16 15,19 13,21 11,22 7,22 5,21 4,20 3,18 3,16 4,14 5,13 12,9 13,8 14,6 14,4 13,2 11,1 9,2 8,4 8,6 9,9 11,12 16,19 18,21 20,22 22,22 23,21 23,20",
                "o": 13
            },
            {
                "d": "M5,3 L4,2 5,1 6,2 6,4 5,6 4,7",
                "o": 5
            },
            {
                "d": "M11,-3 L9,-1 7,2 5,6 4,11 4,15 5,20 7,24 9,27 11,29",
                "o": 7
            },
            {
                "d": "M3,-3 L5,-1 7,2 9,6 10,11 10,15 9,20 7,24 5,27 3,29",
                "o": 7
            },
            {
                "d": "M8,7 L8,19 M3,10 L13,16 M13,10 L3,16",
                "o": 8
            },
            {
                "d": "M13,4 L13,22 M4,13 L22,13",
                "o": 13
            },
            {
                "d": "M5,18 L4,19 3,18 4,17 5,18 5,20 3,22",
                "o": 4
            },
            {
                "d": "M4,13 L22,13",
                "o": 13
            },
            {
                "d": "M4,17 L3,18 4,19 5,18 4,17",
                "o": 4
            },
            {
                "d": "M20,-3 L2,29",
                "o": 11
            },
            {
                "d": "M9,1 L6,2 4,5 3,10 3,13 4,18 6,21 9,22 11,22 14,21 16,18 17,13 17,10 16,5 14,2 11,1 9,1",
                "o": 10
            },
            {
                "d": "M6,5 L8,4 11,1 11,22",
                "o": 10
            },
            {
                "d": "M4,6 L4,5 5,3 6,2 8,1 12,1 14,2 15,3 16,5 16,7 15,9 13,12 3,22 17,22",
                "o": 10
            },
            {
                "d": "M5,1 L16,1 10,9 13,9 15,10 16,11 17,14 17,16 16,19 14,21 11,22 8,22 5,21 4,20 3,18",
                "o": 10
            },
            {
                "d": "M13,1 L3,15 18,15 M13,1 L13,22",
                "o": 10
            },
            {
                "d": "M15,1 L5,1 4,10 5,9 8,8 11,8 14,9 16,11 17,14 17,16 16,19 14,21 11,22 8,22 5,21 4,20 3,18",
                "o": 10
            },
            {
                "d": "M16,4 L15,2 12,1 10,1 7,2 5,5 4,10 4,15 5,19 7,21 10,22 11,22 14,21 16,19 17,16 17,15 16,12 14,10 11,9 10,9 7,10 5,12 4,15",
                "o": 10
            },
            {
                "d": "M17,1 L7,22 M3,1 L17,1",
                "o": 10
            },
            {
                "d": "M8,1 L5,2 4,4 4,6 5,8 7,9 11,10 14,11 16,13 17,15 17,18 16,20 15,21 12,22 8,22 5,21 4,20 3,18 3,15 4,13 6,11 9,10 13,9 15,8 16,6 16,4 15,2 12,1 8,1",
                "o": 10
            },
            {
                "d": "M16,8 L15,11 13,13 10,14 9,14 6,13 4,11 3,8 3,7 4,4 6,2 9,1 10,1 13,2 15,4 16,8 16,13 15,18 13,21 10,22 8,22 5,21 4,19",
                "o": 10
            },
            {
                "d": "M4,10 L3,11 4,12 5,11 4,10 M4,17 L3,18 4,19 5,18 4,17",
                "o": 4
            },
            {
                "d": "M4,10 L3,11 4,12 5,11 4,10 M5,18 L4,19 3,18 4,17 5,18 5,20 3,22",
                "o": 4
            },
            {
                "d": "M20,4 L4,13 20,22",
                "o": 12
            },
            {
                "d": "M4,10 L22,10 M4,16 L22,16",
                "o": 13
            },
            {
                "d": "M4,4 L20,13 4,22",
                "o": 12
            },
            {
                "d": "M3,6 L3,5 4,3 5,2 7,1 11,1 13,2 14,3 15,5 15,7 14,9 13,10 9,12 9,15 M9,20 L8,21 9,22 10,21 9,20",
                "o": 9
            },
            {
                "d": "M18,9 L17,7 15,6 12,6 10,7 9,8 8,11 8,14 9,16 11,17 14,17 16,16 17,14 M12,6 L10,8 9,11 9,14 10,16 11,17 M18,6 L17,14 17,16 19,17 21,17 23,15 24,12 24,10 23,7 22,5 20,3 18,2 15,1 12,1 9,2 7,3 5,5 4,7 3,10 3,13 4,16 5,18 7,20 9,21 12,22 15,22 18,21 20,20 21,19 M19,6 L18,14 18,16 19,17",
                "o": 20
            },
            {
                "d": "M9,1 L1,22 M9,1 L17,22 M4,15 L14,15",
                "o": 9
            },
            {
                "d": "M4,1 L4,22 M4,1 L13,1 16,2 17,3 18,5 18,7 17,9 16,10 13,11 M4,11 L13,11 16,12 17,13 18,15 18,18 17,20 16,21 13,22 4,22",
                "o": 11
            },
            {
                "d": "M18,6 L17,4 15,2 13,1 9,1 7,2 5,4 4,6 3,9 3,14 4,17 5,19 7,21 9,22 13,22 15,21 17,19 18,17",
                "o": 11
            },
            {
                "d": "M4,1 L4,22 M4,1 L11,1 14,2 16,4 17,6 18,9 18,14 17,17 16,19 14,21 11,22 4,22",
                "o": 10
            },
            {
                "d": "M4,1 L4,22 M4,1 L17,1 M4,11 L12,11 M4,22 L17,22",
                "o": 9
            },
            {
                "d": "M4,1 L4,22 M4,1 L17,1 M4,11 L12,11",
                "o": 8
            },
            {
                "d": "M18,6 L17,4 15,2 13,1 9,1 7,2 5,4 4,6 3,9 3,14 4,17 5,19 7,21 9,22 13,22 15,21 17,19 18,17 18,14 M13,14 L18,14",
                "o": 11
            },
            {
                "d": "M4,1 L4,22 M18,1 L18,22 M4,11 L18,11",
                "o": 11
            },
            {
                "d": "M4,1 L4,22",
                "o": 4
            },
            {
                "d": "M12,1 L12,17 11,20 10,21 8,22 6,22 4,21 3,20 2,17 2,15",
                "o": 8
            },
            {
                "d": "M4,1 L4,22 M18,1 L4,15 M9,10 L18,22",
                "o": 10
            },
            {
                "d": "M4,1 L4,22 M4,22 L16,22",
                "o": 7
            },
            {
                "d": "M4,1 L4,22 M4,1 L12,22 M20,1 L12,22 M20,1 L20,22",
                "o": 12
            },
            {
                "d": "M4,1 L4,22 M4,1 L18,22 M18,1 L18,22",
                "o": 11
            },
            {
                "d": "M9,1 L7,2 5,4 4,6 3,9 3,14 4,17 5,19 7,21 9,22 13,22 15,21 17,19 18,17 19,14 19,9 18,6 17,4 15,2 13,1 9,1",
                "o": 11
            },
            {
                "d": "M4,1 L4,22 M4,1 L13,1 16,2 17,3 18,5 18,8 17,10 16,11 13,12 4,12",
                "o": 10
            },
            {
                "d": "M9,1 L7,2 5,4 4,6 3,9 3,14 4,17 5,19 7,21 9,22 13,22 15,21 17,19 18,17 19,14 19,9 18,6 17,4 15,2 13,1 9,1 M12,18 L18,24",
                "o": 11
            },
            {
                "d": "M4,1 L4,22 M4,1 L13,1 16,2 17,3 18,5 18,7 17,9 16,10 13,11 4,11 M11,11 L18,22",
                "o": 10
            },
            {
                "d": "M17,4 L15,2 12,1 8,1 5,2 3,4 3,6 4,8 5,9 7,10 13,12 15,13 16,14 17,16 17,19 15,21 12,22 8,22 5,21 3,19",
                "o": 10
            },
            {
                "d": "M8,1 L8,22 M1,1 L15,1",
                "o": 8
            },
            {
                "d": "M4,1 L4,16 5,19 7,21 10,22 12,22 15,21 17,19 18,16 18,1",
                "o": 11
            },
            {
                "d": "M1,1 L9,22 M17,1 L9,22",
                "o": 9
            },
            {
                "d": "M2,1 L7,22 M12,1 L7,22 M12,1 L17,22 M22,1 L17,22",
                "o": 12
            },
            {
                "d": "M3,1 L17,22 M17,1 L3,22",
                "o": 10
            },
            {
                "d": "M1,1 L9,11 9,22 M17,1 L9,11",
                "o": 9
            },
            {
                "d": "M17,1 L3,22 M3,1 L17,1 M3,22 L17,22",
                "o": 10
            },
            {
                "d": "M4,-3 L4,29 M5,-3 L5,29 M4,-3 L11,-3 M4,29 L11,29",
                "o": 7
            },
            {
                "d": "M0,1 L14,25",
                "o": 7
            },
            {
                "d": "M9,-3 L9,29 M10,-3 L10,29 M3,-3 L10,-3 M3,29 L10,29",
                "o": 7
            },
            {
                "d": "M8,-1 L0,13 M8,-1 L16,13",
                "o": 8
            },
            {
                "d": "M0,29 L18,29",
                "o": 9
            },
            {
                "d": "M5,6 L3,8 3,10 4,11 5,10 4,9 3,10",
                "o": 4
            },
            {
                "d": "M15,8 L15,22 M15,11 L13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 10
            },
            {
                "d": "M4,1 L4,22 M4,11 L6,9 8,8 11,8 13,9 15,11 16,14 16,16 15,19 13,21 11,22 8,22 6,21 4,19",
                "o": 9
            },
            {
                "d": "M15,11 L13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 9
            },
            {
                "d": "M15,1 L15,22 M15,11 L13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 10
            },
            {
                "d": "M3,14 L15,14 15,12 14,10 13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 9
            },
            {
                "d": "M10,1 L8,1 6,2 5,5 5,22 M2,8 L9,8",
                "o": 7
            },
            {
                "d": "M15,8 L15,24 14,27 13,28 11,29 8,29 6,28 M15,11 L13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 10
            },
            {
                "d": "M4,1 L4,22 M4,12 L7,9 9,8 12,8 14,9 15,12 15,22",
                "o": 10
            },
            {
                "d": "M3,1 L4,2 5,1 4,0 3,1 M4,8 L4,22",
                "o": 4
            },
            {
                "d": "M5,1 L6,2 7,1 6,0 5,1 M6,8 L6,25 5,28 3,29 1,29",
                "o": 5
            },
            {
                "d": "M4,1 L4,22 M14,8 L4,18 M8,14 L15,22",
                "o": 8
            },
            {
                "d": "M4,1 L4,22",
                "o": 4
            },
            {
                "d": "M4,8 L4,22 M4,12 L7,9 9,8 12,8 14,9 15,12 15,22 M15,12 L18,9 20,8 23,8 25,9 26,12 26,22",
                "o": 15
            },
            {
                "d": "M4,8 L4,22 M4,12 L7,9 9,8 12,8 14,9 15,12 15,22",
                "o": 10
            },
            {
                "d": "M8,8 L6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19 16,16 16,14 15,11 13,9 11,8 8,8",
                "o": 10
            },
            {
                "d": "M4,8 L4,29 M4,11 L6,9 8,8 11,8 13,9 15,11 16,14 16,16 15,19 13,21 11,22 8,22 6,21 4,19",
                "o": 9
            },
            {
                "d": "M15,8 L15,29 M15,11 L13,9 11,8 8,8 6,9 4,11 3,14 3,16 4,19 6,21 8,22 11,22 13,21 15,19",
                "o": 10
            },
            {
                "d": "M4,8 L4,22 M4,14 L5,11 7,9 9,8 12,8",
                "o": 7
            },
            {
                "d": "M14,11 L13,9 10,8 7,8 4,9 3,11 4,13 6,14 11,15 13,16 14,18 14,19 13,21 10,22 7,22 4,21 3,19",
                "o": 9
            },
            {
                "d": "M5,1 L5,18 6,21 8,22 10,22 M2,8 L9,8",
                "o": 6
            },
            {
                "d": "M4,8 L4,18 5,21 7,22 10,22 12,21 15,18 M15,8 L15,22",
                "o": 10
            },
            {
                "d": "M2,8 L8,22 M14,8 L8,22",
                "o": 8
            },
            {
                "d": "M3,8 L7,22 M11,8 L7,22 M11,8 L15,22 M19,8 L15,22",
                "o": 11
            },
            {
                "d": "M3,8 L14,22 M14,8 L3,22",
                "o": 9
            },
            {
                "d": "M2,8 L8,22 M14,8 L8,22 6,26 4,28 2,29 1,29",
                "o": 8
            },
            {
                "d": "M14,8 L3,22 M3,8 L14,8 M3,22 L14,22",
                "o": 9
            },
            {
                "d": "M9,-3 L7,-2 6,-1 5,1 5,3 6,5 7,6 8,8 8,10 6,12 M7,-2 L6,0 6,2 7,4 8,5 9,7 9,9 8,11 4,13 8,15 9,17 9,19 8,21 7,22 6,24 6,26 7,28 M6,14 L8,16 8,18 7,20 6,21 5,23 5,25 6,27 7,28 9,29",
                "o": 7
            },
            {
                "d": "M4,-3 L4,29",
                "o": 4
            },
            {
                "d": "M5,-3 L7,-2 8,-1 9,1 9,3 8,5 7,6 6,8 6,10 8,12 M7,-2 L8,0 8,2 7,4 6,5 5,7 5,9 6,11 10,13 6,15 5,17 5,19 6,21 7,22 8,24 8,26 7,28 M8,14 L6,16 6,18 7,20 8,21 9,23 9,25 8,27 7,28 5,29",
                "o": 7
            },
            {
                "d": "M3,16 L3,14 4,11 6,10 8,10 10,11 14,14 16,15 18,15 20,14 21,12 M3,14 L4,12 6,11 8,11 10,12 14,15 16,16 18,16 20,15 21,12 21,10",
                "o": 12
            },
            {
                "d": "M0,1 L0,22 1,22 1,1 2,1 2,22 3,22 3,1 4,1 4,22 5,22 5,1 6,1 6,22 7,22 7,1 8,1 8,22 9,22 9,1 10,1 10,22 11,22 11,1 12,1 12,22 13,22 13,1 14,1 14,22 15,22 15,1 16,1 16,22",
                "o": 8
            }
        ],
        script1Stroke: [
            {
                "d": "M5,1 L5,15 M5,20 L4,21 5,22 6,21 5,20",
                "o": 5
            },
            {
                "d": "M4,1 L4,8 M12,1 L12,8",
                "o": 8
            },
            {
                "d": "M11,-3 L4,29 M17,-3 L10,29 M4,10 L18,10 M3,16 L17,16",
                "o": 11
            },
            {
                "d": "M8,-3 L8,26 M12,-3 L12,26 M17,4 L15,2 12,1 8,1 5,2 3,4 3,6 4,8 5,9 7,10 13,12 15,13 16,14 17,16 17,19 15,21 12,22 8,22 5,21 3,19",
                "o": 10
            },
            {
                "d": "M21,1 L3,22 M8,1 L10,3 10,5 9,7 7,8 5,8 3,6 3,4 4,2 6,1 8,1 10,2 13,3 16,3 19,2 21,1 M17,15 L15,16 14,18 14,20 16,22 18,22 20,21 21,19 21,17 19,15 17,15",
                "o": 12
            },
            {
                "d": "M23,10 L23,9 22,8 21,8 20,9 19,11 17,16 15,19 13,21 11,22 7,22 5,21 4,20 3,18 3,16 4,14 5,13 12,9 13,8 14,6 14,4 13,2 11,1 9,2 8,4 8,6 9,9 11,12 16,19 18,21 20,22 22,22 23,21 23,20",
                "o": 13
            },
            {
                "d": "M2,8 L2,12",
                "o": 2
            },
            {
                "d": "M11,-3 L9,-1 7,2 5,6 4,11 4,15 5,20 7,24 9,27 11,29",
                "o": 7
            },
            {
                "d": "M3,-3 L5,-1 7,2 9,6 10,11 10,15 9,20 7,24 5,27 3,29",
                "o": 7
            },
            {
                "d": "M8,7 L8,19 M3,10 L13,16 M13,10 L3,16",
                "o": 8
            },
            {
                "d": "M13,4 L13,22 M4,13 L22,13",
                "o": 13
            },
            {
                "d": "M5,18 L4,19 3,18 4,17 5,18 5,20 3,22",
                "o": 4
            },
            {
                "d": "M4,13 L22,13",
                "o": 13
            },
            {
                "d": "M4,17 L3,18 4,19 5,18 4,17",
                "o": 4
            },
            {
                "d": "M20,-3 L2,29",
                "o": 11
            },
            {
                "d": "M9,1 L6,2 4,5 3,10 3,13 4,18 6,21 9,22 11,22 14,21 16,18 17,13 17,10 16,5 14,2 11,1 9,1",
                "o": 10
            },
            {
                "d": "M6,5 L8,4 11,1 11,22",
                "o": 10
            },
            {
                "d": "M4,6 L4,5 5,3 6,2 8,1 12,1 14,2 15,3 16,5 16,7 15,9 13,12 3,22 17,22",
                "o": 10
            },
            {
                "d": "M5,1 L16,1 10,9 13,9 15,10 16,11 17,14 17,16 16,19 14,21 11,22 8,22 5,21 4,20 3,18",
                "o": 10
            },
            {
                "d": "M13,1 L3,15 18,15 M13,1 L13,22",
                "o": 10
            },
            {
                "d": "M15,1 L5,1 4,10 5,9 8,8 11,8 14,9 16,11 17,14 17,16 16,19 14,21 11,22 8,22 5,21 4,20 3,18",
                "o": 10
            },
            {
                "d": "M16,4 L15,2 12,1 10,1 7,2 5,5 4,10 4,15 5,19 7,21 10,22 11,22 14,21 16,19 17,16 17,15 16,12 14,10 11,9 10,9 7,10 5,12 4,15",
                "o": 10
            },
            {
                "d": "M17,1 L7,22 M3,1 L17,1",
                "o": 10
            },
            {
                "d": "M8,1 L5,2 4,4 4,6 5,8 7,9 11,10 14,11 16,13 17,15 17,18 16,20 15,21 12,22 8,22 5,21 4,20 3,18 3,15 4,13 6,11 9,10 13,9 15,8 16,6 16,4 15,2 12,1 8,1",
                "o": 10
            },
            {
                "d": "M16,8 L15,11 13,13 10,14 9,14 6,13 4,11 3,8 3,7 4,4 6,2 9,1 10,1 13,2 15,4 16,8 16,13 15,18 13,21 10,22 8,22 5,21 4,19",
                "o": 10
            },
            {
                "d": "M4,10 L3,11 4,12 5,11 4,10 M4,17 L3,18 4,19 5,18 4,17",
                "o": 4
            },
            {
                "d": "M4,10 L3,11 4,12 5,11 4,10 M5,18 L4,19 3,18 4,17 5,18 5,20 3,22",
                "o": 4
            },
            {
                "d": "M20,4 L4,13 20,22",
                "o": 12
            },
            {
                "d": "M4,10 L22,10 M4,16 L22,16",
                "o": 13
            },
            {
                "d": "M4,4 L20,13 4,22",
                "o": 12
            },
            {
                "d": "M3,6 L3,5 4,3 5,2 7,1 11,1 13,2 14,3 15,5 15,7 14,9 13,10 9,12 9,15 M9,20 L8,21 9,22 10,21 9,20",
                "o": 9
            },
            {
                "d": "M18,9 L17,7 15,6 12,6 10,7 9,8 8,11 8,14 9,16 11,17 14,17 16,16 17,14 M12,6 L10,8 9,11 9,14 10,16 11,17 M18,6 L17,14 17,16 19,17 21,17 23,15 24,12 24,10 23,7 22,5 20,3 18,2 15,1 12,1 9,2 7,3 5,5 4,7 3,10 3,13 4,16 5,18 7,20 9,21 12,22 15,22 18,21 20,20 21,19 M19,6 L18,14 18,16 19,17",
                "o": 14
            },
            {
                "d": "M0,22 L2,21 5,18 8,14 12,7 15,1 15,22 14,19 12,16 10,14 7,12 5,12 4,13 4,15 5,17 7,19 10,21 13,22 18,22",
                "o": 9
            },
            {
                "d": "M13,3 L14,4 14,7 13,11 12,14 11,16 9,19 7,21 5,22 4,22 3,21 3,18 4,13 5,10 6,8 8,5 10,3 12,2 15,1 18,1 20,2 21,4 21,6 20,8 19,9 17,10 14,11 M13,11 L14,11 17,12 18,13 19,15 19,18 18,20 17,21 15,22 12,22 10,21 9,19",
                "o": 11
            },
            {
                "d": "M12,7 L12,8 13,9 15,9 17,8 18,6 18,4 17,2 15,1 12,1 9,2 7,4 5,7 4,9 3,13 3,17 4,20 5,21 7,22 9,22 12,21 14,19 15,17",
                "o": 10
            },
            {
                "d": "M13,1 L11,2 10,4 9,8 8,14 7,17 6,19 4,21 2,22 0,22 -1,21 -1,19 0,18 2,18 4,19 6,21 9,22 12,22 15,21 17,19 19,15 20,10 20,6 19,3 18,2 16,1 13,1 11,3 11,5 12,8 14,11 16,13 19,15 21,16",
                "o": 12
            },
            {
                "d": "M14,5 L14,6 15,7 17,7 18,6 18,4 17,2 14,1 10,1 7,2 6,4 6,7 7,9 8,10 11,11 8,11 5,12 4,13 3,15 3,18 4,20 5,21 8,22 11,22 14,21 16,19 17,17",
                "o": 10
            },
            {
                "d": "M10,7 L8,7 6,6 5,4 6,2 9,1 12,1 16,2 19,2 21,1 M16,2 L14,9 12,15 10,19 8,21 6,22 4,22 2,21 1,19 1,17 2,16 4,16 6,17 M9,11 L18,11",
                "o": 10
            },
            {
                "d": "M0,22 L2,21 6,17 9,12 10,9 11,5 11,2 10,1 9,1 8,2 7,4 7,7 8,9 10,10 14,10 17,9 18,8 19,6 19,12 18,17 17,19 15,21 12,22 8,22 5,21 3,19 2,17 2,15",
                "o": 12
            },
            {
                "d": "M7,8 L5,7 4,5 4,4 5,2 7,1 8,1 10,2 11,4 11,6 10,10 8,16 6,20 4,22 2,22 1,21 1,19 M7,13 L16,10 18,9 21,7 23,5 24,3 24,2 23,1 22,1 20,3 18,7 16,13 15,18 15,21 16,22 17,22 19,21 20,20 22,17",
                "o": 12
            },
            {
                "d": "M14,17 L12,15 10,12 9,10 8,7 8,4 9,2 10,1 12,1 13,2 14,4 14,7 13,12 11,17 10,19 8,21 6,22 4,22 2,21 1,19 1,17 2,16 4,16 6,17",
                "o": 8
            },
            {
                "d": "M10,25 L8,22 6,17 5,11 5,5 6,2 8,1 10,1 11,2 12,5 12,8 11,13 8,22 6,28 5,31 4,33 2,34 1,33 1,31 2,28 4,25 6,23 9,21 13,19",
                "o": 7
            },
            {
                "d": "M7,8 L5,7 4,5 4,4 5,2 7,1 8,1 10,2 11,4 11,6 10,10 8,16 6,20 4,22 2,22 1,21 1,19 M24,4 L24,2 23,1 22,1 20,2 18,4 16,7 14,9 12,10 10,10 M12,10 L13,12 13,19 14,21 15,22 16,22 18,21 19,20 21,17",
                "o": 12
            },
            {
                "d": "M4,13 L6,13 10,12 13,10 15,8 16,6 16,3 15,1 13,1 12,2 11,4 10,9 9,14 8,17 7,19 5,21 3,22 1,22 0,21 0,19 1,18 3,18 5,19 8,21 11,22 13,22 16,21 18,19",
                "o": 10
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,6 8,11 7,15 5,22 M7,15 L10,7 12,3 13,2 15,1 16,1 18,2 19,4 19,6 18,11 17,15 15,22 M17,15 L20,7 22,3 23,2 25,1 26,1 28,2 29,4 29,6 28,11 26,18 26,21 27,22 28,22 30,21 31,20 33,17",
                "o": 15
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,6 8,11 7,15 5,22 M7,15 L10,7 12,3 13,2 15,1 17,1 19,2 20,4 20,6 19,11 17,18 17,21 18,22 19,22 21,21 22,20 24,17",
                "o": 11
            },
            {
                "d": "M12,1 L9,2 7,4 5,7 4,9 3,13 3,17 4,20 5,21 7,22 9,22 12,21 14,19 16,16 17,14 18,10 18,6 17,3 16,2 14,1 12,1 10,3 10,6 11,9 13,12 15,14 18,16 20,17",
                "o": 11
            },
            {
                "d": "M13,3 L14,4 14,7 13,11 12,14 11,16 9,19 7,21 5,22 4,22 3,21 3,18 4,13 5,10 6,8 8,5 10,3 12,2 15,1 20,1 22,2 23,3 24,5 24,8 23,10 22,11 20,12 17,12 15,11 14,10",
                "o": 13
            },
            {
                "d": "M13,7 L12,9 11,10 9,11 7,11 6,9 6,7 7,4 9,2 12,1 15,1 17,2 18,4 18,8 17,11 15,14 11,18 8,20 6,21 3,22 1,22 0,21 0,19 1,18 3,18 5,19 8,21 11,22 14,22 17,21 19,19",
                "o": 12
            },
            {
                "d": "M13,3 L14,4 14,7 13,11 12,14 11,16 9,19 7,21 5,22 4,22 3,21 3,18 4,13 5,10 6,8 8,5 10,3 12,2 15,1 19,1 21,2 22,3 23,5 23,8 22,10 21,11 19,12 16,12 13,11 14,12 15,14 15,19 16,21 18,22 20,21 21,20 23,17",
                "o": 13
            },
            {
                "d": "M0,22 L2,21 4,19 7,15 9,12 11,8 12,5 12,2 11,1 10,1 9,2 8,4 8,6 9,8 11,10 14,12 16,14 17,16 17,18 16,20 15,21 12,22 8,22 5,21 3,19 2,17 2,15",
                "o": 10
            },
            {
                "d": "M10,7 L8,7 6,6 5,4 6,2 9,1 12,1 16,2 19,2 21,1 M16,2 L14,9 12,15 10,19 8,21 6,22 4,22 2,21 1,19 1,17 2,16 4,16 6,17",
                "o": 9
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,6 8,10 7,13 6,17 6,19 7,21 9,22 11,22 13,21 14,20 16,16 19,8 21,1 M19,8 L18,12 17,18 17,21 18,22 19,22 21,21 22,20 24,17",
                "o": 11
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,6 8,10 7,13 6,17 6,20 7,22 9,22 11,21 14,18 16,15 18,11 19,8 20,4 20,2 19,1 18,1 17,2 16,4 16,6 17,9 19,11 21,12",
                "o": 11
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,7 8,22 M18,1 L8,22 M18,1 L16,22 M30,1 L28,2 25,5 22,9 19,15 16,22",
                "o": 13
            },
            {
                "d": "M8,7 L6,7 5,6 5,4 6,2 8,1 10,1 12,2 13,4 13,7 11,16 11,19 12,21 14,22 16,22 18,21 19,19 19,17 18,16 16,16 M23,4 L23,2 22,1 20,1 18,2 16,4 14,7 10,16 8,19 6,21 4,22 2,22 1,21 1,19",
                "o": 12
            },
            {
                "d": "M5,8 L3,7 2,5 2,4 3,2 5,1 6,1 8,2 9,4 9,6 8,10 7,13 6,17 6,19 7,21 8,22 10,22 12,21 14,19 16,16 17,14 19,8 M21,1 L19,8 16,18 14,24 12,29 10,33 8,34 7,33 7,31 8,28 10,25 13,22 16,20 21,17",
                "o": 11
            },
            {
                "d": "M13,7 L12,9 11,10 9,11 7,11 6,9 6,7 7,4 9,2 12,1 15,1 17,2 18,4 18,8 17,11 15,15 12,18 8,21 6,22 3,22 2,21 2,19 3,18 6,18 8,19 9,20 10,22 10,25 9,28 8,30 6,33 4,34 3,33 3,31 4,28 6,25 9,22 12,20 18,17",
                "o": 11
            },
            {
                "d": "M4,-3 L4,29 M5,-3 L5,29 M4,-3 L11,-3 M4,29 L11,29",
                "o": 7
            },
            {
                "d": "M0,1 L14,25",
                "o": 7
            },
            {
                "d": "M9,-3 L9,29 M10,-3 L10,29 M3,-3 L10,-3 M3,29 L10,29",
                "o": 7
            },
            {
                "d": "M8,-1 L0,13 M8,-1 L16,13",
                "o": 8
            },
            {
                "d": "M0,29 L20,29",
                "o": 9
            },
            {
                "d": "M5,6 L3,8 3,10 4,11 5,10 4,9 3,10",
                "o": 4
            },
            {
                "d": "M9,16 L8,14 6,13 4,13 2,14 1,15 0,17 0,19 1,21 3,22 5,22 7,21 8,19 10,13 9,18 9,21 10,22 11,22 13,21 14,20 16,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,14 5,9 6,7 7,4 7,2 6,1 4,2 3,4 2,8 1,15 1,21 2,22 3,22 5,21 7,19 8,16 8,13 9,17 10,18 12,18 14,17",
                "o": 9
            },
            {
                "d": "M7,15 L7,14 6,13 4,13 2,14 1,15 0,17 0,19 1,21 3,22 6,22 9,20 11,17",
                "o": 6
            },
            {
                "d": "M9,16 L8,14 6,13 4,13 2,14 1,15 0,17 0,19 1,21 3,22 5,22 7,21 8,19 14,1 M10,13 L9,18 9,21 10,22 11,22 13,21 14,20 16,17",
                "o": 9
            },
            {
                "d": "M1,20 L3,19 4,18 5,16 5,14 4,13 3,13 1,14 0,16 0,19 1,21 3,22 5,22 7,21 8,20 10,17",
                "o": 6
            },
            {
                "d": "M0,17 L4,12 6,9 7,7 8,4 8,2 7,1 5,2 4,4 2,12 -1,21 -4,28 -5,31 -5,33 -4,34 -2,33 -1,30 0,21 1,22 3,22 5,21 6,20 8,17",
                "o": 5
            },
            {
                "d": "M9,16 L8,14 6,13 4,13 2,14 1,15 0,17 0,19 1,21 3,22 5,22 7,21 8,20 M10,13 L8,20 4,31 3,33 1,34 0,33 0,31 1,28 4,25 7,23 9,22 12,20 15,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,14 5,9 6,7 7,4 7,2 6,1 4,2 3,4 2,8 1,14 0,22 M0,22 L1,19 2,17 4,14 6,13 8,13 9,14 9,16 8,19 8,21 9,22 10,22 12,21 13,20 15,17",
                "o": 10
            },
            {
                "d": "M3,8 L3,9 4,9 4,8 3,8 M0,17 L2,13 0,19 0,21 1,22 2,22 4,21 5,20 7,17",
                "o": 4
            },
            {
                "d": "M3,8 L3,9 4,9 4,8 3,8 M0,17 L2,13 -4,31 -5,33 -7,34 -8,33 -8,31 -7,28 -4,25 -1,23 1,22 4,20 7,17",
                "o": 5
            },
            {
                "d": "M0,17 L2,14 5,9 6,7 7,4 7,2 6,1 4,2 3,4 2,8 1,14 0,22 M0,22 L1,19 2,17 4,14 6,13 8,13 9,14 9,16 7,17 4,17 M4,17 L6,18 7,21 8,22 9,22 11,21 12,20 14,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,14 5,9 6,7 7,4 7,2 6,1 4,2 3,4 2,8 1,15 1,21 2,22 3,22 5,21 6,20 8,17",
                "o": 5
            },
            {
                "d": "M0,17 L2,14 4,13 5,14 5,15 4,19 3,22 M4,19 L5,17 7,14 9,13 11,13 12,14 12,15 11,19 10,22 M11,19 L12,17 14,14 16,13 18,13 19,14 19,16 18,19 18,21 19,22 20,22 22,21 23,20 25,17",
                "o": 15
            },
            {
                "d": "M0,17 L2,14 4,13 5,14 5,15 4,19 3,22 M4,19 L5,17 7,14 9,13 11,13 12,14 12,16 11,19 11,21 12,22 13,22 15,21 16,20 18,17",
                "o": 10
            },
            {
                "d": "M6,13 L4,13 2,14 1,15 0,17 0,19 1,21 3,22 5,22 7,21 8,20 9,18 9,16 8,14 6,13 5,14 5,16 6,18 8,19 11,19 13,18 14,17",
                "o": 8
            },
            {
                "d": "M0,17 L2,14 3,12 2,16 -4,34 M2,16 L3,14 5,13 7,13 9,14 10,16 10,18 9,20 8,21 6,22 M2,21 L4,22 7,22 10,21 12,20 15,17",
                "o": 8
            },
            {
                "d": "M9,16 L8,14 6,13 4,13 2,14 1,15 0,17 0,19 1,21 3,22 5,22 7,21 M10,13 L9,16 7,21 4,28 3,31 3,33 4,34 6,33 7,30 7,23 9,22 12,20 15,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,14 3,12 3,14 6,14 7,15 7,17 6,20 6,21 7,22 8,22 10,21 11,20 13,17",
                "o": 8
            },
            {
                "d": "M0,17 L2,14 3,12 3,14 5,17 6,19 6,21 4,22 M0,21 L2,22 6,22 8,21 9,20 11,17",
                "o": 7
            },
            {
                "d": "M0,17 L2,14 4,10 M7,1 L1,19 1,21 2,22 4,22 6,21 7,20 9,17 M1,9 L8,9",
                "o": 6
            },
            {
                "d": "M0,17 L2,13 0,19 0,21 1,22 3,22 5,21 7,19 9,16 M10,13 L8,19 8,21 9,22 10,22 12,21 13,20 15,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,13 1,18 1,21 2,22 3,22 6,21 8,19 9,16 9,13 M9,13 L10,17 11,18 13,18 15,17",
                "o": 9
            },
            {
                "d": "M3,13 L1,15 0,18 0,20 1,22 3,22 5,21 7,19 M9,13 L7,19 7,21 8,22 10,22 12,21 14,19 15,16 15,13 M15,13 L16,17 17,18 19,18 21,17",
                "o": 12
            },
            {
                "d": "M0,17 L2,14 4,13 6,13 7,14 7,21 8,22 11,22 14,20 16,17 M13,14 L12,13 10,13 9,14 5,21 4,22 2,22 1,21",
                "o": 8
            },
            {
                "d": "M0,17 L2,13 0,19 0,21 1,22 3,22 5,21 7,19 9,16 M10,13 L4,31 3,33 1,34 0,33 0,31 1,28 4,25 7,23 9,22 12,20 15,17",
                "o": 9
            },
            {
                "d": "M0,17 L2,14 4,13 6,13 8,15 8,17 7,19 5,21 2,22 4,23 5,25 5,28 4,31 3,33 1,34 0,33 0,31 1,28 4,25 7,23 11,20 14,17",
                "o": 8
            },
            {
                "d": "M9,-3 L7,-2 6,-1 5,1 5,3 6,5 7,6 8,8 8,10 6,12 M7,-2 L6,0 6,2 7,4 8,5 9,7 9,9 8,11 4,13 8,15 9,17 9,19 8,21 7,22 6,24 6,26 7,28 M6,14 L8,16 8,18 7,20 6,21 5,23 5,25 6,27 7,28 9,29",
                "o": 7
            },
            {
                "d": "M4,-3 L4,29",
                "o": 4
            },
            {
                "d": "M5,-3 L7,-2 8,-1 9,1 9,3 8,5 7,6 6,8 6,10 8,12 M7,-2 L8,0 8,2 7,4 6,5 5,7 5,9 6,11 10,13 6,15 5,17 5,19 6,21 7,22 8,24 8,26 7,28 M8,14 L6,16 6,18 7,20 8,21 9,23 9,25 8,27 7,28 5,29",
                "o": 7
            },
            {
                "d": "M3,16 L3,14 4,11 6,10 8,10 10,11 14,14 16,15 18,15 20,14 21,12 M3,14 L4,12 6,11 8,11 10,12 14,15 16,16 18,16 20,15 21,12 21,10",
                "o": 12
            },
            {
                "d": "M0,1 L0,22 1,22 1,1 2,1 2,22 3,22 3,1 4,1 4,22 5,22 5,1 6,1 6,22 7,22 7,1 8,1 8,22 9,22 9,1 10,1 10,22 11,22 11,1 12,1 12,22 13,22 13,1 14,1 14,22 15,22 15,1 16,1 16,22",
                "o": 8
            }
        ]
    }

    // Array to store svg paths of each letter
    let svgPaths = []

    // Loop through each character in the text
    for (i = 0; i < text.length; i++) {
        // Check if the character is a backslash
        if (text[i] === '\\') {
            // Add a line change path with zero separation
            svgPaths.push({path: 'lineChange', separation: 0});
        } 
        // Check if the character is a space
        else if (text[i] === ' ') {
            // Add a space path with a separation of 6 units
            svgPaths.push({path: 'M 0 10', separation: 6});
        } 
        // For other characters
        else {
            // Add the corresponding SVG path and separation based on the Hershey font data
            svgPaths.push({
                path: fonts[font][text[i].charCodeAt(0)-33]['d'],
                separation: parseInt(fonts[font][text[i].charCodeAt(0)-33]['o'], 10)
            });
        }
    }

    // Variables for line and character positioning
    const combinedPath = []; // Array to store the combined SVG path
    const goToNextLineFrom = 16; // Number of characters before starting a new line
    const yOffset = 30; // Vertical offset for new lines

    let currentXOffset = 0; // Current horizontal offset
    let currentYOffset = 0; // Current vertical offset
    let characterCount = 0; // Count of characters processed in the current line
    let isCurrentCharSpace = false; // Flag to check if the current character is a space
    let isChangingLine = false; // Flag to check if a new line is being started

    // Process each path element in the SVG paths array
    svgPaths.forEach((element) => {
        let path = element['path'];
        const xOffset = element['separation'] * 1.68; // Calculate the horizontal separation
        const pathAsArray = path.match(/[a-z]|[-+]?([0-9]*\.[0-9]+|[0-9]+)/ig); // Split path into commands and coordinates

        characterCount += 1; // Increment the character count
        isCurrentCharSpace = path == 'M 0 10' ? true : false; // Check if the path is a space
        isChangingLine = path == 'lineChange' ? true : false; // Check if the path indicates a line change

        // Check if a new line should be started
        if ((characterCount >= goToNextLineFrom && isCurrentCharSpace) || isChangingLine) {
            characterCount = 0; // Reset character count
            currentYOffset += yOffset; // Move to the next line vertically
            currentXOffset = 0; // Reset horizontal offset
            isChangingLine = true; // Set flag to indicate line change
        }

        // If not changing lines, adjust the path coordinates
        if (!isChangingLine) {
            let currentTerm = 0; // Term index for x (0) and y (1) coordinates
            for (let i = 0; i < pathAsArray.length; i++) {
                if (pathAsArray[i] === 'M' || pathAsArray[i] === 'L') {
                    currentTerm = 0; // Reset term index for move (M) and line (L) commands
                } else {
                    if (currentTerm == 0) {
                        let value = parseFloat(pathAsArray[i]);
                        pathAsArray[i] = value + parseFloat(currentXOffset); // Adjust x coordinate
                        currentTerm = 1; // Move to y coordinate
                    } else {
                        let value = parseFloat(pathAsArray[i]);
                        pathAsArray[i] = value + parseFloat(currentYOffset); // Adjust y coordinate
                        currentTerm = 0; // Move back to x coordinate
                    }
                }
            }
            const translatedPath = pathAsArray.join(" "); // Join the adjusted path commands and coordinates
            currentXOffset += xOffset; // Update the current horizontal offset
            isChangingLine = false; // Reset line change flag
            combinedPath.push(translatedPath); // Add the translated path to the combined path
        }
    });

    // Combine all path segments into a single path
    let fullPath = combinedPath.join(" ");
    const currentBBox = findBoundingBox(fullPath); // Get the bounding box of the combined path

    // Calculate scale factors for x and y dimensions
    const scaleX = boundingBox.width / currentBBox.width;
    const scaleY = boundingBox.height / currentBBox.height;

    // Choose the smaller scale factor to maintain the aspect ratio
    const scale = Math.min(scaleX, scaleY);

    // Calculate translation to align the scaled path with the desired bounding box
    const translateX = boundingBox.x - (currentBBox.x * scale) + (boundingBox.width - (currentBBox.width * scale)) / 2;
    const translateY = boundingBox.y - (currentBBox.y * scale) + (boundingBox.height - (currentBBox.height * scale)) / 2;

    // Adjust the path with scaling and translation
    const fullPathAsArray = fullPath.match(/[a-z]|[-+]?([0-9]*\.[0-9]+|[0-9]+)/ig); 

    let currentTerm = 0;
    for (let i = 0; i < fullPathAsArray.length; i++) {
        if (fullPathAsArray[i] === 'M' || fullPathAsArray[i] === 'L') {
            currentTerm = 0;
        } else {
            if (currentTerm == 0) {
                let value = parseFloat(fullPathAsArray[i]);
                fullPathAsArray[i] = parseFloat((value * scale + translateX).toFixed(3)); // Scale and translate x coordinate
                currentTerm = 1;
            } else {
                let value = parseFloat(fullPathAsArray[i]);
                fullPathAsArray[i] = parseFloat((value * scale + translateY).toFixed(3)); // Scale and translate y coordinate
                currentTerm = 0;
            }
        }
    }

    // Return the transformed SVG path
    const transformedPath = fullPathAsArray.join(" ");
    return transformedPath;
}

// Function to draw text to SVG element
function drawTextToSVG(font) {
    const inputValue = textToDrawInput.value;
    const boundingBox = { x: 0, y: 0, width: 512, height: 512 };
    textToDrawInput.value = "";

    // Create SVG path from the input text
    const svgPath = createSVGPathFromHershey(inputValue, boundingBox, font);
    const svgObject = { name: inputValue, path: svgPath, box: boundingBox };
    SVGS.push(svgObject); // Add the SVG object to the SVGS array
    createSVGImage(SVGS.length - 1, $images, svgPath, boundingBox); // Create the SVG image
    animation._start(Animation.SVG(svgObject, animation.drawingSize, animation.drawingSpeed)); // Start the animation
    animation.currentPath = [[], [], [], []]; // Reset the current path for animation
    animation.stopDrawingPath = false; // Reset the stop drawing flag
}