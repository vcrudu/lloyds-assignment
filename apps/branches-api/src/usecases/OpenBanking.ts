import axios from "axios";
import * as constants from "../common/constants";

export default class OpenBanking {
    static async getBranches(brandName: string, location: string) {
        try {
            const response = await axios.get(constants.OPEN_BANKING_URL);
            const CurrentBrand = response.data.data[0]?.Brand?.find(brand => brand.BrandName === brandName);
            if (CurrentBrand !== undefined) {
                return CurrentBrand.Branch.filter(branch => branch.PostalAddress?.TownName?.toLowerCase() === location.toLowerCase());
            } else return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}