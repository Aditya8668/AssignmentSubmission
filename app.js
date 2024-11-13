
function compareDocuments() {
    const sampleFile = document.getElementById("sampleFile").files[0];
    const comparisonFile = document.getElementById("comparisonFile").files[0];
    const resultSection = document.getElementById("comparisonResult");

    if (!sampleFile || !comparisonFile) {
        resultSection.innerHTML = "Please upload both documents to compare.";
        return;
    }

    const formData = new FormData();
    formData.append("sampleFile", sampleFile);
    formData.append("comparisonFile", comparisonFile);

    resultSection.innerHTML = "Comparing documents, please wait...";

    fetch('/compare', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultSection.innerHTML = data.result || "No differences found.";
    })
    .catch(error => {
        console.error("Error:", error);
        resultSection.innerHTML = "An error occurred during comparison.";
    });
}
