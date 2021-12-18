import { useState } from 'react'
import Moralis from 'moralis'
import TToken from '../contracts/TToken.json'
import Arrow from 'components/icons/Arrow'
import { ethers } from 'ethers'
import { useEthersContext } from 'contexts'
import Spinner from 'components/icons/Spinner'
import Head from 'next/head'

const Index = () => {
  const { contract, loading, setLoading } = useEthersContext()

  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')

  const transfer = async () => {
    if (!amount || !recipient) {
      return
    }

    setLoading(true)
    try {
      const transaction = await contract.transfer(
        recipient,
        ethers.utils.parseUnits(amount, 16)
      )
      console.log({ transaction })
    } catch (e) {
      console.log('error', e)
      setLoading(false)
    }
  }

  const contractAddress = TToken.address

  return (
    <>
      <Head>
        <title>T.Token</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
          <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
            <h1 className='title-font font-medium text-3xl text-gray-900'>
              Transfer TTokens to anyone within seconds
            </h1>
            <div className='h-1 w-20 bg-indigo-500 rounded'></div>
            <p className='leading-relaxed mt-4'>
              This Smart Contract was create in order to allow users to buy
              TTokens.
            </p>
            <div className='mb-6 mt-3 inline-flex items-center bg-neutral-100 border border-neutral-300 focus:outline-none rounded-lg text-base text-black mt-4'>
              <h3 className='py-1 px-4 font-mono'>TToken Contract:</h3>
              <div className='inline-flex font-mono items-center bg-white border-0 py-1 px-4 focus:outline-none rounded-lg text-base text-black'>
                <a
                  href={`https://goerli.etherscan.io/address/${contractAddress}`}
                  title='Scan contract'
                  target='_blank'
                >
                  {contractAddress}
                </a>
              </div>
              <div>
                <a
                  href={`https://goerli.etherscan.io/address/${contractAddress}`}
                  className='inline-block p-2'
                  title='Scan contract'
                  target='_blank'
                >
                  <Arrow className='w-4' />
                </a>
              </div>
            </div>
          </div>
          <div className='lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
            <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
              Transfer TToken
            </h2>
            <div className='relative mb-4'>
              <label htmlFor='amount' className='leading-7 text-sm text-gray-600'>
                Transfer Amount
                <div className='pointer-events-none absolute flex items-center p-2 text-slate-200'>
                  UT
                </div>
                <input
                  type='number'
                  id='amount'
                  name='amount'
                  placeholder='0.00'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className='border-black border-l-9 border-solid font-mono w-full bg-white rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </label>
            </div>
            <div className='relative mb-4'>
              <label
                htmlFor='address'
                className='leading-7 text-sm text-gray-600'
              >
                Recipient Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='0x...'
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className='font-mono w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <button
              onClick={transfer}
              className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              {loading && <Spinner />}
              {!loading && 'Transfer'}
            </button>
            <p className='text-xs text-gray-500 mt-3'>
              Literally you probably haven't heard of them jean shorts.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
