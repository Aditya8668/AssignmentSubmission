const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/compare', upload.fields([{ name: 'sampleFile' }, { name: 'comparisonFile' }]), (req, res) => {
    const sampleFile = req.files['sampleFile'][0];
    const comparisonFile = req.files['comparisonFile'][0];

    if (!sampleFile || !comparisonFile) {
        return res.json({ result: 'Both documents are required for comparison.' });
    }

    const sampleContent = fs.readFileSync(sampleFile.path, 'utf-8');
    const comparisonContent = fs.readFileSync(comparisonFile.path, 'utf-8');

    let result;
    if (sampleContent === comparisonContent) {
        result = 'No differences found.';
    } else {
        result = 'Differences were found between the documents.';
    }

    fs.unlinkSync(sampleFile.path);
    fs.unlinkSync(comparisonFile.path);

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
