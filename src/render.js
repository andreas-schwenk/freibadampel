/**
 * @param {HTMLCanvasElement} canvas
 * @param {*} data
 * @param {*} backgroundImage
 */
export function renderView(canvas, data, backgroundImage) {
  const ctxSize = 512;
  var ctx = canvas.getContext("2d");
  //ctx.globalAlpha = 0.45;

  //ctx.filter = "brightness(45%)";
  ctx.globalAlpha = 0.65;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.globalAlpha = 1.0;
  ctx.filter = "brightness(100%)";
  //ctx.globalAlpha = 1.0;
  ctx.fillStyle = "black";

  let fontSizeHoursLabel = 28;
  let fontSizeHours = 30;
  let fontSizeTemperature = 23;
  let fontSizeInfo = 20;

  let y = 75;
  ctx.font = "52px sans-serif";
  let title = data["name"];
  let m = ctx.measureText(title);
  ctx.fillText(title, ctxSize / 2 - m.width / 2, y, 500);

  y += 35;

  for (let i = 0; i < data["pools"].length; i++) {
    let poolData = data["pools"][i];
    if (poolData["showTemp"] == false) continue;
    text =
      poolData["id"] +
      ": " +
      poolData["temp"][0] +
      "," +
      poolData["temp"][1] +
      " °C";
    y += 30;
    renderText(ctx, ctxSize, text, y, fontSizeTemperature, 300);
  }

  y += 30;

  //text = "Öffnungszeiten heute:";
  y += 35;
  text = "heute";
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  y += 40;
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  renderText(ctx, ctxSize, text, y, fontSizeHours, 1000);

  y += 50;
  //text = "Planung morgen:";
  text = "morgen";
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  y += 40;
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  renderText(ctx, ctxSize, text, y, fontSizeHours, 1000);

  y += 50;
  //text = "Planung übermorgen:";
  text = "übermorgen";
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHours, 1000);

  y += 50;
  text = "Öffnungszeiten können sich kurzfristig ändern!";
  renderText(ctx, ctxSize, text, y, fontSizeInfo, 400, true);
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} ctxSize
 * @param {string} text
 * @param {number} y
 * @param {number} fontSize
 * @param {number} fontWeight
 * @param {boolean} italic
 */
function renderText(
  ctx,
  ctxSize,
  text,
  y,
  fontSize,
  fontWeight = 600,
  italic = false
) {
  const maxWidth = 500;
  ctx.filter = "blur(2px)";
  ctx.fillStyle = "white";
  let font = "";
  if (italic) font += "italic ";
  font += fontWeight + " " + fontSize + "px sans-serif";
  ctx.font = font;
  let m = ctx.measureText(text);
  if (m > maxWidth) m = maxWidth;
  //for (k = 0; k < 3; k++) {
  ctx.font = font;
  ctx.fillText(text, ctxSize / 2 - m.width / 2, y, maxWidth);
  //}
  ctx.filter = "none";
  ctx.fillStyle = "black";
  ctx.font = font;
  m = ctx.measureText(text);
  ctx.fillText(text, ctxSize / 2 - m.width / 2, y, maxWidth);

  //ctx.strokeStyle = "black";
  // ctx.font = font;
  // ctx.lineWidth = 1.5;
  // ctx.strokeText(text, ctxSize / 2 - m.width / 2, y);
}
