const jwt = require('jsonwebtoken');
const pool = require('../../db/db');

exports.sendorderbill = async (req, res) => {
  const {
    orderreqid,
    totalprice,
    customerid,
    medlist,

  } = req.body;

  const acceptstatus = 0;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const pharmacyid = decoded.payload.id;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < medlist.length; i++) {
    const { batchid } = medlist[i];
    const { amount } = medlist[i];

    const sendmedlist = pool.query(
      'INSERT INTO public.list_items( batchid, quantity, order_reqid) VALUES ($1, $2, $3) RETURNING *',
      [batchid, amount, orderreqid],
    );
    if (!sendmedlist) {
      res.status(400).send('list adding error');
    }
    // }
  }
  try {
    const sendmedlist = await pool.query(
      'INSERT INTO public.order_medlist( order_reqid, totalprice, pharmacyid, customerid, acceptstatus) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [orderreqid, totalprice, pharmacyid, customerid, acceptstatus],
    );
    if (sendmedlist && sendmedlist) {
      return res.status(201).json({
        message: 'medicine list sent success',
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.getPharmacyOrder_reqs = async (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];

//   const decoded = jwt.decode(token, process.env.JWT_SECRET);
//   const pharmacyid = decoded.payload.id;
//   // var decoded = jwt_decode(token);
//   // console.log(pharmacyid);

//   try {
//     const allOrders = await pool.query(
//       'SELECT * FROM order WHERE pharmacyid = $1', [
//         pharmacyid,
//       ],
//     );

//     if (allOrders.rows.length === 0) {
//       return res.status(401).json('No rows to show');
//     }

//     if (allOrders) {
//       return res.status(201).json({
//         message: 'orders listed success',
//         allOrders,
//       });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
