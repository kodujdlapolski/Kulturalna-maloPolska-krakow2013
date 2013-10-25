## Front-end stack

### Catalog structure

Frontend is placed in frontend/ katalog. It contains:
* app
  * assets
    * images/
    * index.html
  * stylesheets
  * all js files (like initialize, views etc.)
* test/ - hopefully not empty
* public/ - it will contain compiled files, based on app catalog (should be in gitignore)
* node_modules - all node modules required in package.json (should be in gitignore)
* config.coffee - brunch's configuration
* package.json - npm package details

### How to serve brunch.io

$ brunch watch --serve
