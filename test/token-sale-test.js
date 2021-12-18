const { BigNumber } = require('@ethersproject/bignumber')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Sale', function () {
  it('create a TokenSale contract', async function () {
    const TToken = await ethers.getContractFactory('TToken')
    const token = await TToken.deploy()
    await token.deployed()

    const Contract = await ethers.getContractFactory('TTokenSale')
    const contract = await Contract.deploy(token.address)
    await token.deployed()
  })

  it('Buy stuff', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TToken = await ethers.getContractFactory('TToken')
    const token = await TToken.deploy()
    await token.deployed()

    const Contract = await ethers.getContractFactory('TTokenSale')
    const contract = await Contract.deploy(token.address)
    await contract.deployed()

    await token.transfer(contract.address, await token.balanceOf(owner.address), {
      from: owner.address
    })

    const sendAmount = 2;
    const multiplier = ethers.BigNumber.from(BigInt(10 ** 16))
    await contract.connect(addr1).buyTokens({
      from: addr1.address,
      value: multiplier.mul(sendAmount)
    })
    
    const bal = await token.balanceOf(addr1.address)
    expect(ethers.utils.formatUnits(bal, 16)).to.equal('200.0')
  })
})
