import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ title, path }) => {
    const navigate = useNavigate()
    const handleBack = () => {
        if (!path) {
            navigate(-1)
            return;
        }
        navigate(path)
    }
    return (
        <button onClick={handleBack} className='flex flex-row gap-1.5 justify-center content-center cursor-pointer'>
            <ArrowLeft width={"18px"} />
            <span>
                {title}
            </span>
        </button>
    )
}

export default BackButton