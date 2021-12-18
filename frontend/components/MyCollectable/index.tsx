import { useEthersContext } from 'contexts/EthersContext'
import { useEffect, useState } from 'react'
import { nfts } from '../../data/collectables.json'

const MyCollectable = ({ tokenId }) => {
  const { address, connect, collectableContract } = useEthersContext()
  const [itemLevel, setItemLevel] = useState(0)

  const fetchItemLevel = async () => {
    try {
      const itemLevel = await collectableContract.getItemLevel(tokenId)
      setItemLevel(itemLevel.toNumber())
    } catch (err) {}
  }

  useEffect(() => {
    const init = async () => {
      try {
        await connect()
      } catch (err) {}
    }
    init()
  }, [])

  useEffect(() => {
    fetchItemLevel()
    let timer = setInterval(fetchItemLevel, 5000)
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [address])

  const item = nfts.find(item => item.level === itemLevel)

  return (
    <>
      <section className='text-gray-600 body-font'>
        <div className='pb-4'>
          <div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col'>
            <div className='flex-grow relative'>
              <h3 className='text-3xl text-gray-900 font-medium pb-6'>
                {item?.name} - {item?.symbol} - Unique ID:{tokenId}
              </h3>
              <img src={item?.image} alt={item?.symbol} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default MyCollectable
