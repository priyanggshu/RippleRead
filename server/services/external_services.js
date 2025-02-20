import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const mainAPI = process.env.MAIN_API;
const backupAPI = process.env.BACKUP_API;

export const fetchExternalData = async () => {
    console.log(`MAIN API ${mainAPI}`);
    console.log(`BACKUP_API ${backupAPI}`);
    try {
        const response = await axios.get(mainAPI);
        return response.data;

    } catch (error) {
        console.warn(`Main API failed, switching to backup...`);

        try {
            const backupResponse = await axios.get(backupAPI);
            return backupResponse.data;

        } catch (backupError) {
            console.error(`Both APIs failed: ${backupError}`);
            return { error: 'Data not available' };
        }
    }
};