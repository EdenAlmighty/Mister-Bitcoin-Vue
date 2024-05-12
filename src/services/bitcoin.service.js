import { storageService } from "./storage.service"
import axios from 'axios'

export const bitcoinService = {
    getRateStream,
    getRate,
    getMarketPriceHistory
}

const TRADE_VOLUME_KEY = 'tradeVolume'

async function getRateStream(coins) {
    return async (idx) => {
        try {
            const rate = await this.getRate(coins)
            return rate + idx
        } catch (err) {
            console.err("err getting rate:", err)
            throw err
        }
    }
}


async function getRate(coins) {
    try {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        return res.data
    } catch {
        console.log("Cannot get coins", coins)
    }
}

async function getMarketPriceHistory() {
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        console.log(res.data);
        return res.data
    } catch (err) {
        console.log(err);
    }
}

// async function getTradeVolume() {
//     try {
//         const data = storageService.load(TRADE_VOLUME_KEY)
//         if (data) {
//             return data
//         }
//         const response = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
//         const vals = response.data.values.map(item => ({
//             name: new Date(item.x * 1000).toLocaleDateString("en-US"),
//             value: item.y
//         }))
//         storageService.store(TRADE_VOLUME_KEY, vals)
//         return vals
//     } catch (error) {
//         console.error('Cannot get trade volume', error)
//         throw error
//     }
// }
