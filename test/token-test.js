const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Token', function () {
  it('create a new token', async function () {
    const TToken = await ethers.getContractFactory('TToken')
    const token = await TToken.deploy()
    await token.deployed()

    expect(await token.totalSupply()).to.equal('1000000000000000000000000')
  })
})
