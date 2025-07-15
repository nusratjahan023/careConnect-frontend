import React from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Payments = () => {
  const payments = [
    { date: '2025-07-01', amount: '$120', status: 'Completed' },
    { date: '2025-06-20', amount: '$90', status: 'Pending' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Payments</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Payments;
