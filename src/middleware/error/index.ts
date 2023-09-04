import { Request, Response, NextFunction } from "express";

// 定义错误类型
interface AppError extends Error {
  status?: number;
}

export const initErrorHandler = (app: any) => {
  // 错误处理中间件函数
  const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // 设置默认的状态码和错误消息
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    const error = {
      code: statusCode,
      success: false,
      message: errorMessage,
    };
    console.log(error);
    // 返回错误响应
    res.status(statusCode).json(error);
  };
  app.use(errorHandler);
};
