const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timestamp, data, priviousHash = ''){
		this.index= index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
	}

	hashingCalculation(){

		return SHA256(this.index + this.previousHash +this.timestamp + JSON.stringify(this.data)).toString();

	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createMyBlock()];
	}

createMyBlock(){
	return new Block(0, "01/01/2018", "My block", "0");
}


getLatestBlock(){
	return this.chain[this.chain.length - 1];

}

addBlock(newBlock){
newBlock.previousHash = this.getLatestBlock().hash;
newBlock.hash = newBlock.hashingCalculation();
this.chain.push(newBlock);
}

isChainValid(){
	for(let i=1; i<this.chain.length; i++){
		const currentBlock = this.chain[i];
		const previousBlock = this.chain[i-1];
          

          if(currentBlock.hash !== currentBlock.hashingCalculation()){
          	return false;
          }

          if(currentBlock.previousHash !== previousBlock.hash){
          	return false;
          }

	   }

			return true;
}



}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "01/07/2018", {amount: 2}));
myCoin.addBlock(new Block(1, "01/16/2018", {amount: 17}));

//checking if blockchain is valid 

//console.log('Blockchain is valid or no ' + myCoin.isChainValid());
// If the particular chain is tampered  for eg   myCoin.chain[1].data = {amount: 200};
// then if we check again 
//console.log('Blockchain is valid or no ' + myCoin.isChainValid());

console.log(JSON.stringify(myCoin, null, 2));

