const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    // Verifikasi username, pastikan belum terdaftar.
    await this.verifyAllUsernames({ username });

    // Bila verifikasi lolos, maka masukkan user baru ke database.
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, username, hashedPassword, fullname],
    };

    const insertResult = await this._pool.query(insertQuery);

    if (!insertResult.rows.length) {
      throw new InvariantError("Gagal menambahkan user.");
    }

    return insertResult.rows[0].id;
  }

  async verifyAllUsernames({ username }) {
    // Verifikasi username, pastikan belum terdaftar.
    const query = {
      text: "SELECT id FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan.",
      );
    }
  }

  async getUserByID(userId) {
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return result.rows[0];
  }
}
module.exports = UsersService;
