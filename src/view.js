function renderView(canvas, data, backgroundImage) {
  const ctxSize = 512;
  var ctx = canvas.getContext("2d");
  //ctx.globalAlpha = 0.45;

  ctx.filter = "brightness(55%)";
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.filter = "brightness(100%)";
  //ctx.globalAlpha = 1.0;
  ctx.fillStyle = "white";

  let fontSizeHoursLabel = 28;
  let fontSizeHours = 30;
  let fontSizeTemperature = 23;
  let fontSizeInfo = 18;

  let y = 75;
  ctx.font = "lighter 48px sans-serif";
  let title = data["name"];
  let m = ctx.measureText(title);
  ctx.fillText(title, ctxSize / 2 - m.width / 2, y);

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

  text = "Öffnungszeiten heute:";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  y += 40;
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  renderText(ctx, ctxSize, text, y, fontSizeHours);

  text = "Planung morgen:";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHours);

  text = "Planung übermorgen:";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHoursLabel, 300);
  text = "08:00-09:00 und 10:00-20:00 Uhr";
  y += 40;
  renderText(ctx, ctxSize, text, y, fontSizeHours);

  y += 50;
  text = "Öffnungszeiten können sich kurzfristig ändern!";
  renderText(ctx, ctxSize, text, y, fontSizeInfo, 300, true);
}

function renderText(
  ctx,
  ctxSize,
  text,
  y,
  fontSize,
  fontWeight = 600,
  italic = false
) {
  ctx.filter = "blur(6px)";
  ctx.fillStyle = "black";
  let font = "";
  if (italic) font += "italic ";
  font += fontWeight + " " + fontSize + "px sans-serif";
  ctx.font = font;
  let m = ctx.measureText(text);
  for (k = 0; k < 3; k++) ctx.fillText(text, ctxSize / 2 - m.width / 2, y);
  ctx.filter = "none";
  ctx.fillStyle = "white";
  ctx.font = font;
  m = ctx.measureText(text);
  ctx.fillText(text, ctxSize / 2 - m.width / 2, y);
}
