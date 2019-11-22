# 
# Global configs
#

APP_NAME="box-nextbss-app"
# Project zipped source
DIST=./dist.zip
# Custom project package.json
PACKAGE=./box.json

#
# Build the vuejs web app
#

# build the app
npm run build

# Copy the server file into the ./dist
cp ./server.js ./dist

# Create the package.json
cp $PACKAGE ./dist/package.json

#
# Zip the build
#
cd dist

#
# Deploy to Azure
# 
## az webapp deployment source config-zip --resource-group $RSG --name $APP_NAME --src dist.zip

#
# Deploy to VPS
#
sudo rm -R .git

git init

git remote add prod 

git add .

git commit -m "Staging"

git push prod master --force

#
# Install project dependencies
#

#
# Delete the build
#
rm -R dist
rm dist.zip