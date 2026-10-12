import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import formsApi from '../../../utility/forms.api';
import BackButton from '../../common/BackButton';
import DynamicResponseTable from '../../common/DynamicResponseTable';
import ChatComponent from '../../chat-component/ChatComponent';
import chatFunctions from '../../../utility/form.chat.api';

const FormResponse = () => {
    const { formId } = useParams()
    const [response, setResponse] = useState([]);
    const [fields, setFields] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        // setPage(1);
        // setLimit(10);
        const fetchResponse = async (formId) => {
            const resp = await formsApi.getResponses({ key: formId, page, limit })
            setResponse(resp.data);
            setFields(resp.fields);
        }
        fetchResponse(formId);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [formId])
    const handleAskQuestion = async (query, formId) => {
        const resp = await chatFunctions.sendMessage(query, formId)
        setResponse(resp.data)
    }

    return (
        <div className='flex flex-col items-start gap-2'>
            <BackButton title={"My form"} />
            <DynamicResponseTable fields={fields} data={response} />
            <ChatComponent formId={formId} onMessageSent={handleAskQuestion} />
        </div>
    )
}

export default FormResponse