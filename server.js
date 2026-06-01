const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'system.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(DATA_FILE)) {
    // Upgraded system schema template with pricing and descriptors
    const seedData = {
        templates: [
            { id: 1, name: "Nexus Premium", strategy: "Zero-Hydration Static", security: "✔ Immutable Core Secured", price: "49.00", description: "Ultra-sleek high-conversion corporate landing hub optimized for speed.", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" },
            { id: 2, name: "Aura Architecture", strategy: "Zero-Hydration Static", security: "✔ Immutable Core Secured", price: "79.00", description: "Minimalist portfolio template tailored for agency showcases and creators.", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60" }
        ],
        domain_url: "platform.onepoint.premium",
        domain_gateway: "edge-routing.onepoint-infrastructure.net",
        seo_schema: "{}"
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2));
}

app.get('/api/system', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Storage error." });
        res.json(JSON.parse(data));
    });
});

app.post('/api/system', (req, res) => {
    fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Write failed." });
        res.json({ message: "Catalog updated successfully." });
    });
});

app.post('/api/upload', (req, res) => {
    const { name, base64Data } = req.body;
    if (!name || !base64Data) return res.status(400).json({ error: "Missing assets." });

    const rawBuffer = Buffer.from(base64Data.split(",")[1], 'base64');
    const safeName = Date.now() + "_" + name.replace(/[^a-z0-9.]/gi, '_');
    const targetPath = path.join(UPLOAD_DIR, safeName);

    fs.writeFile(targetPath, rawBuffer, (err) => {
        if (err) return res.status(500).json({ error: "Write failed." });
        res.json({ url: `http://localhost:${PORT}/uploads/${safeName}` });
    });
});

app.listen(PORT, () => console.log(`🚀 Upgraded OnePoint Engine at http://localhost:${PORT}`));