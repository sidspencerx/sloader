import { loadWithSloaderWeb } from "/packages/sloader-web/dist/index.js";

const urlInput = document.getElementById("url-input");
const runBtn = document.getElementById("run-btn");
const resultEl = document.getElementById("result");

runBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  resultEl.textContent = "Running sloader...\n";

  try {
    const result = await loadWithSloaderWeb(url, {
      maxScrollSteps: 10,
      scrollDelayMs: 300
    });

    resultEl.textContent = JSON.stringify(result, null, 2);
  } catch (err) {
    resultEl.textContent = "Error:\n" + err.message;
  }
});
