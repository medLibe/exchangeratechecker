const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/list', async (req, res) => {
    try {
        const response = await axios.get('https://api.exchangerate.host/list', {
            params: {
                access_key: process.env.ACCESS_KEY,
            }
        });

        if (!response.data.success) {
            return res.status(500).json({
                error: 'Gagal mengambil daftar mata uang.'
            })
        }

        return res.json({
            currencies: response.data.currencies
        })
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({
            error: 'Terjadi kesalahan saat mengambil daftar mata uang.'
        })
    }
});

app.get('/api/rate', async (req, res) => {
    const { from, to, amount = 1 } = req.query;

    if (!from || !to) {
        return res.status(400).json({
            error: 'From atau To currency tidak sesuai.'
        })
    }

    try {
        // echangerate.host
        const response = await axios.get(`https://api.exchangerate.host/convert`, {
            params: {
                access_key: process.env.ACCESS_KEY,
                from,
                to,
                amount
            }
        });

        const result = response.data.result;

        if (!result) {
            return res.status(400).json({
                error: 'Nilai tukar tidak ditemukan.'
            })
        }

        res.json({ result });
    } catch (error) {
        res.status(500).json({ 
            error: 'Terjadi kesalahaan saat mengambil data.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
