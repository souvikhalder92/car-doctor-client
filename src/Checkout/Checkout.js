import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';


const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if(phone.length > 10){
        //     alert('Phone number should be 10 characters or longer')
        // }
        // else{

        // }

        fetch('https://car-doctor-server-iota.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    alert('Order placed successfully')
                    form.reset();
                    
                }
            })
            .catch(er => console.error(er));


    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className="mt-5">
                <h2 className="text-4xl mt-5">You are about to Order: <span className='font-semibold'>{title}</span> </h2>
                <h4 className="text-3xl mb-5">Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:border  lg:p-5   lg:border-slate-300 hover:border-stone-400 '>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-ghost w-full  input-bordered" />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost w-full  input-bordered" />
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full  input-bordered" required />
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered" readOnly />
                    <textarea name="message" className="textarea textarea-bordered h-24 w-full mt-5 ml-0 lg:ml-96" placeholder="Your Message" required></textarea>
                </div>
              
                 <div className='text-center mb-5'>
                <input className='btn mt-4' type="submit" value="Place Your Order" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;