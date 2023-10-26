#!/bin/bash
cd services/api
mkdir -p static
cd ../ui
npm run build
cp -r build ../api/static
cd ../api
uvicorn main:app 
