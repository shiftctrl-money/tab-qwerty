
import { useReadContract } from 'wagmi'

import { erc20Abi, formatUnits, parseUnits } from 'viem'


import React from 'react'

const getBalanceOfToken = (user_address, address) => {


    const { data,error} = useReadContract({
        abi:erc20Abi,
        functionName: 'decimals',
        address:address,
      })
      const { data:balance} = useReadContract({
        abi:erc20Abi,
        functionName: 'balanceOf',
        address:address,
        args:[user_address]
      })
      console.log(data,balance)
      if(!data || !balance ) return 0
  return (
formatUnits(balance,data)
  ) 
}

export default getBalanceOfToken