import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import * as constants from "../common/constants";
import OpenBanking from "./OpenBanking";

describe("getBranches", () => {
    let mock;

    beforeAll(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should call axios", async () => {
        const branchesData = {
            "data": [
                {
                    "Brand": [
                        {
                            "BrandName": "Lloyds Bank",
                            "Branch": [
                                {
                                    "PostalAddress": {
                                        "TownName": "London"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
       
        mock.onGet(constants.OPEN_BANKING_URL).reply(200, branchesData);

        const result = await OpenBanking.getBranches(constants.BRAND_NAME, "London");

        expect(mock.history.get[0].url).toEqual(constants.OPEN_BANKING_URL);
        expect(result).toEqual(branchesData.data[0].Brand[0].Branch);
    });
});