const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Collectable', function () {
  it('deploy Collectable', async function () {
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const collectable = await TCollectable.deploy()
    await collectable.deployed()
  })
  it('checking that collectable is minted', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const tCollectable = await TCollectable.deploy()
    const transaction = await tCollectable.buyItem(3)
    const tx = await transaction.wait()

    const event = tx.events[0]
    const value = event.args[2]
    const tokenId = value.toNumber()

    const ownerOf = await tCollectable.ownerOf(tokenId) // Using the tokenURI from ERC721 to retrieve de metadata

    expect(ownerOf).to.be.equal(owner.address) // Comparing and testing
  })
  it('checking that collectable is owned by a addr1 (not owner of contract)', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const tCollectable = await TCollectable.deploy()
    const transaction = await tCollectable.connect(addr1).buyItem(3)
    const tx = await transaction.wait()

    const event = tx.events[0]
    const value = event.args[2]
    const tokenId = value.toNumber()

    const ownerOf = await tCollectable.ownerOf(tokenId) // Using the tokenURI from ERC721 to retrieve de metadata
    expect(ownerOf).to.be.equal(addr1.address) // Comparing and testing
  })
  it('checking the itemSupply of an collectable', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const tCollectable = await TCollectable.deploy()
    await tCollectable.buyItem(1)
    const getItemSupply = await tCollectable.getItemSupply(1)
    expect(getItemSupply).to.be.equal(2) // Comparing and testing
  })
  it('checking the collections of a user', async function () {
    const [owner, addr1] = await ethers.getSigners()
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const tCollectable = await TCollectable.deploy()
    await tCollectable.buyItem(1)
    const getItemSupply = await tCollectable.getItemSupply(1)
    const myItems = await tCollectable.getMyItems()
    console.log(
      'myItems',
      myItems.map((item) => item.toNumber())
    )
    expect(getItemSupply).to.be.equal(2) // Comparing and testing
    expect(myItems.map((item) => item.toNumber())[0]).to.be.equal(1)
  })
  it('checking the level of an item by tokenId', async function () {
    const TCollectable = await ethers.getContractFactory('TCollectable')
    const tCollectable = await TCollectable.deploy()
    await tCollectable.buyItem(1)
    const getItemLevel = await tCollectable.getItemLevel(1)
    console.log('getItemLevel', getItemLevel.toNumber())
    expect(getItemLevel.toNumber()).to.be.equal(1)
  })
})
