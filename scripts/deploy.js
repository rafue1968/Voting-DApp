const hre = require("hardhat");

async function main(){
    const Voting = await hre.ethers.getContractFactory("Voting");

    const options = ["Blue", "Green", "Purple"];

    const contract = await Voting.deploy(options);

    // await contract.deployed();     //outdated Method
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();

    console.log("Voting contract deployed to:", contractAddress);
}


main()
    .then(()=> process.exit(0))
    .then((error)=> {
        console.error(error);
        process.exit(1);
    })