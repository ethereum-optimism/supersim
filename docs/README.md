# Supersim docs developer guide

Deployed docs can be found at https://supersim.pages.dev


Supersim docs are built using [mdbook](https://rust-lang.github.io/mdBook/). `mdbook` uses the `SUMMARY.md` file for the high level hierarchy ([docs](https://rust-lang.github.io/mdBook/format/summary.html)). 

## Development

### 1. Install `mdbook` CLI tool
Installation options can be found [here](https://rust-lang.github.io/mdBook/guide/installation.html).
  
### 2. Go to the `docs` folder

```sh
cd docs
```

### 3. Run the `mdbook` CLI tool
By default the built book is available at http://localhost:3000

```sh
mdbook serve --open
```

## Deployment
1. On every merge to `main`, [`deploy-docs`](../.github/workflows/deploy-docs.yml) workflow creates a deployable branch for the docs called [`gh-pages`](https://github.com/ethereum-optimism/supersim/tree/gh-pages). 
2. Generated docs branch is then deployed using [Cloudflare Pages](https://pages.cloudflare.com/)