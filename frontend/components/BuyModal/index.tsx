import { useEffect, useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { useEthersContext } from 'contexts'
import Spinner from 'components/icons/Spinner'

const Index = ({ close }) => {
  const { saleContract, loading, setLoading } = useEthersContext()

  const [amount, setAmount] = useState('')
  const [ethVal, setEthVal] = useState('')

  const buyToken = async () => {
    if (!amount) {
      return
    }

    setLoading(true)
    const multiplier = BigNumber.from(BigInt(10 ** 16))
    try {
      const transaction = await saleContract.buyTokens({
        value: multiplier.mul(parseInt(amount)).div(100)
      })
      console.log({ transaction })
    } catch (e) {
      console.log('error', e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!amount) {
      return
    }
    
    setEthVal((0.0001 * parseInt(amount)).toString())
  }, [amount])

  return (
    <div 
      style={{
        backgroundColor: 'rgb(0, 0, 0, 0.5)'
      }}
      className="fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="popup-modal">
      <div className="flex justify-center items-center relative w-full h-full px-4">
        <div className="px-8 pb-8 relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
            Buy TToken
          </h2>
          <div className='relative mb-4'>
            <label htmlFor='amount' className='leading-7 text-sm text-gray-600'>
              Buy Amount
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
              htmlFor='eth_val'
              className='leading-7 text-sm text-gray-600'
            >
              Eth Val
            </label>
            <input
              type='text'
              id='eth_val'
              name='address'
              placeholder='0.00'
              disabled
              value={ethVal}
              className='font-mono w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
          </div>
          <button
            onClick={buyToken}
            className='flex items-center text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
          > 
            {loading && <Spinner/>}
            {!loading && 'Buy'}
          </button>
          <p className='text-xs text-gray-500 mt-3'>
            Literally you probably haven't heard of them jean shorts.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
