import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para puxar imagens dos produtos
app.get("/produtos", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.extrafitness.com.br/"); // URL da loja
    const $ = cheerio.load(data);

    let produtos = [];

    $("img").each((i, el) => {
      const imgUrl = $(el).attr("src");
      const produtoId = $(el).attr("data-produto-id");
      if (imgUrl && produtoId) {
        produtos.push({
          id: produtoId,
          imagem: imgUrl
        });
      }
    });

    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
