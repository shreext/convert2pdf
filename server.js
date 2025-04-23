const express = require('express');
const path = require('path');
const app = express();
const { spawn } = require('child_process');
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const { createServer } = require("http");

const PORT = process.env.PORT || 3080; // Use Railway’s assigned port

const UPLOAD_FOLDER = "uploads";
const CONVERTED_FOLDER = "converted";

// Ensure folders exist
fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
fs.mkdirSync(CONVERTED_FOLDER, { recursive: true });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure file upload
const storage = multer.diskStorage({
    destination: UPLOAD_FOLDER,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Render HTML files as templates (allows variables)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// Merge Index Html File
app.get("/merge", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/merge.html'));
});

// Split Index Html File
app.get("/split", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/split.html'));
});

// PDFTOIMG Index Html File
app.get("/pdf-to-img", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/pdf-to-img.html'));
});

// IMGTOPDF Index Html File
app.get("/img-to-pdf", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/img-to-pdf.html'));
});

// Rotate Index Html File
app.get("/rotate", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/rotate.html'));
});

// Privacy Index Html File
app.get("/privacy", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/privacy-policy.html'));
});

// Terms Index Html File
app.get("/terms", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/terms.html'));
});

// Disclaimer Index Html File
app.get("/disclaimer", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/disclaimer.html'));
});

// Doc Index Html File
app.get("/doc-to-pdf", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/doc-to-pdf.html'));
});

// Doc Index Handle file upload and conversion
app.post("/docConvert", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const inputPath = path.join(__dirname, UPLOAD_FOLDER, req.file.filename);
    const outputFilename = req.file.filename.replace(/\.docx?$/, ".pdf");
    const outputPath = path.join(__dirname, CONVERTED_FOLDER, outputFilename);

    // Run LibreOffice conversion command
    exec(`soffice --headless --convert-to pdf "${inputPath}" --outdir "${CONVERTED_FOLDER}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).send("Conversion failed.");

        // Delete the DOCX file after conversion
        fs.unlink(inputPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`Deleted: ${inputPath}`);
            }
        });

        res.download(outputPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
            } else {
                fs.unlink(outputPath, (err) => {
                    if (err) console.error("Error deleting converted PDF:", err);
                    else console.log(`Deleted: ${outputPath}`);
                });
            }
        });

    });
});

// Excel Index Html File
app.get("/excel-to-pdf", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/excel-to-pdf.html'));
});

// Excel Index Handle file upload and conversion

app.post("/excelConvert", upload.single("excel"), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const inputPath = path.join(__dirname, UPLOAD_FOLDER, req.file.filename);
    const outputFilename = req.file.filename.replace(/\.(xls|xlsx)$/, ".pdf");
    const outputPath = path.join(__dirname, CONVERTED_FOLDER, outputFilename);


    exec(`soffice --headless --convert-to pdf "${inputPath}" --outdir "${CONVERTED_FOLDER}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send("Error converting file.");
        }

        // Delete the DOCX file after conversion
        fs.unlink(inputPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`Deleted: ${inputPath}`);
            }
        });

        res.download(outputPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
            } else {
                fs.unlink(outputPath, (err) => {
                    if (err) console.error("Error deleting converted PDF:", err);
                    else console.log(`Deleted: ${outputPath}`);
                });
            }
        });
    });
});



// PPT Index Html File
app.get("/ppt-to-pdf", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/ppt-to-pdf.html'));
});

// Ppt Index Handle file upload and conversion
app.post("/pptConvert", upload.single("ppt"), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const inputPath = path.join(__dirname, UPLOAD_FOLDER, req.file.filename);
    const outputFilename = req.file.filename.replace(/\.(pptx|ppt)$/i, ".pdf");
    const outputPath = path.join(__dirname, CONVERTED_FOLDER, outputFilename);


    exec(`soffice --headless --convert-to pdf "${inputPath}" --outdir "${CONVERTED_FOLDER}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send("Error converting file.");
        }

        // Delete the DOCX file after conversion
        fs.unlink(inputPath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`Deleted: ${inputPath}`);
            }
        });

        res.download(outputPath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
            } else {
                fs.unlink(outputPath, (err) => {
                    if (err) console.error("Error deleting converted PDF:", err);
                    else console.log(`Deleted: ${outputPath}`);
                });
            }
        });
    });
});



app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
