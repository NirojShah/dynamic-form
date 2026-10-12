import apiInstance from "../api-instance/apiInstance";

const sendMessage = async (query, formId) => {
    try {
        if (!formId || !query) {
            console.log("failed...")
            return;
        }
        const resp = await apiInstance.post("/form/ask-questions", {
            query,
            formId
        })

        return resp;
    } catch (err) {

    }
}

const chatFunctions = {
    sendMessage
}

export default chatFunctions;