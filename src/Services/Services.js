import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services,setServices] = useState([]);

    useEffect(() =>{
        fetch('https://car-doctor-server-iota.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-3xl font-bold text-orange-600'>Services</p>
                <h2 className='text-5xl font-semibold'>Our Service Area</h2>
                <p className='mt-2'>The majority have suffered alteration in some form, by injected humour,<br/> or randomised words which don't look even slightly believable.</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
            <div className='mt-5 text-center mb-5'>
        <button className="btn btn-outline btn-error">More Services</button>
        </div>
        </div>
    );
};

export default Services;