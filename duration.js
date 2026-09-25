async function startStudy() {
  if (intervalId) return;

  const minutes = Number(durationSelect.value);

  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 480) {
    statusText.textContent = "Kies een tijd van 1 tot 480 minuten.";
    return;
  }

  remainingSeconds = minutes * 60;
  endTime = Date.now() + remainingSeconds * 1000;

  durationSelect.disabled = true;
  startButton.disabled = true;
  statusText.textContent = "Studiemodus actief. Succes!";

  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch (error) {
    // De timer werkt ook als het scherm niet wakker gehouden kan worden.
  }

  intervalId = setInterval(() => {
    remainingSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    showTime();

    if (remainingSeconds <= 0) {
      stopStudy("Studietijd is klaar. Goed gedaan!");
    }
  }, 250);

  showTime();
}
