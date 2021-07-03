const fileSelector = document.getElementById('file_input');
fileSelector.addEventListener('change', (event) => {
    readFile();
});

function readFile() {
    var file = document.getElementById("file_input").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let json = JSON.parse(evt.target.result);
            let outputCanvas = document.getElementById("output");
            outputCanvas.style.width = json.width + "px";
            outputCanvas.style.height = json.height + "px";
            if (json.background && json.background.toString().endsWith(')')) {
                outputCanvas.style.backgroundRepeat = "no-repeat";
                outputCanvas.style.backgroundSize = "cover";
                if (json.background.toString().startsWith("color(")) {
                    outputCanvas.style.backgroundColor = json.background.toString().slice(6, json.background.toString().length - 1)
                } else if (json.background.toString().startsWith("image(")) {
                    outputCanvas.style.backgroundImage = `url("data:image/png;base64,${json.background.toString().slice(6, json.background.toString().length - 1)}")`
                } else if (json.background.toString().startsWith("gif(")) {
                    outputCanvas.style.backgroundImage = `url("data:image/gif;base64,${json.background.toString().slice(4, json.background.toString().length - 1)}")`
                }
            }
            for (var i = 0; i < json.elements.length; i++) {
                let element = json.elements[i];
                if (element.type === "image" || element.type === "gif") {
                    let domElm = document.createElement("div");
                    domElm.style.zIndex = element.z_index || "auto";
                    domElm.style.backgroundRepeat = "no-repeat";
                    domElm.style.backgroundSize = "cover";
                    domElm.style.width = element.width + "px";
                    domElm.style.height = element.height + "px";
                    domElm.style.left = 0;
                    domElm.style.bottom = 0;
                    element.x = Number(element.x);
                    element.y = Number(element.y);
                    element.width = Number(element.width);
                    element.height = Number(element.height);
                    let translateX = element.x - (element.width / 2);
                    let translateY = element.y - (element.height / 2);
                    if (!element.position) element.position = "bottom left"
                    if (element.position === "center") true;
                    else {
                        let options = element.position.split(" ");
                        console.log(options)
                        if (options[0] === "top") {
                            translateY = element.y - element.height;
                        } else translateY = element.y;

                        if (options[1] === "left") {
                            translateX = element.x
                        } else translateX = element.x - element.width
                    }
                    domElm.style.transform = `translate(${translateX}px, -${translateY}px)`;
                    if (element.type === "gif") {
                        domElm.style.backgroundImage = `url("data:image/gif;base64,${element.data.base64}")`;
                    }
                    else {
                        domElm.style.backgroundImage = `url("data:image/png;base64,${element.data.base64}")`;
                    }
                    domElm.classList.add("child-elements")
                    document.getElementById("output").appendChild(domElm)
                } else if (element.type === "text") {
                    let domElm = document.createElement("div");
                    domElm.style.zIndex = element.z_index || "auto";
                    domElm.style.backgroundRepeat = "no-repeat";
                    domElm.style.backgroundSize = "cover";
                    domElm.style.width = element.width + "px";
                    domElm.style.height = element.height + "px";
                    domElm.style.left = 0;
                    domElm.style.bottom = 0;
                    element.x = Number(element.x);
                    element.y = Number(element.y);
                    element.width = Number(element.width);
                    element.height = Number(element.height);
                    let translateX = element.x - (element.width / 2);
                    let translateY = element.y - (element.height / 2);
                    if (!element.position) element.position = "bottom left"
                    if (element.position === "center") true;
                    else {
                        let options = element.position.split(" ");
                        console.log(options)
                        if (options[0] === "top") {
                            translateY = element.y - element.height;
                        } else translateY = element.y;

                        if (options[1] === "left") {
                            translateX = element.x
                        } else translateX = element.x - element.width
                    }
                    domElm.style.transform = `translate(${translateX}px, -${translateY}px)`;
                    if (element.data.background.startsWith("color(")) {
                        domElm.style.backgroundColor = element.data.background.toString().slice(6, element.data.background.length - 1)
                    } else if (element.data.background.startsWith("image(")) {
                        domElm.style.backgroundImage = `url("data:image/png;base64,${element.data.toString().slice(6, element.data.toString().length - 1)}")`
                    } else if (element.data.background.startsWith("gif(")) {
                        domElm.style.backgroundImage = `url("data:image/gif;base64,${element.data.toString().slice(4, element.data.toString().length - 1)}")`
                    }
                    // done with parent element
                    // start of child element (text)
                    let textElm = document.createElement("span");
                    var mode = "innerText";
                    if (element.data.mode) mode = element.data.mode;
                    textElm[mode] = element.data.text;
                    textElm.style.fontFamily = element.data.font || "impact";
                    textElm.style.fontSize = element.data.font_size || undefined;
                    textElm.style.fontWeight = element.data.font_weight || undefined;
                    textElm.style.color = element.data.color || "white";
                    if (element.data.overflow === "none") {
                        textElm.style.whiteSpace = "nowrap";
                        textElm.style.overflow = "hidden";
                    }
                    textElm.style.textAlign = element.data.text_align || "center"
                    textElm.style.display = "block";
                    domElm.classList.add("child-elements")
                    domElm.appendChild(textElm);
                    document.getElementById("output").appendChild(domElm)
                }
            }
        }
        reader.onerror = function (evt) {
        }
    }
}