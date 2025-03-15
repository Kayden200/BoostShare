const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));  // Serve static files

app.post("/api/submit", (req, res) => {
    const { cookie, url, amount, interval } = req.body;
    
    if (!cookie || !url || !amount || !interval) {
        return res.status(400).json({ error: "Missing fields!" });
    }

    console.log("Processing:", { cookie, url, amount, interval });
    res.status(200).json({ status: 200, message: "Submitted successfully!" });
});

// Get total progress
app.get("/api/total", (req, res) => {
    res.json([{ id: "1026976782688324", count: 91, target: 500 }]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
