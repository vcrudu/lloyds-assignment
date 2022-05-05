import * as express from 'express';
import * as Joi from "joi";
import * as constants from "../common/constants";
import OpenBanking from "../usecases/OpenBanking"

const router = express.Router();
router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.string().required()
    const { error } = schema.validate(req.header(constants.LOCATION_HEADER));
    if (error) {
        res.send({ error: 'Invalid location! Please specify the location in the lbg-txn-branch-location header.' });
        return;
    }
    next()
});

router.get("/", async (req: express.Request, res: express.Response) => {
    const location = req.header(constants.LOCATION_HEADER).toLowerCase();
    const branches = await OpenBanking.getBranches(constants.BRAND_NAME, location);
    res.json(branches);
});

export { router };