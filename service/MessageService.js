import {pool} from "../utility/connect";
import model from "../src/models";

class MessageService {
  constructor() {
    this.model = model;
  }

  async createMessage(sender_id, message) {
    try {
      const resp = await model.Message.create({
        sender_id,
        message,
      });
      console.log(resp);
      return resp === 0 ? null : resp;
    } catch (err) {
      console.error(err);
    }
  }

  async createMessageOld(sender_id, message) {
    try {
      const resp = await pool.query(
        "INSERT INTO messages (sender_id, message) VALUES ($1, $2) RETURNING *",
        [sender_id, message]
      );
      return resp.rows.length === 0 ? null : resp.rows[0];
    } catch (err) {
      console.error(err);
    }
  }

  async getMessage() {
    try {
      const resp = await pool.query(
        "SELECT users.id, users.avatar, messages.message FROM messages INNER JOIN users ON users.id = messages.sender_id",
      );
      return resp.rows.length === 0 ? [] : resp.rows;
    } catch (err) {
      console.error(err);
    }
  }
}

export default MessageService;