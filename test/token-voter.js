const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Voter', function () {
  it('create a Voter contract', async function () {
    const TToken = await ethers.getContractFactory('TVoter')
    const token = await TToken.deploy()
    await token.deployed()
  })

  it('checks if the user is the owner of the contract', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TVoter = await ethers.getContractFactory('TVoter', owner)
    const tVoter = await TVoter.deploy()
    await tVoter.deployed()

    const isNotOwner = await tVoter.connect(addr1).isOwner()
    expect(isNotOwner).to.be.false

    const isOwner = await tVoter.connect(owner).isOwner()
    expect(isOwner).to.be.true
  })

  it('allows only Admin to open new proposals', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TVoter = await ethers.getContractFactory('TVoter', owner)
    const tVoter = await TVoter.deploy()
    await tVoter.deployed()

    await expect(
      tVoter.connect(addr1).openProposalForVotes('test')
    ).to.be.revertedWith('You need to be the Owner.')

    const proposal = await tVoter.connect(owner).openProposalForVotes('test')
    expect(proposal.hash).to.be.a('string')
  })

  it('allows only voting in opened proposals', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TVoter = await ethers.getContractFactory('TVoter', owner)
    const tVoter = await TVoter.deploy()
    await tVoter.deployed()

    await expect(tVoter.connect(addr1).voteOption1('test')).to.be.revertedWith(
      'Proposal not accepting votes.'
    )

    const proposal = await tVoter.connect(owner).openProposalForVotes('test')
    expect(proposal.hash).to.be.a('string')

    await tVoter.connect(addr1).voteOption1('test')
  })

  it('allows only voting in opened proposals (exploring toggling open flag)', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    const TVoter = await ethers.getContractFactory('TVoter', owner)
    const tVoter = await TVoter.deploy()
    await tVoter.deployed()

    await expect(tVoter.connect(addr1).voteOption1('test')).to.be.revertedWith(
      'Proposal not accepting votes.'
    )

    const proposal = await tVoter.connect(owner).openProposalForVotes('test')
    expect(proposal.hash).to.be.a('string')

    await tVoter.connect(addr1).voteOption1('test')

    const proposalClosed = await tVoter
      .connect(owner)
      .closeProposalForVotes('test')
    expect(proposalClosed.hash).to.be.a('string')

    await expect(tVoter.connect(addr2).voteOption1('test')).to.be.revertedWith(
      'Proposal not accepting votes.'
    )
  })

  it('allows only voting once in each proposal', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    const TVoter = await ethers.getContractFactory('TVoter', owner)
    const tVoter = await TVoter.deploy()
    await tVoter.deployed()

    await tVoter.connect(owner).openProposalForVotes('test')

    await tVoter.connect(addr1).voteOption1('test')
    await tVoter.connect(addr2).voteOption1('test')

    await expect(tVoter.connect(addr1).voteOption1('test')).to.be.revertedWith(
      'You already voted'
    )
    const addr1Voted = await tVoter
      .connect(addr1)
      .checkIfAddressAlreadyVoted('test')
    expect(addr1Voted).to.be.true

    await expect(tVoter.connect(addr2).voteOption1('test')).to.be.revertedWith(
      'You already voted'
    )
  })
})
