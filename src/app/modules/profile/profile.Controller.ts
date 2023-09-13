import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.Service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await ProfileService.getProfile(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const PorfileController = {
  getProfile,
};
