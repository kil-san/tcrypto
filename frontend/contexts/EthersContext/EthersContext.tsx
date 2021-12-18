import React from 'react'
import { providers, Contract } from 'ethers'

interface IEthersContext {
  address?: string
  signer?: providers.JsonRpcSigner
  provider?: providers.Web3Provider
  contract?: Contract
  voterContract?: Contract
  collectableContract?: Contract
  saleContract?: Contract
  balance?: string
  loading?: boolean
  setLoading?: (state: boolean) => void
  connect?: () => Promise<any>
}

const DefaultEthersContext: IEthersContext = {}

const EthersContext = React.createContext(DefaultEthersContext)
export const useEthersContext = () => React.useContext(EthersContext)
export default EthersContext
