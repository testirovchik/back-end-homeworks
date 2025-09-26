import pool from "../db/config.js";
class Flags {
  constructor(table) {
    this.queryFlag = 0;
    this.selectFlag = 0;
    this.whereFlag = 0;
    this.andWhereFlag = 0;
    this.limitFlag = 0;
    this.command = ``;
  }
}
export class BaseModel {
  table = null;
  nulling() {
    this.flags = new Flags();
  }

  query() {
    this.flags = new Flags(this.table);
    this.flags.queryFlag = 1;
    return this;
  }
  select(name) {
    if(!this.flags) {
      throw new Error("Wrong sequence");
    }
    this.flags.command += `SELECT ${name} FROM ${this.table} `;
    this.flags.selectFlag = 1;
    this.flags.queryFlag = 0;
    return this;
  }

  where(prop1, sign = "=", prop2) {
    if(this.flags.selectFlag == 0) {
      throw new Error("Wrong sequence");
    }
    this.flags.whereFlag = 1;
    this.flags.selectFlag = 0;
    this.flags.command += `WHERE ${prop1} ${sign} ${prop2}`;
    return this;
  }

  andWhere(prop1, sign = "=", prop2) {
    if (this.flags.whereFlag == 0) {
      throw new Error("Wrong sequence");
    }
    this.flags.command += ` AND ${prop1} ${sign} ${prop2}`;
    return this;
  }
  limit(num) {
    if(this.flags.whereFlag == 0) {
      throw new Error("Wrong sequence");
    }
    this.flags.whereFlag = 0;
    this.flags.andWhereFlag = 0;
    this.flags.command += ` LIMIT ${num}`;
    return this;
  }
  async get() {
    const [rows] = await pool.query(this.flags.command);
    this.nulling();
    return rows;
  }
}
