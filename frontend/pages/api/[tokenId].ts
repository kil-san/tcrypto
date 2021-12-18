import type { NextApiRequest, NextApiResponse } from 'next'

const nfts = {
    '1':{
        'name':'NFT1',
        'symbol':'NFT1',
        'image':'https://cdn.worldvectorlogo.com/logos/nft.svg',
        'description':'NFT1 is a token that represents a NFT',
    },
    '2':{
        'name':'NFT2',
        'symbol':'NFT2',
        'image':'https://cdn.worldvectorlogo.com/logos/nft.svg',
        'description':'NFT2 is a token that represents a NFT',
    },
    '3':{
        'name':'NFT3',
        'symbol':'NFT3',
        'image':'https://cdn.worldvectorlogo.com/logos/nft.svg',
        'description':'NFT3 is a token that represents a NFT',
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
 const tokenId = String(req.query.tokenId || '').split('.')[0]
 console.log(tokenId)
 if(nfts[tokenId]){
    return res.status(200).json(nfts[tokenId])
 }
  return res.status(200).json({ error: 'invalid NFT' })
}