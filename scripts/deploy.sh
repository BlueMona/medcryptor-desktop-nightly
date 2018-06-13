#!/usr/bin/env bash

set -e

cd ..
cd peerio-desktop

npm install

export NODE_ENV=production
echo "Building and publishing Medcryptor Nightly"
./node_modules/.bin/peerio-desktop-release --repository PeerioTechnologies/peerio-desktop \
                       --overrides PeerioTechnologies/medcryptor-desktop,PeerioTechnologies/medcryptor-desktop-nightly \
                       --publish \
                       --tag dchest/ch9249/mc-desktop-upgrade-dialog-says-peerio \
                       --versioning medcryptornightly \
                       --nosign \
                       --key ../medcryptor-desktop-nightly/signing.key

cd ..
cd medcryptor-desktop-nightly
npm i @octokit/rest bluebird
node ./scripts/publish_release.js
