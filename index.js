const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = process.env.PORT || 8000;

const base = "https://www.anime-planet.com";

app.listen(PORT, () => {
  console.log("server listening on port:", PORT);
});
app.get("/", (req, res) => {
  res.json("Welcome to Anime API");
});
app.get("/all", (req, res) => {
  axios.get("https://www.anime-planet.com/anime/all").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const Animes = [];

    $(".card", html).each(function () {
      const title = $(this).find("h3").text();
      const address = $(this).find("a").attr("href");
      const image = $(this).find("img").attr("src");
      Animes.push({
        title: title,
        address: base + address,
        image: base + image,
      });
    });
    res.json(Animes);
  });
});
app.get("/anime/:animeName", (req, res) => {
  const animeName = req.params.animeName;
  axios
    .get(`https://www.anime-planet.com/anime/all?name=${animeName}`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const SpecificAnimes = [];

      $(".card", html).each(function () {
        const title = $(this).find("h3").text();
        const address = $(this).find("a").attr("href");
        const image = $(this).find("img").attr("src");
        SpecificAnimes.push({
          title: title,
          address: base + address,
          image: base + image,
        });
      });
      res.json(SpecificAnimes);
    });
});
app.get("/anime/:rating_greater/:rating_less", (req, res) => {
  const greater = req.params.rating_greater;
  const less = req.params.rating_less;
  axios
    .get(
      `https://www.anime-planet.com/anime/all?rating_greater=${greater}&rating_less=${less}`
    )
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const ratingAnimes = [];

      $(".card", html).each(function () {
        const title = $(this).find("h3").text();
        const address = $(this).find("a").attr("href");
        const image = $(this).find("img").attr("src");
        ratingAnimes.push({
          title: title,
          address: base + address,
          image: base + image,
        });
      });
      res.json(ratingAnimes);
    });
});
