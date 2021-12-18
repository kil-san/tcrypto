const fs = require('fs')
const TToken = require('../frontend/contracts/TToken.json')

const main = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const Contract = await ethers.getContractFactory('TTokenSale')
  const contract = await Contract.deploy(TToken.address)
  console.log(`Contract address: ${contract.address}`)

  const tokenContract = new ethers.Contract(TToken.address, TToken.abi, owner)
  await tokenContract.transfer(contract.address, await tokenContract.balanceOf(owner.address), {
    from: owner.address
  })

  const data = {
    address: contract.address,
    abi: JSON.parse(contract.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/TTokenSale.json',
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
