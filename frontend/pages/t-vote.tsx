import TVoter from '../contracts/TVoter.json'
import { useEffect, useState } from 'react'
import Arrow from 'components/icons/Arrow'
import { proposals } from '../data/proposals.json'
import Proposal from 'components/Proposal'
import { useEthersContext } from 'contexts/EthersContext'
import Head from 'next/head'

const contractAddress = TVoter.address

const Voter = () => {
  const { address, connect } = useEthersContext()

  useEffect(() => {
    connect()
  }, [])

  if (!address) {
    return <div>Please sign-in to vote.</div>
  }

  return (
    <>
      <Head>
        <title>T.Vote</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='w-full md:w-1/2 mx-auto' style={{marginTop: '10em'}}>
        <div className='flex flex-wrap w-full mb-20 mt-8'>
          <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900'>
              TVoter Contract
            </h1>
            <div className='h-1 w-20 bg-indigo-500 rounded'></div>
          </div>
          <p className='lg:w-1/2 w-full leading-relaxed text-gray-500 mb-6'>
            This Smart Contract was create in order to allow users to
            collaborate and help us decide about things about to happen in
            U.org.
          </p>
          <div className='mb-6 inline-flex items-center bg-neutral-100 border border-neutral-300 focus:outline-none rounded-lg text-base text-black mt-4 md:mt-0'>
            <h3 className='py-1 px-4 font-mono'>TVoter Contract:</h3>
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
      </div>
      <div className='max-w-3xl mx-auto'>
        <h2 className='mt-5 sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900'>
          Current proposals
        </h2>
        {proposals.map((proposal, index) => (
          <Proposal key={proposal.slug} proposal={proposal} />
        ))}
      </div>
    </>
  )
}
export default Voter
