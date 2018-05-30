const fs = require('fs');
var GitHubApi = require('@octokit/rest')

var github = new GitHubApi({
    // optional
    debug: true,
    Promise: require('bluebird')
})

github.authenticate({
    type: 'token',
    username: process.env.GH_USER,
    token: process.env.GH_TOKEN
});

//const version = JSON.parse(fs.readFileSync('../peerio-desktop/package.json', 'utf-8')).version;
//console.log('VERSION', version);

return github.repos.getReleases({ owner: 'PeerioTechnologies', repo: 'medcryptor-desktop-nightly' })
    .then(res => {
        const release = res.data[0];
        //if (!release) throw new Error('Release not found.');
        //if (release.tag_name !== `v${version}`) throw new Error(`Womp, tag name mismatch, release: ${release.tag_name}, our: v${version}`);
        return github.repos.editRelease({
            owner: 'PeerioTechnologies',
            repo: 'medcryptor-desktop-nightly',
            tag_name: release.tag_name,
            id: release.id,
            draft: false,
            prerelease: false
        });
    });
