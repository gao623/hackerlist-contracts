# hackerlist-contracts

## Overview

### Hackerlist

#### Testnet Address:

##### Wanchain

| Contract         | Address                                      |
| ---------------- |:--------------------------------------------:|
| Hackerlist       | `0x17aE30b8F0B22d9BBed70996ee6C4409A15AB28D` |
| HackerlistCaller | `0xd2F93ece6a397379C5e6E9DeC31D7514235c791B` |


###### Set hackers transactions
| Contract   | method       | comment                      | gasPrice | gasUsed | status  | txHash                                                               |
| ---------- |:------------:|:----------------------------:|:--------:|:-------:|:-------:|:--------------------------------------------------------------------:|
| Hackerlist | `setHackers` | set hacker array by operator | 10GWei   | 6995149 | success | `0x81bf88a99cc75b62df6e19282d35f51c5481c4f6b07038dbc20aba4d9f9a311e` |
| Hackerlist | `setHackers` | set hacker array by operator | 10GWei   | 6568796 | success | `0x1c0e5a3768eaf5eb25b7580e526c0994573d4cd840b0a54f660ffe3ffee8ccea` |
| Hackerlist | `setHackers` | set hacker array by operator | 10GWei   | 6046098 | success | `0x67f66a3a07f7481991ddac0ebd7e6e71b56cf557bee861c6dc74a63459eaf1b7` |
| Hackerlist | `setHackers` | set hacker array by operator | 10GWei   | 6090769 | success | `0x2804b555bebd84fbc025f3fc522d103abfe5dbd2a1bd3af0eee579ebfbe08e24` |


###### Call hackerlist transactions
| Contract         | method         | comment        | gasPrice | gasUsed | status  | txHash                                                               |
| ---------------- |:--------------:|:--------------:|:--------:|:-------:|:-------:|:--------------------------------------------------------------------:|
| HackerlistCaller | `userLock`     | common address | 2 GWei   | 43364   | success | `0xcef081b88047c4917ca91f473da8f89a24bad9a00d58bd4c5d48797cac93fa94` |
| HackerlistCaller | `userLock`     | hacker address | 2 GWei   | 40602   | failed  | `0x177c4ea413d39a6bc2dca86fa21893ab4ea61e5995c52d2c533bcf9c4275b2e5` |
| HackerlistCaller | `userLockPure` | common address | 2 GWei   | 26272   | success | `0x5c6d84bed39b5eb54b4fa593faea4012594bc4662d5dd9c696a8d358dd731f44` |
| HackerlistCaller | `userLockPure` | hacker address | 2 GWei   | 26272   | success | `0x7ef3560d2e3aa6049d20133e26b87af09a3775cfefc6fab385173e9f8e67ebb9` |

* `userLock`: check hacker, tx will revert if one of **tx.origin**, **msg.sender** or **userAccount** is hacker
* `userLockPure`: only emit event

##### Ethereum

| Contract         | Address                                        |
| ---------------- |:----------------------------------------------:|
| Hackerlist       | `0xc43143f1f3B7b9ae3D67Ddf3E634cce3f7d45427` |
| HackerlistCaller | `0xf400D7eDe6B5b27EC81361f736cc4cb13697e9e4` |


###### Set hackers transactions
| Contract   | method       | comment                      | gasPrice         | gasUsed | status  | txHash                                                               |
| ---------- |:------------:|:----------------------------:|:----------------:|:-------:|:-------:|:--------------------------------------------------------------------:|
| Hackerlist | `setHackers` | set hacker array by operator | 0.001000033 Gwei | 6995149 | success | `0xa3bd1f55a40290c7beb22052d7ae514b4dc1c190b85b52d5c109e3bd6dd6e2d2` |
| Hackerlist | `setHackers` | set hacker array by operator | 0.001200037 Gwei | 6568796 | success | `0x6a03bc2ec97fcfa6b2c254d2eb938e6b729d457885195a99db90e05e98f8891e` |
| Hackerlist | `setHackers` | set hacker array by operator | 0.001200038 Gwei | 6046098 | success | `0x1d79ab6b71c6813bcef1561cb2fdeec4af509f0872c191184a8f513a0dbf3895` |
| Hackerlist | `setHackers` | set hacker array by operator | 0.001200038 Gwei | 6090769 | success | `0x16d4b27e3138664164354d0485075817e7713ee634002a1f1e3b4fc74788bcc0` |


###### Call hackerlist transactions
| Contract         | method         | comment        | gasPrice         | gasUsed | status  | txHash                                                               |
| ---------------- |:--------------:|:--------------:|:----------------:|:-------:|:-------:|:--------------------------------------------------------------------:|
| HackerlistCaller | `userLock`     | common address | 1.500000037 Gwei | 43340   | success | `0xd415385b55211650e0bc78a02b00109a1898028cb34aa86347c4f4c351516662` |
| HackerlistCaller | `userLock`     | hacker address | 1.500000040 Gwei | 40578   | failed  | `0xcb92f6835021326234b4bd31396989a72a383cc1577d90c80980eab8817e2c5c` |
| HackerlistCaller | `userLockPure` | common address | 1.500000038 Gwei | 26248   | success | `0x14a5a0a921dd48456aee74293e38cd1ef57faa314e494f9d59507ec7af2025b3` |
| HackerlistCaller | `userLockPure` | hacker address | 1.500000040 Gwei | 26248   | success | `0xdae5e82f3de6ac07ee9d1ca27ea671e7527127e2ea056ac8257dd93d0dab6c27` |

* `userLock`: check hacker, tx will revert if one of **tx.origin**, **msg.sender** or **userAccount** is hacker
* `userLockPure`: only emit event
