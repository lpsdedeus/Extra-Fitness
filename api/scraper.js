import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://www.extrafitness.com.br/produtos"; // ajuste para a página de produtos
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Exemplo: pegando todas as imagens dos produtos
    const produtos = [];
    $("img[data-produto-id]").each((_, el) => {
      const imagem = $(el).attr("src");
      const id = $(el).attr("data-produto-id");

      produtos.push({
        id,
        imagem,
      });
    });

    res.status(200).json({ produtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
}
