/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const pool = require('../../db/db');

// eslint-disable-next-line consistent-return
exports.getPharmacyOrder_reqs = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const pharmacyid = decoded.payload.id;
  const status = 'rejected';
  try {
    const allOrders = await pool.query(
      'SELECT * FROM order_req WHERE pharmacyid = $1 AND acceptstatus != $2', [
        pharmacyid, status,
      ],
    );

    if (allOrders.rows.length === 0) {
      return res.status(401).json('No rows to show');
    }

    if (allOrders) {
      return res.status(201).json({
        message: 'orders listed success',
        allOrders,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// eslint-disable-next-line consistent-return
exports.getPharmacyOrder_req = async (req, res) => {
  const {
    orderreqid,
  } = req.body;

  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const pharmacyid = decoded.payload.id;

  try {
    const singleOrder = await pool.query(
      'SELECT * FROM order_req WHERE order_req.pharmacyid = $1 AND order_req.id = $2', [
        pharmacyid, orderreqid,
      ],
    );
    if (singleOrder.rows.length === 0) {
      return res.status(401).json('No rows to show');
    }

    if (singleOrder) {
      return res.status(201).json({
        message: 'orders listed success',
        singleOrder,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.rejectOrder_req = async (req, res) => {
  const {
    orderreqid,
    rejectmessage,
  } = req.body;

  const status = 'rejected';

  try {
    const rejectOrder = await pool.query(
      'UPDATE public.order_req SET acceptstatus = $1, rejectmessage = $2 WHERE id = $3', [
        status, rejectmessage, orderreqid,
      ],
    );
    // if (singleOrder.rows.length === 0) {
    //   return res.status(401).json('No rows to show');
    // }

    if (rejectOrder) {
      return res.status(200).json({
        message: 'orders rejected success',
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
