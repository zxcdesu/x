export interface TelegramWebhook {
  update_id: number;
  message?: {
    message_id: number;
    chat: {
      id: number;
      first_name: string;
      username: string;
    };
    date: number;
    text: string;
  };
  edited_message?: {
    message_id: number;
    chat: {
      id: number;
      first_name: string;
      username: string;
    };
    date: number;
    edit_date: number;
    text: string;
  };
}
