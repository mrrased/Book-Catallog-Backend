import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.Service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await OrderService.CreateOrder(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await OrderService.getAllOrder(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result.data,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
