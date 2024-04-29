
import { useReadContract } from 'wagmi'

import { erc20Abi, formatUnits, parseUnits } from 'viem'


import React from 'react'

const getAmountOut = (address, amount) => {
    console.log(amount)
    const { data,error} = useReadContract({
        abi:erc20Abi,
        functionName: 'decimals',
        address:address,
      })
  return (
parseUnits(amount,data)
  )
}

export default getAmountOut