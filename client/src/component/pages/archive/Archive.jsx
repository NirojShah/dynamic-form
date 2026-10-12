import React, { useEffect, useState } from 'react'
import formsApi from '../../../utility/forms.api';
import FormCard from '../../common/FormCards';

const Archive = () => {
    const [forms, setForms] = useState([]);
    const fetchForms = async () => {
        const resp = await formsApi.getAllArchiveForm();
        if (resp.success) {
            setForms(resp.data)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchForms()
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forms.map((val) => {
                return (
                    <FormCard
                        className="w-80"
                        description={val.description}
                        organization={val.organizationName}
                        title={val.name}
                        // onClick={handleClick}
                        key={val._id}
                    />
                );
            })}
        </div>
    )
}

export default Archive