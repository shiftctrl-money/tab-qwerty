import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { TAB_REGISTRY_CONFIG } from '../app/helpers/index';
import { useEthersSigner } from '@/utils/useEthersSigner';
import { ethers } from 'ethers';

function TabCount() {
const [tabList,setTabList] = useState([])

  // Fetch the count of activated tabs
  const { data: activatedTabs,error } = useReadContract({
    ...TAB_REGISTRY_CONFIG,
    functionName: 'activatedTabCount',
  });
useEffect(()=>{
getTabs()
},[activatedTabs])
async function getTabs(){
    const provider = await new ethers.providers.JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
    const tabContract =await new ethers.Contract(TAB_REGISTRY_CONFIG.address, TAB_REGISTRY_CONFIG.abi, provider);
    let tabs = []
    console.log(provider,tabContract)
if(activatedTabs){
    for( let i =0; i < activatedTabs; i++){
     let tab=  await  tabContract.tabList(i);
tabs.push(tab)
console.log(tab)
    }
setTabList(tabs)
}
}
console.log(activatedTabs,error)

  return tabList;
}


export default TabCount;
