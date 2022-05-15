import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['BOY COSTUME ','BAG', 'SHOES', 'GIRL TUTU DRESS'];
  res.send(categories);
});

export default handler;
