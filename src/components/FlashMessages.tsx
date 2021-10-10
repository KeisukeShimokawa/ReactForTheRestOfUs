type FlashMessagesProps = {
  messages: string[];
};

const FlashMessages = ({ messages }: FlashMessagesProps) => {
  return (
    <div className="floating-alerts">
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            className="alert alert-success text-center floating-alert shadow-sm"
          >
            {msg}
          </div>
        );
      })}
    </div>
  );
};

export { FlashMessages };
