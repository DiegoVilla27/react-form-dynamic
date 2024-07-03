interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
}

const ItemMsgError = ({ message }: IProps) => {
  return <small className="msg-error">● {message}</small>;
};

export default ItemMsgError;
