import Link from 'next/link'
import Logo from 'public/T.Crypto.png'
import Spinner from './icons/Spinner'
import { useContext } from 'react'
import { EthersContext } from 'contexts/EthersContext'

const Header = () => {
  const { connect, balance, address } = useContext(EthersContext)
  
  return (
    <>
      <header 
        style={{
          background: 'white',
          zIndex: 5
        }}
      className='fixed w-full top-0 text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link href='/'>
            <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
              <img src={Logo.src} style={{ width: '5vw' }}/>
            </a>
          </Link>
          <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
            <Link href='/t-token'>
              <a className='mr-5 hover:text-gray-900'>T-Token</a>
            </Link>
            <Link href='/t-collectables'>
              <a className='mr-5 hover:text-gray-900'>T-Collectables</a>
            </Link>
            <Link href='/t-vote'>
              <a className='mr-5 hover:text-gray-900'>T-Vote</a>
            </Link>
          </nav>

          {address ? (
            <>
              <button
                className='mr-2 inline-flex items-center bg-neutral-300 border-0 py-1 px-5 focus:outline-none rounded-lg text-base text-black mt-4 md:mt-0'
              >
                Connected
              </button>
              <div className='inline-flex items-center bg-neutral-100 border border-neutral-300 focus:outline-none rounded-lg text-base text-black mt-4 md:mt-0'>
                <h3 className='py-1 px-4 font-mono'>{balance} UT</h3>
                <div className='inline-flex font-mono items-center bg-white border-0 py-1 px-4 focus:outline-none rounded-lg text-base text-black mt-4 mt-0'>
                  {address.substring(0, 6)}...
                  {address.substring(address.length - 4)}
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={connect}
              className='inline-flex items-center bg-neutral-300 border-0 py-1 px-5 focus:outline-none rounded-lg text-base text-black mt-4 md:mt-0'
            >
              Connect your wallet
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='w-4 h-4 ml-1'
                viewBox='0 0 24 24'
              >
                <path d='M5 12h14M12 5l7 7-7 7'></path>
              </svg>
            </button>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
