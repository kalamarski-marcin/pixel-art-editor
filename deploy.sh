#!/bin/bash

rm -fr dist

mkdir dist

NODE_ENV=production parcel build index.js --public-url ./ --no-cache index.html

cd dist/

rsync -r -a -z -v -d --exclude=.DS_Store -e "ssh -i ~/.ssh/domowenauczanie" * mamalili@dm:/home/mamalili/domains/domowenauczanie.pl/public_html/generator
