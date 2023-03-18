import React from 'react'

type Props = {
    title: string
    amount: string;
}

const Headline = ({ title, amount }: Props) => {
    return (
        <div className="card w-96 bg-success text-primary-content text-center">
            <div className="card-body">
                <h2 className="card-title text-center self-center text-2xl">{title}</h2>
                <p className='text-4xl'>{amount}</p>
            </div>
        </div>
    )
}

export default Headline