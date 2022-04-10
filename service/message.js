import {pool} from "../utility/connect";

class MessageService {
  constructor() {
    this.pool = pool;
  }

  async createMessage(sender_id, message) {
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
}

export default MessageService;