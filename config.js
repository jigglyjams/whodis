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
    CONTRACT: "0xD8B4359143eda5B2d763E127Ed27c77addBc47d3",
    TOPICS: [
      "0xf3e6948ba8b32d557363ea08470121c47c0127659aed09320812174d373afef2", // Create
    ],
    ID: "projectId",
    URI: "uri",
    HANDLE: "handle",
    URI_SRC: "https://ipfs.io/ipfs",
    //DISCORD_CHANNEL: "875535133258690611", // Canu
    DISCORD_CHANNEL: "889377541675159605", // jigglys bots
    MESSAGE: {
      DESCRIPTION: "New juice who dis?"
    },
    GET_VALUE: 0,
    DECIMAL: 18,
    MARKET: "https://juicebox.money/v2/p"
  }
]