# hexbin

a community curated list of hexagon logos

## submit a hexagon

- First, make sure you're the owner of the hexagon you are submitting!
- Clone this repo
- Add your hexagon to the `hexagons/` folder in dimensions **181x209** as a **png**.
- Add the vector version `vector/` folder in either **svg** or **adobe illustrator** format with the same filename as the previous step. please make sure this is **500kb or less**.
- Add a new `.json` file in `meta/` with the metadata for your hexagon. Use this template:

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

Make sure `name` only has lowercase letters, numbers and hyphens. Remove any optional fields you aren't using, and make sure the last field doesn't have a trailing comma at the end of it.

Then make a pull request to this repo. Bonus points if you embed your hexagon image in your pull request description!

Here is an example of a great PR: https://github.com/maxogden/hexbin/pull/5

### note

You do not need to rebuild the site in your PR. In fact, this makes merges more complicated for maintainers. Please let the maintainers handle rebuilding after merges.

## resources

Tools are available in several programming languages to help automate sticker creation based on the sticker standard:

- [hexsticker](https://github.com/fridex/hexsticker) uses python
- [hexSticker](https://github.com/GuangchuangYu/hexSticker) uses R

# for maintainers

After merging PRs/adding new hexes you have to build the site:

- `npm run build`
- add + commit
- `git push origin gh-pages`

So the general workflow I'd suggest is to start with the oldest PRs first and work towards the newer ones.

Usually I click the 'Files changed' tab to look at what files they touched. If they followed the directions it should only touch files in `hexagons/`, `meta/`, and `vector/`.

If Github lets me I then hit the green 'Merge pull request' button and move to the next one.

I basically repeat this process for all the straightforward PRs. If you get one that changes other files beyond those 3 folders or otherwise looks weird, ignore it for now.

After merging them all you have to clone/pull the gh-pages branch (there is no master branch only gh-pages on this repo): `git pull origin gh-pages`. To push you do `git push origin gh-pages`.

After pulling, run `npm run build`. This should build a new `data.json` file. You can run `npm start` to start a local test server to visually inspect if the page looks ok. If it does, you can push.

OK for the weird ones, you can simply comment like how DanFinlay does and point out the weird stuff they did. If you're feeling generous you can just merge it anyway and then go in manually and fix their files after in a new commit, rebuild, and push a fixed version.
