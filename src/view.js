import "../ext/context-filter-polyfill/index.min.js";

import { renderView } from "./render.js";

let canvas = document.getElementById("canvas");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("key");
const pathData = "public/" + id + ".json";
const pathImg = "public/" + id + ".jpg";
if (urlParams.has("width")) {
  let w = urlParams.get("width");
  canvas.style.width = w;
  canvas.style.height = w;
}
fetch(pathData)
  .then((response) => response.json())
  .then((data) => {
    fetch(pathImg)
      .then((response) => response.blob())
      .then((imgData) => {
        imgData = URL.createObjectURL(imgData);
        let backgroundImage = document.getElementById("background-image");
        backgroundImage.src = imgData;
        backgroundImage.onload = function () {
          renderView(canvas, data, backgroundImage);
        };
      });
  });
