import axios from "axios";

const mainAPI = process.env.MAIN_API;
const backupAPI = process.env.BACKUP_API;

export const fetchExternalData = async () => {
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