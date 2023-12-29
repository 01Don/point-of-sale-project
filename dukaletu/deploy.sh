#!/bin/sh

echo "Switching to branch master"
git branch -a


echo "Building app"
npm run build

echo "Deploying files to server"
scp -r build/ root@172.233.153.32:/var/www/172.233.153.32/
echo "Deployment complete"