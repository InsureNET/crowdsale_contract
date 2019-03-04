export default function ether_to_wei(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}
