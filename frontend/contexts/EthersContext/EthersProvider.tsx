import React, { useCallback, useEffect, useState } from 'react'
import EthersContext from './EthersContext'
import {
  ethers,
  BigNumber,
  Contract,
  providers,
  ContractInterface
} from 'ethers'
import TToken from 'contracts/TToken.json'
import TVoter from 'contracts/TVoter.json'
import TCollectable from 'contracts/TCollectable.json'
import TTokenSale from 'contracts/TTokenSale.json'

interface IEthersProvider {}

const EthersProvider: React.FC<IEthersProvider> = ({ children }) => {
  const [signer, setSigner] = useState<providers.JsonRpcSigner>()
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()
  const [contract, setContract] = useState<Contract>()
  const [voterContract, setVoterContract] = useState<Contract>()
  const [saleContract, setSaleContract] = useState<Contract>()
  const [collectableContract, setCollectableContract] = useState<Contract>()
  const [provider, setProvider] = useState<providers.Web3Provider>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!saleContract || !contract) {
      return
    }

    saleContract.on('BuyTokens', () => {
      getBalance()
      setLoading(false)
    });
    contract.on('Transfer', () => {
      getBalance()
      setLoading(false)
    });
  }, [saleContract, contract])

  useEffect(() => {
    if (signer) {
      const tVoter = new Contract(
        TVoter.address,
        TVoter.abi as ContractInterface,
        signer
      )
      setVoterContract(tVoter)
      const tCollectable = new Contract(
        TCollectable.address,
        TCollectable.abi as ContractInterface,
        signer
      )
      setCollectableContract(tCollectable)
      const tTokenSale = new Contract(
        TTokenSale.address,
        TTokenSale.abi as ContractInterface,
        signer
      )
      setSaleContract(tTokenSale)
    }
  }, [signer])

  const init = useCallback(async (): Promise<any> => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
      } catch (err) {
        throw err
      }
    } else throw new Error('metamask not installed')
  }, [])

  useEffect(() => {
    init().catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (address) {
      getBalance()
    }
  }, [address])

  const getBalance = async () => {
    if (!provider || !address) {
      return
    }
    try {
      const tToken = new Contract(
        TToken.address,
        TToken.abi as ContractInterface,
        signer
      )
      setContract(tToken)
      const bal = await tToken.balanceOf(address)
      setBalance(ethers.utils.formatUnits(bal, 16))
    } catch (err) {
      console.log('got error', err)
    }
  }

  const connect = async () => {
    if (signer) {
      getBalance()
      return
    }

    try {
      if (!provider) {
        await init()
      }

      await provider.send('eth_requestAccounts', [])
      const currentAccount = provider.getSigner()
      const signerAddress = await currentAccount.getAddress()
      setSigner(currentAccount)
      setAddress(signerAddress)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <EthersContext.Provider
      value={{
        balance,
        signer,
        address,
        contract,
        voterContract,
        collectableContract,
        saleContract,
        provider,
        loading,
        setLoading,
        connect
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}

export default EthersProvider
