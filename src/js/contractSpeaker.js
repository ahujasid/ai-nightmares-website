/*
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   
*/

const Web3 = require('web3');
var account;
var contract;

window.onload = function(){
    document.getElementById('wallet').textContent = "Connect Wallet";

    if(account){
        document.getElementById('wallet').textContent = account;
    }
}

const connectWallet = async () => {
    if(window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0]
        document.getElementById('wallet').textContent = account;

        // contract = new web3.eth.Contract(ABI,ADDRESS);
        // console.log(contract);
        // getCount();
        // getCount();
    }
};




const getCount = async () => {
    if(contract){
        tokenCount = await contract.methods.totalSupply().call();
        return tokenCount;
    }
}

            
document.getElementById("wallet").addEventListener("click", connectWallet, false);

// document.getElementById("mint").onclick = () => {
//     try{
//     contract.methods.safeMint(account).send({from: account, value: "60000000000000000"});
//     }
//     catch(err){
//         console.log(err);
//     }
// };


function sendDataToSolidity(tokenURI){



  // console.log(contract.methods);
	
  if(contract){

	 
		try{
      console.log("Minting NFT");
      // console.log(jsonString);
			contract.methods.mintForSelf(tokenURI).send({from: account, value: "60000000000000000"});
      showStatus("NFT minted!", 0);
			}
			catch(err){
				showStatus(err, 1);
			}
	
		
    }
	else showStatus("Could not connect to Solidity contract.", 1);
}




