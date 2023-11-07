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

    if(taskArgs.contract) {
        localContract = taskArgs.contract;
        remoteContract = taskArgs.contract;
    } else {
        localContract = taskArgs.localContract;
        remoteContract = taskArgs.remoteContract;
    }

    if(!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // deploy onft's
    // for (let i = 0; i< networks.length; i++) 
    let i = 3
    {
        // if (i == 4 /* zksync */ ) {
        //     continue;
        // }
        let srcchain = networks[i];
        for (let j = 0; j < networks.length; j++) {
            if (j == 4) continue;
            let dstchain = networks[j];
            if (srcchain !== dstchain) {
                console.log(`setMinDstGas between ${srcchain} to ${dstchain}`)
                const Command = `hardhat --network ${srcchain} setMinDstGas --target-network ${dstchain} --contract ${taskArgs.contract} --packet-type 1 --min-gas ${taskArgs.minGas}`;
                console.log("   Command: " + Command)
                try {
                    const result = await shell.exec(Command)
                    if (result.code != 0) {
                        return;
                    }
                } catch (e) {
                    return;
                }
            }
        }
    }
}
