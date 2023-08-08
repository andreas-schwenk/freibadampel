// ----- load data -----
let data = {};
// TODO: check for errors
fetch("data.json")
  .then((response) => response.json())
  .then((d) => {
    data = d;
    showPreview();
  });

// ----- publish -----
function publish() {
  let img = document
    .getElementById("preview-canvas")
    .toDataURL("image/jpeg", 0.5);
  console.log(img);
  fetch("save.php", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "img-data": img }),
    //body: "just a test",
  }).then(() => {
    showPublished();
  });
}
document.getElementById("publish").addEventListener("click", () => {
  publish();
});

// ----- menu -----
let menuItemIDs = ["preview", "temperature", "hours", "std-hours", "pools"];
let menuElements = [];
let divElements = [];
for (let id of menuItemIDs) {
  let menuElement = document.getElementById("menu-" + id);
  menuElements.push(menuElement);
  let divElement = document.getElementById("div-" + id);
  divElements.push(divElement);
  menuElement.addEventListener("click", () => {
    for (let i = 0; i < menuElements.length; i++) {
      let u = menuElements[i];
      u.classList.value = "";
      u.classList.add(menuElement == u ? "button-primary" : "button");
      let v = divElements[i];
      v.style.display = menuElement == u ? "block" : "none";
    }
    if (id == "temperature") showTemperature();
    else if (id == "preview") {
      showPreview();
      showPublished();
    }
    window.scrollTo(0, 0);
  });
}

// ----- temperature -----
function showTemperature() {
  let parent = document.getElementById("div-temperature");
  parent.innerHTML = "";
  for (let i = 0; i < data["pools"].length; i++) {
    let dataPool = data["pools"][i];
    let panel = document.createElement("div");
    parent.appendChild(panel);
    panel.classList.add("panel");
    // title
    let title = document.createElement("b");
    title.innerHTML = dataPool["id"] + " / °C";
    title.style.fontSize = "large";
    panel.appendChild(title);
    // line break
    panel.appendChild(document.createElement("br"));
    // current temperature
    let currentTemp = document.createElement("div");
    panel.appendChild(currentTemp);
    currentTemp.style.textAlign = "center";
    currentTemp.style.fontSize = "x-large";
    currentTemp.innerHTML =
      "" + dataPool["temp"][0] + "," + dataPool["temp"][1];
    // pre decimal place selection
    let preDecimalPlace = document.createElement("div");
    panel.appendChild(preDecimalPlace);
    preDecimalPlace.paddingTop = "4px";
    preDecimalPlace.innerHTML = "Vorkommastelle";
    let preDecimalPlaceSlider = document.createElement("div");
    panel.appendChild(preDecimalPlaceSlider);
    preDecimalPlaceSlider.classList.add("sliderContainer");
    let preDecimalPlaceSliderActiveElement = generateNumberButtons(
      (value) => {
        dataPool["temp"][0] = value;
        currentTemp.innerHTML =
          "" + dataPool["temp"][0] + "," + dataPool["temp"][1];
      },
      preDecimalPlaceSlider,
      10,
      35,
      dataPool["temp"][0]
    );
    // decimal place selection
    let decimalPlace = document.createElement("div");
    panel.appendChild(decimalPlace);
    decimalPlace.paddingTop = "4px";
    decimalPlace.innerHTML = "Nachkommastelle";
    let decimalPlaceSlider = document.createElement("div");
    panel.appendChild(decimalPlaceSlider);
    decimalPlaceSlider.classList.add("sliderContainer");
    let decimalPlaceSliderActiveElement = generateNumberButtons(
      (value) => {
        dataPool["temp"][1] = value;
        currentTemp.innerHTML =
          "" + dataPool["temp"][0] + "," + dataPool["temp"][1];
      },
      decimalPlaceSlider,
      0,
      9,
      dataPool["temp"][1]
    );
    // line break
    panel.appendChild(document.createElement("br"));
    // checkbox: show water temperature
    let checkboxShow = document.createElement("input");
    checkboxShow.type = "checkbox";
    panel.appendChild(checkboxShow);
    checkboxShow.checked = dataPool["showTemp"];
    let checkboxShowText = document.createElement("span");
    checkboxShowText.innerHTML = " " + "Wassertemperatur anzeigen";
    checkboxShowText.style.cursor = "pointer";
    panel.appendChild(checkboxShowText);
    checkboxShow.addEventListener("click", () => {
      dataPool["showTemp"] = checkboxShow.checked;
    });
    checkboxShowText.addEventListener("click", () => {
      checkboxShow.click();
      dataPool["showTemp"] = checkboxShow.checked;
    });
    // spacing after panel
    parent.appendChild(document.createElement("br"));
    // scroll to active: TODO: DOES NOT WORK!!
    if (preDecimalPlaceSliderActiveElement != null)
      preDecimalPlaceSliderActiveElement.scrollIntoView();
    if (decimalPlaceSliderActiveElement != null)
      decimalPlaceSliderActiveElement.scrollIntoView();
  }
}

// ----- render output -----

let img = document.getElementById("my-img");
img.addEventListener("load", (e) => {
  showPreview();
  showPublished();
});

function showPreview() {
  let canvas = document.getElementById("preview-canvas");
  renderView(canvas, data);
}

function showPublished() {
  document.getElementById("public-img").src = "blub.jpg?v=" + Date.now();
}

// ----- GUI helpers -----
function generateNumberButtons(fun, parent, start, end, active = -1) {
  parent.innerHTML = "";
  let activeElement = null;
  let elements = [];
  for (let i = start; i <= end; i++) {
    let element = document.createElement("span");
    elements.push(element);
    element.innerHTML = "" + i;
    element.classList.add(i == active ? "checkedBox" : "uncheckedBox");
    parent.appendChild(element);
  }
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.addEventListener("click", () => {
      for (let j = 0; j < elements.length; j++) {
        let element2 = elements[j];
        element2.classList.value = "";
        if (i == j) {
          element2.classList.add("checkedBox");
        } else {
          element2.classList.add("uncheckedBox");
        }
      }
      fun(start + i);
    });
  }
  if (activeElement != null) activeElement.scrollIntoView();
  return activeElement;
}

function generateTimeButtons(parent, start, end, active = -1) {
  // time = 4*hour + quarter
  parent.innerHTML = "";
  let activeElement = null;
  let elements = [];
  for (let i = start; i <= end; i++) {
    let hour = "" + Math.floor(i / 4);
    let minute = "" + Math.floor(i % 4) * 15;
    if (minute.length == 1) minute = "0" + minute;
    let element = document.createElement("span");
    elements.push(element);
    element.style.marginRight = "4px";
    element.innerHTML = "" + hour + ":" + minute;
    element.classList.add(i == active ? "checkedBox" : "uncheckedBox");
    parent.appendChild(element);
    if (i == active) activeElement = element;
  }
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.addEventListener("click", () => {
      for (let j = 0; j < elements.length; j++) {
        let element2 = elements[j];
        element2.classList.value = "";
        if (i == j) {
          element2.classList.add("checkedBox");
        } else {
          element2.classList.add("uncheckedBox");
        }
      }
    });
  }
  if (activeElement != null) activeElement.scrollIntoView();
  return elements;
}

// ----- temporary tests -----
/*generateNumberButtons(
  document.getElementById("water-temperature-test"),
  10,
  35,
  20
);

generateNumberButtons(
  document.getElementById("water-temperature-test-2"),
  0,
  9,
  1
);*/

generateTimeButtons(document.getElementById("time-test"), 5 * 4, 22 * 4, 8 * 4);
generateTimeButtons(
  document.getElementById("time-test-2"),
  5 * 4,
  22 * 4,
  16 * 4
);

// ----- switch page warning -----
var isDirty = function () {
  return true;
};
window.onload = function () {
  window.addEventListener("beforeunload", function (e) {
    if (!isDirty()) {
      return undefined;
    }
    var confirmationMessage =
      "It looks like you have been editing something. " +
      "If you leave before saving, your changes will be lost.";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });
};
