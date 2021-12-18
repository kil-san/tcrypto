const fs = require('fs')

const deployCollectable = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const balance = await owner.getBalance()
  console.log(`Balance on the account: ${balance.toString()}`)

  const TCollectable = await ethers.getContractFactory('TCollectable')
  const tCollectable = await TCollectable.deploy()
  console.log(`Collectable contract address: ${tCollectable.address}`)

  const data = {
    address: tCollectable.address,
    abi: JSON.parse(tCollectable.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/TCollectable.json',
    JSON.stringify(data, null, 2)
  )
}

deployCollectable()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })