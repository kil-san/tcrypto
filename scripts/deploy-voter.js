const fs = require('fs')

const main = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const balance = await owner.getBalance()
  console.log(`Deploying contracts with the account: ${balance.toString()}`)

  const Voter = await ethers.getContractFactory('TVoter')
  const voter = await Voter.deploy()
  console.log(`TVote contract address: ${voter.address}`)

  const data = {
    address: voter.address,
    abi: JSON.parse(voter.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/TVoter.json',
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
