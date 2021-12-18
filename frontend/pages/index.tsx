import { useEffect, useState } from 'react'
import BuyModal from 'components/BuyModal'
import TTokenSale from '../contracts/TTokenSale.json'
import Arrow from 'components/icons/Arrow'
import { useEthersContext } from 'contexts'
import Head from 'next/head'

const Index = () => {
  const [open, setOpen] = useState(false)
  const contractAddress = TTokenSale.address
  const { loading } = useEthersContext()

  useEffect(() => {
    if (!loading) {
      setOpen(false)
    }
  }, [loading])
  
  return (
    <>
      <Head>
        <title>T.Crypto</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className='text-gray-600 body-font'>
        <div className='container mx-auto flex px-5 py-12 items-center justify-center flex-col'>
          <img
            className='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
            alt='T.Crypto'
            src='/home.svg'
          />
          <div className='text-center mb-8 lg:w-2/3 w-full'>
            <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
              T.Crypto
            </h1>
            <p className='mb-2 leading-relaxed'>
              Support the cause, donate, engage and vote!
            </p>
            <div className="flex justify-center">
              <button onClick={() => setOpen(true)} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Buy TTokens</button>
            </div>
          </div>
          <div className='mb-6 mt-8 inline-flex items-center bg-neutral-100 border border-neutral-300 focus:outline-none rounded-lg text-base text-black mt-4'>
            <h3 className='py-1 px-4 font-mono'>TTokenSale Contract:</h3>
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
      </section>
      {open && <BuyModal close={() => setOpen(false)} />}
    </>
  )
}
export default Index
