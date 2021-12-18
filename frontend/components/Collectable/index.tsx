import { useEthersContext } from 'contexts/EthersContext'
import { useEffect, useState } from 'react'

const Collectable = ({ collectable }) => {
  const { address, connect, collectableContract } = useEthersContext()
  const [supply, setSupply] = useState(0)

  const fetchCollectable = async () => {
    try {
      const supply = await collectableContract.getItemSupply(collectable.level)
      setSupply(supply.toNumber())
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
    fetchCollectable()
    let timer = setInterval(fetchCollectable, 5000)
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [address])

  const buyItem = async () => {
    try {
      await collectableContract.buyItem(collectable.level)
    } catch (err) {}
  }

  return (
    <section className='text-gray-600 body-font'>
      <div className='py-4'>
        <div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col'>
          <div className='flex-grow relative'>
              <h3 className='text-3xl text-gray-900 font-medium pb-6'>{collectable.name} - {collectable.symbol}</h3>
              <img src={collectable.image} alt={collectable.symbol} />
              <p>{JSON.stringify(supply)} left</p>
            <p className='leading-relaxed text-base'>{collectable.description}</p>
            <button className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={buyItem}>BUY</button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Collectable
