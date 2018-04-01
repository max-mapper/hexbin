# hexbin

a community curated list of hexagon logos

## submit a hexagon

- first, make sure you're the owner of the hexagon you are submitting!
- clone this repo
- add your hexagon to the `hexagons/` folder in dimensions **181x209** as a **png**.
- add the vector version `vector/` folder in either **svg** or **adobe illustrator** format with the same filename as the previous step. please make sure this is **500kb or less**
- add a new `.json` file in `meta/` with the metadata for your hexagon. use this template:

```json
{
  "name": "dat",
  "author": "max ogden",
  "license": "CC0",
  "raster": "http://hexb.in/hexagons/dat.png",
  "vector": "http://hexb.in/vector/dat.svg",
  "description": "this is optional!",
  "order_online_url": "this is optional. should be a link to where people can buy the sticker online"
}
```

make sure `name` only has lowercase letters, numbers and hyphens

then make a pull request to this repo. bonus points if you embed your hexagon image in your pull request description!

here is an example of a great PR: https://github.com/maxogden/hexbin/pull/5

### Note

You do not need to rebuild the site in your PR, in fact this makes merges more complicated for maintainers. Please let the maintainers handle rebuilding after merges.

You can use [hexsticker]((https://github.com/fridex/hexsticker) to automate sticker creation based on the sticker standard.

# for maintainers

after merging PRs/adding new hexes you have to build the site:

- npm run build
- commit + add
- git push origin gh-pages

