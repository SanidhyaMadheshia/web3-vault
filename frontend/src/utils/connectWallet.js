import {ethers} from "ethers"
import contractAbi from "../constants/contractAbi.json"
import toast from "react-hot-toast"
import axios from "axios"
// import { cors} from "cors"
export const connectWallet = async()=>{
 try {
    
     if(!window.ethereum){
        throw new Error("Metamask is not installed")
     }
     const accounts =await window.ethereum.request({
        method:"eth_requestAccounts"
     })
     const selectedAccount = accounts[0];
    
     const provider = new ethers.BrowserProvider(window.ethereum);
     const signer = await provider.getSigner();
     
     const message = "Welcome to Crypto Vault Website";
     const signature = await signer.signMessage(message)
     
     const dataSignature = {
      signature
     }
     const url=`https://web3-vault-back.vercel.app/api/authentication?address=${selectedAccount}`
     const res = await axios.post(url,dataSignature)
     const token = res.data.token
     
     localStorage.setItem("token",token)

     const contractAddress = "0x437116617dC2d6E371232d781B6D2883606FE5fb"
     const contractInstance = new ethers.Contract(contractAddress,contractAbi,signer);
     return {contractInstance,selectedAccount}
 } catch (error) {
    toast.error("Wallet connection failed")
    console.error(error)
 }
}