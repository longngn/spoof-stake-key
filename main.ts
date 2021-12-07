import * as CSL from "@emurgo/cardano-serialization-lib-nodejs";
import * as cbor from "cbor";

const PAYMENT_CLI_VKEY = "58204022747367deee69f601900e15ddc04fc8024753b6a1539ee2a8bed29832f420";
const STAKE_KEY = "stake1u96etyxgjx8lxmp8m8rj6g2plefwx6kf7npy9pe6y80zlqclt02c7";

const decodedVkey = cbor.decodeAllSync(PAYMENT_CLI_VKEY);
const publicKey = CSL.PublicKey.from_bytes(decodedVkey[0]);
const paymentCred = CSL.StakeCredential.from_keyhash(publicKey.hash());

const stakeAddress = CSL.RewardAddress.from_address(CSL.Address.from_bech32(STAKE_KEY));
if (stakeAddress === undefined) {
  throw new Error("Fail to decode stake key");
}
const stakeCred = stakeAddress.payment_cred();

const baseAddress = CSL.BaseAddress.new(
  CSL.NetworkInfo.testnet().network_id(),
  paymentCred,
  stakeCred
);

console.log(baseAddress.to_address().to_bech32());
