const shell = require('shelljs')
const {TEST_CHAINS, CHAINS} = require('../constants/networks');

module.exports = async function (taskArgs, hre) {
    let localContract, remoteContract;
    let networks;
    if (taskArgs.task == "test") {
        networks = TEST_CHAINS;
    } else {
        networks = CHAINS;
    }

    let nft_num = parseInt(taskArgs.nfts);
    let nft_startid = 1;
    let nft_endid = 0;
    shell.exec("echo '{' > ./constants/onftArgs.json");
    networks.map((network) => {
        nft_startid = nft_endid + 1;
        nft_endid = nft_startid + nft_num - 1;
        let onftArg = `"${network}": {"startMintId": ${nft_startid},"endMintId": ${nft_endid}},`;
        shell.exec(`echo '${onftArg}' >> ./constants/onftArgs.json`);
    });
    shell.exec("echo '\"\":{}\n}' >> ./constants/onftArgs.json");

    // deploy onft's
    for (let i = 0; i< networks.length; i++) {
        let network = networks[i];
        console.log(`deploying ${taskArgs.contract} to chain ${network}`)
        const deployCommand = `hardhat --network ${network} deploy --tags ${taskArgs.contract}`;
        console.log("   Command: " + deployCommand)
        // try {
        //     const result = await shell.exec(deployCommand)
        //     if (result.code != 0) {
        //         return;
        //     }
        // } catch (e) {
        //     return;
        // }
    }
}
