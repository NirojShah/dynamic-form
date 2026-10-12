import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import formsApi from '../../../utility/forms.api';
import FormCard from '../../common/FormCards';
import BackButton from '../../common/BackButton';

export const Favorite = () => {

    // const navigate = useNavigate();
    const [favoriteForms, setFavoriteForms] = useState([]);

    useEffect(() => {
        const fetchFavoriteForms = async () => {
            try {
                const resp = await formsApi.getFavoriteForms();
                if (resp.success) {
                    setFavoriteForms(resp.data)
                }
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchFavoriteForms();
    }, [])

    const handleClick = async () => {
        console.log("ehhh boiii....")
    }

    return (
        <div className='flex flex-col gap-2'>
            <div>
                <BackButton title={"My Forms"} path={"/home"} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteForms.map((val) => {
                    return (
                        <FormCard
                            className="w-80"
                            description={val.description}
                            organization={val.organizationName}
                            title={val.name}
                            onClick={handleClick}
                            key={val._id}
                        />
                    );
                })}
            </div>
        </div>
    )
}
