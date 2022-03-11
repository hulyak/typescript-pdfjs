import * as pdfjsLib from "pdfjs-dist";

// The workerSrc property shall be specified.
// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.13.216/build/pdf.min.js";

(async () => {
  const loadingTask = pdfjsLib.getDocument("example.pdf");
  const pdf = await loadingTask.promise;

  // Load information from the first page.
  const page = await pdf.getPage(1);

  const scale = 1;
  const viewport = page.getViewport({ scale });

  // Apply page dimensions to the `<canvas>` element.
  const canvas = document.getElementById("pdf") as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render the page into the `<canvas>` element.
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  await page.render(renderContext);
  console.log("Page rendered!");
})();
