CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar_color VARCHAR(7) NOT NULL
);

CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp DESC);
