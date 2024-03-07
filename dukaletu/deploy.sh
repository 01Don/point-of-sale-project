#!/bin/sh

echo "Switching to branch master"
git branch -a


echo "Building app"
npm run build

echo "Deploying files to server"
scp -r build/ root@localhost

:/var/www/localhost

/
echo "Deployment complete"