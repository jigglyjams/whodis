import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.NODE_ENV);

export const config = {
  DISCORD_KEY: process.env.NODE_ENV === 'dev' ? process.env.DISCORD_KEY_DEV : process.env.DISCORD_KEY,
  ETHERSCAN_KEY: process.env.ETHERSCAN_KEY,
  RPC_SOCKET: `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
  RPC_HTTP: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  IPFS: 'https://ipfs.io/ipfs'
};

export const sounds = [
  {
    NAME: "JB",
    CONTRACT: "0x9b5a4053FfBB11cA9cd858AAEE43cc95ab435418",
    TOPICS: [
      "0x06e07e862bc5e6be67193c75556d1659653327c7846a45ee9921c917717395d8", // Create
    ],
    ID: "projectId",
    URI: "uri",
    HANDLE: "handle",
    URI_SRC: "https://jbx.mypinata.cloud/ipfs",
    //DISCORD_CHANNEL: "875535133258690611", // Canu
    DISCORD_CHANNEL: "905859896019419157", // jigglys bots
    MESSAGE: {
      DESCRIPTION: "New juice who dis?"
    },
    GET_VALUE: 0,
    DECIMAL: 18,
    MARKET: "https://juicebox.money/#/p"
  }
]