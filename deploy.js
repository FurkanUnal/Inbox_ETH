const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const {abi, evm} = require("./compile");

//Write your 12 word mnemonic and infura url here
const MNEMONIC = "";
const INFURA_URL = "";


const provider = new HDWalletProvider(
    MNEMONIC,
    INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy form account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: ["Hi There!"]})
    .send({from: accounts[0], gas: "1000000"});
    
    console.log("Conract deployed to", result.options.address);
    provider.engine.stop();

};
deploy();