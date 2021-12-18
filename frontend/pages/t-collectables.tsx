import { useState, useEffect } from 'react'
import TCollectable from '../contracts/TCollectable.json'
import Arrow from 'components/icons/Arrow'
import { nfts } from '../data/collectables.json'
import Collectable from 'components/Collectable'
import { useEthersContext } from 'contexts/EthersContext'
import MyCollectable from 'components/MyCollectable'
import Head from 'next/head'

const Collectables = () => {
  const [myItems, setMyItems] = useState([])
  const {
    contract,
    signer,
    address,
    connect,
    collectableContract
  } = useEthersContext()
  const contractAddress = TCollectable.address

  const fetchMyItems = async () => {
    try {
      console.log(' fetchMyItems')
      let myItems = []
      myItems = await collectableContract.getMyItems()
      // const level = await collectableContract.getItemLevel()
      // console.log('level', level)
      console.log(myItems)
      setMyItems(myItems)
    } catch (err) { }
  }

  useEffect(() => {
    const init = async () => {
      try {
        await connect()
      } catch (err) { }
    }
    init()
  }, [])

  useEffect(() => {
    fetchMyItems()
    let timer = setInterval(fetchMyItems, 5000)
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [address])
  return (
    <>
      <Head>
        <title>T.Collectable</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 pt-8 mx-auto'>
          <h1 className='title-font font-medium text-4xl text-gray-900'>
            Buy TCollectables
          </h1>
          <div className='h-1 w-20 bg-indigo-500 rounded'></div>
        </div>
        <div className='container px-5 py-12 mx-auto flex flex-wrap'>
          <div className='md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
            <h2 className='text-3xl text-gray-900 font-medium title-font mb-3'>
              Store:
            </h2>
            <ul>
              {nfts.map((nft, index) => (
                <Collectable key={index} collectable={nft} />
              ))}
            </ul>
          </div>
          <div className='md:w-1/2 md:pl-5 sm:mt-8 md:mt-0'>
            <h2 className='text-3xl text-gray-900 font-medium title-font mb-7'>
              My Collection:
            </h2>
            <div className=''>
              {!myItems ||
                (myItems.length === 0 && (
                  <p>You dont have any items yet. Buy your first one now.</p>
                ))}
              <div>
                {myItems.map(item => (
                  <MyCollectable key={item} tokenId={item.toNumber()} />
                ))}
              </div>
            </div>
            <hr className='mt-4 border-gray-500' />
            <p className='leading-relaxed my-3'>
              This Smart Contract was created in order to buy TCollectables
            </p>
            <div className='inline-flex items-center bg-neutral-100 border border-neutral-300 focus:outline-none rounded-lg text-base text-black '>
              <h3 className='py-1 px-4 font-mono'>TCollectable Contract:</h3>
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
      </section>
    </>
  )
}
export default Collectables
