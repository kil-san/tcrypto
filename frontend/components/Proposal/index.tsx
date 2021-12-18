import { useEthersContext } from 'contexts/EthersContext'
import { useEffect, useState } from 'react'
import styles from './css.module.css'

const OwnerBadge = () => {
  return (
    <span className='bg-red-500 text-red-50 py-1 px-2 rounded text-xs font-bold ml-1'>
      You´re the owner
    </span>
  )
}

interface IRemoteProposal {
  slug?: string
  opt1?: number
  opt2?: number
  open?: boolean
}

const Proposal = ({ proposal }) => {
  const { address, connect, voterContract } = useEthersContext()
  const [isOwner, setIsOwner] = useState(false)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [remoteProposal, setRemoteProposal] = useState<IRemoteProposal>({})

  const fetchProposal = async () => {
    try {
      const isOwner = await voterContract.isOwner()
      setIsOwner(isOwner)

      const voted = await voterContract.checkIfAddressAlreadyVoted(
        proposal.slug
      )
      setAlreadyVoted(voted)

      const remoteProposal = await voterContract.getProposal(proposal.slug)
      const { slug, opt1, opt2, open } = remoteProposal
      setRemoteProposal({
        slug,
        opt1: remoteProposal?.[1]?.toNumber() || 0,
        opt2: remoteProposal?.[2]?.toNumber() || 0,
        open
      })
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
    fetchProposal()
    let timer = setInterval(fetchProposal, 5000)
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [address])
  const voteOption1 = async () => {
    try {
      await voterContract.voteOption1(proposal.slug)
    } catch (err) {}
  }
  const voteOption2 = async () => {
    try {
      await voterContract.voteOption2(proposal.slug)
    } catch (err) {}
  }

  const openProposal = async () => {
    try {
      await voterContract.openProposalForVotes(proposal.slug)
    } catch (err) {}
  }
  const closeProposal = async () => {
    try {
      await voterContract.closeProposalForVotes(proposal.slug)
    } catch (err) {}
  }

  return (
    <section className='text-gray-600 body-font'>
      <div className='p-4'>
        <div className='flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col'>
          <div className='flex-grow relative'>
            <h2 className='text-gray-900 text-lg title-font font-medium mb-3'>
              {proposal.title} {isOwner && <OwnerBadge />}
            </h2>
            {alreadyVoted && (
              <span
                className={`${styles.stamp} ${styles.isApproved} absolute top-0 right-0`}
              >
                Voted!
              </span>
            )}
            <p className='leading-relaxed text-base'>{proposal.description}</p>
            <div>
              {isOwner && !remoteProposal?.open && (
                <button
                  type='button'
                  onClick={openProposal}
                  className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                >
                  Open proposal
                </button>
              )}
              {isOwner && remoteProposal?.open && (
                <button
                  type='button'
                  onClick={closeProposal}
                  className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                >
                  Close proposal
                </button>
              )}
              {!alreadyVoted && remoteProposal?.open && (
                <>
                  <button
                    type='button'
                    onClick={voteOption1}
                    className='p-2 my-1 bg-slate-100 hover:bg-slate-300 hover:shadow rounded transition-all w-full text-left'
                  >
                    <b>Vote for:</b> {proposal.optionA}
                  </button>
                  <button
                    type='button'
                    onClick={voteOption2}
                    className='p-2 my-1 bg-slate-100 hover:bg-slate-300 hover:shadow rounded transition-all w-full text-left'
                  >
                    <b>Vote for:</b> {proposal.optionB}
                  </button>
                </>
              )}
              {(alreadyVoted || !remoteProposal?.open) && (
                <>
                  <p className='p-2 my-1 bg-slate-100 rounded w-full'>
                    {proposal.optionA} <b>Votes:</b> {remoteProposal.opt1}
                  </p>
                  <p className='p-2 my-1 bg-slate-100 rounded w-full'>
                    {proposal.optionB} <b>Votes:</b> {remoteProposal.opt2}
                  </p>
                </>
              )}
              {/*<pre>{JSON.stringify(remoteProposal, null, 2)}</pre>
              <pre>{JSON.stringify(proposal, null, 2)}</pre>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Proposal
