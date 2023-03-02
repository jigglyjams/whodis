import { config, sounds } from "./config.js"
import { log, sleep } from "./utils.js";

import { Client, Intents, MessageEmbed, MessageAttachment } from 'discord.js';
const discord = new Client({ intents: [Intents.FLAGS.GUILDS] });

const MAX_RETRIES = 6;

const options = {
  reconnect: {
      auto: true,
      delay: 5000,
      maxAttempts: 5,
      onTimeout: true
  }
};

import Web3 from 'web3';
import axios from 'axios';
var web3_ws = new Web3(new Web3.providers.WebsocketProvider(config.RPC_SOCKET, options));
var web3_http = new Web3(config.RPC_HTTP);
var globalContract;

async function getPastEvent(sound) {
  const fromBlock = await web3_http.eth.getBlockNumber() - 9999;
  const contract = await getContract(sound.CONTRACT, 1);
  const ex = await contract.getPastEvents("allEvents", {
    fromBlock: fromBlock,
    toBlock: 'latest',
    topics: sound.TOPICS[0]
  })
  return ex[0];
}

async function getImage(src) {
  return axios.get(src,
    { responseType: 'arraybuffer'}).then(response => Buffer.from(response.data, 'binary'));
}

async function getContract(contractAddress, http = 0) {
  const abi_url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${config.ETHERSCAN_KEY}`;
  const abi = await axios.get(abi_url).then((result) => {return JSON.parse(result.data.result)});
  globalContract = new web3_http.eth.Contract(abi, contractAddress);
  return (http === 0) ? new web3_ws.eth.Contract(abi, contractAddress) : new web3_http.eth.Contract(abi, contractAddress);
}

const getHandle = async (id) => {
  const dataBytes = await globalContract.methods.handleOf(id).call();
  return Web3.utils.hexToUtf8(dataBytes);
}

const getUriData = async (ipfs, cid) => {
  const uriData = await axios.get(`${ipfs}/${cid}`);
  return uriData.data;
}

async function mapData(data) {
  const sI = sounds.findIndex( i => { return i.CONTRACT === data.address }); 
  const tokenId = parseInt(data.returnValues[sounds[sI]['ID']]);
  let value = -2;
  // const projectHandle = await getHandle(tokenId);
  const uriData = await getUriData(sounds[sI]['URI_SRC'], data.returnValues['metadata']['content']);
  const img = (uriData.logoUri === "") ? -1 : await getImage(uriData.logoUri.replace('ipfs://', 'https://ipfs.io/ipfs/'));
  const marketURL = `${sounds[sI].MARKET}/${tokenId}`;
  await sendMessage(sounds[sI].DISCORD_CHANNEL, sounds[sI].NAME, uriData.name, tokenId, uriData.description, img, value, marketURL, uriData);
  log(`${sounds[sI].NAME} ${tokenId}, ${marketURL}`);
}

const ear = async (sound) => {
  const contract = await getContract(sound.CONTRACT)
  console.log(globalContract);
  contract.events.allEvents({
    topics: sound.TOPICS
  })
    .on('data', function(event) {
      mapData(event);
  })
    .on("connected", function(subscriptionId){
      //log(subscriptionId);
    })
}

discord.once('ready', async c => {
  log(`Ready! Logged in as ${c.user.tag}`);
});

discord.login(config.DISCORD_KEY);

const sendMessage = async (channel, name, projectName, tokenId, description, png, value, marketURL, socials) => {
  const attachmentName = `${name}-${tokenId}.png`;
  const attachment = new MessageAttachment(png, attachmentName);
  const message = new MessageEmbed()
    .setTitle(`${tokenId}: ${projectName}`)
    .setURL(marketURL)
    .setDescription('🧃  new juice who dis? 🤔')
    .addField('About', (description === '') ? '???' : description);
  (value > 0) ? message.addField('Sale Price',`Ξ${value}`) : null;
  (png !== -1) ? message.setImage(`attachment://${attachmentName}`) : null;
  (socials.twitter !== '') ? message.addField('Twitter', `https://twitter.com/${socials.twitter}`) : null;
  (socials.infoUri !== '') ? message.addField('Website', socials.infoUri) : null;
  (socials.discord !== '') ? message.addField('Discord', socials.discord) : null;
  if (png !== -1) {
    await discord.channels.cache.get(channel).send({ embeds: [message], files:[attachment] });
  } else {
    await discord.channels.cache.get(channel).send({ embeds: [message] });
  }
}

sounds.forEach( (s) => {
  ear(s);
});

// getPastEvent(sounds[0]).then( u => {
//   mapData(u);
// });