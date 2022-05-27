import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['BOY COSTUME ', 'GIRL TUTU DRESS' , 'BAG', 'SHOES'];
  res.send(categories);
});

export default handler;
