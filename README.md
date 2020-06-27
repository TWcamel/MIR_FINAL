###### tags: MIR, NTHU, music-information-retrieval, beat estimation, Vue, Koa

Final Project for Music Information Retrieval
==
- [Final Project for Music Information Retrieval](#final-project-for-music-information-retrieval)
  - [About](#about)
  - [Prerequisites](#prerequisites)
  - [How to run ?](#how-to-run-)
  - [Screen shot](#screen-shot)
  - [TODO](#todo)

## About
獨家！全球首發！音樂模型訓練系統上線啦～
這是一個由音樂驗證碼做登入，登入後可以進行音樂模型訓練、分析頻譜等操作的系統；有鑑於過往並沒有以音樂驗證碼作登入驗證的系統，剛好可藉由此次期末專案做開發，順利完成基本功能。
此專案歡迎各界高手幫忙開發貢獻，也歡迎使用這套系統，如果有好點子、改善建議也都相當歡迎提出 issue。


This is a system with music verification code for login, after which you can conduct music model training and analysis of spectrum and other operations. There was no website with music verification code for login before, but it happened here!.
The basic functions were successfully completed. You are welcome to contribute to this project, also, welcome to use this system. If you have good ideas or suggestions for improvement, issues are welcome!


## Prerequisites
Most of works were done by `vue`, `koa`, `webpack` in this project. To run, first, you'll need `nodejs` as well as `npm` package manager.
```
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
Once above works've been done, install dependencies.
```
$ npm i
```

## How to run ?

* `npm run dev` - start server at `localhost:8300` (can be modified at `config/server.js`).

* `npm run build` - producte Vue files to `/vue-dist`.

* `npm run start` - run the project by using built files.

## Screen shot
![](https://i.imgur.com/ae35c7c.png)
![](https://i.imgur.com/UFaMrjq.png)

## TODO
- [x] Analyzer's page 
- [x] train-model's component 
- [ ] Rebuild Analyzer's page 
- [ ] Train Model on client's side
- [ ] Beatfile tracker function