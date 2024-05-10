import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Customer } from '../models/Customer';
import { getCustomersByAntivirusId } from '../services/CustomerService';

export const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const { antivirusId } = useParams();

    useEffect(() => {
        if(antivirusId === undefined)
            return;

        getCustomersByAntivirusId(parseInt(antivirusId))
            .then((data: any[]) => {
                const customerInstances = data.map(customer => new Customer(customer.id, customer.fullName, customer.email, customer.age, customer.antivirusId));
                setCustomers(customerInstances);
            });
    }, [antivirusId]);

    if(antivirusId === undefined)
        return null;

    return (
        <div className='customer-list'>
            <h2>Customers using this Antivirus</h2>
            {customers.map((customer : Customer) => (
                <div key={customer.getId()} className='customer-card'>
                    <h2>{customer.getFullName()}</h2>
                    <p>Email: {customer.getEmail()}</p>
                    <p>Age: {customer.getAge()}</p>
                </div>
            ))}
        </div>
    );
}