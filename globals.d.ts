import { Model } from 'sequelize/types/model';

// globals.d.ts
declare global {
  interface Db {
    [key: string]: typeof Model;
  }

  var db: Db;
}

export {}; // 使文件成为一个模块
