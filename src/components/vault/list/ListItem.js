import React from 'react'
import getVaultData from '../../../hooks/getVaultData'
import getTokenName from '../../../hooks/getTokenName'

import Link from "next/link";
import { formatEther } from 'viem';
const ListItem = ({address,id}) => {
let data=[]
data  = getVaultData(address,id)||[]
let tokenName ;

   tokenName = getTokenName(data[2]||0)

  console.log(data,tokenName)
  if(data?.length <1)return<></>
  return (
    <tr className="odd:bg-[#F9F9F9] even:bg-white ">
    <td className="px-6 py-4">
      
      <Link href={"/vault/"+Number(id)}>
        <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
          <p className="mx-auto text-center text-black">#{Number(id)}</p>
        </div>
      </Link>
    </td>
    <td className="px-6 py-4">Sounds United States Dollar</td>
    <td className="px-6 py-4"> </td>
    <td className="px-6 py-4">50,000.00 {tokenName}</td>
    <td className="px-6 py-4">{formatEther(data[4])} {tokenName}</td>
    <td className="px-6 py-4">{formatEther(data[1])} wBTC</td>
  </tr>
  )
}

export default ListItem