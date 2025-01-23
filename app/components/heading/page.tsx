import React from 'react'

const Heading = ({ title }: { title: string }) => {
    return (
        <div>
            <div >
                <h1 className='text-slate-50 text-2xl'>
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default Heading
