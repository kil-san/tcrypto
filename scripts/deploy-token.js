const fs = require('fs')

const main = async () => {
  const [owner] = await ethers.getSigners()
  console.log(`Deploying contracts with the account: ${owner.address}`)

  const balance = await owner.getBalance()
  console.log(`Deploying contracts with the account: ${balance.toString()}`)

  const Token = await ethers.getContractFactory('TToken')
  const token = await Token.deploy()
  console.log(`Token contract address: ${token.address}`)

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json'))
  }
  fs.writeFileSync(
    './frontend/contracts/TToken.json',
    JSON.stringify(data, null, 2)
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
