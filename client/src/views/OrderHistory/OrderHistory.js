import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/loadingbox/LoadingBox';
import MessageBox from '../../components/messagebox/MessageBox';

export default function OrderHistory(props) {
	const orderMineList = useSelector((state) => state.orderMineList);
	const { loading, error, orders } = orderMineList;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listOrderMine());
	}, [dispatch]);

	return (
		<div>
			<h1> Order History </h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : !!error ? (
				<MessageBox variant='danger'></MessageBox>
			) : (
				!!orders && (
					<table className='table'>
						<thead>
							<tr>
								<th>ID</th>
								<th className='sm-screen'>DATE</th>
								<th className='sm-screen'>TOTAL</th>
								<th className='sm-screen'>PAID</th>
								<th className='sm-screen'>DELIVERED </th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td className=''>{order._id}</td>
									<td className='sm-screen'>
										{moment(order.createdAt).format(
											'DD/MM/YYYY'
										)}
									</td>
									<td className='sm-screen'>
										{order.totalPrice}
									</td>
									<td className='sm-screen'>
										{order.isPaid
											? moment(order.paidDate).format(
													'DD/MM/YYYY'
											  )
											: 'No'}
									</td>
									<td className='sm-screen'>
										{order.isDelivered
											? moment(order.deliveryDate).format(
													'DD/MM/YYYY'
											  )
											: 'No'}
									</td>
									<td>
										<button
											type='button'
											className='button button--small'
											onClick={() =>
												props.history.push(
													`/orders/${order._id}`
												)
											}
										>
											{' '}
											Details{' '}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)
			)}
		</div>
	);
}
