const { exec } = require('child_process');
const cron = require('node-cron');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

config.forEach(account => {
    cron.schedule('* * * * *', () => {
        exec(
            `GIT_AUTHOR_DATE="2024-01-31T18:00:00 +0200" GIT_COMMITTER_DATE=$GIT_AUTHOR_DATE git commit --allow-empty -m "Automated commit" && git push ${account.repositoryUrl} main`,
            {
                env: {
                    GIT_COMMITTER_NAME: 'hhermesa',
                    GIT_COMMITTER_EMAIL: `sasha.kovalenko0302@gmail.com`,
                    GIT_AUTHOR_NAME: 'hhermesa',
                    GIT_AUTHOR_EMAIL: `sasha.kovalenko0302@example.com`,
                    GH_TOKEN: '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',
                },
            },
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error for ${account.username}: ${error.message}`);
                    return;
                }
                console.log(`stdout for ${account.username}: ${stdout}`);
                console.error(`stderr for ${account.username}: ${stderr}`);
            }
        );
    });
});
