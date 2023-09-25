#!/bin/sh

npm install --global serve
npm run build
serve -s build -l 3000
