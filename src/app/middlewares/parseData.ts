import { NextFunction, Request, Response } from "express"


const parseData = (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
}

export default parseData
