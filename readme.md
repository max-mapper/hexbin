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
  "name": "dat-logo",
  "author": "max ogden",
  "license": "CC0",
  "vector": "http://hexb.in/vector/dat.svg",
  "description": "this is optional!"
}
```

make sure `name` only has lowercase letters, numbers and hyphens

- add your hexagon to the bottom of the hexagon list in the markup. make sure the link points at your meta file.
- make a pull request to this repo. bonus points if you embed your hexagon image in your pull request description!
