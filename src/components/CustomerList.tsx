import {Customer} from "../models/Customer";
import {useEffect, useState} from "react";

import {getCustomersByAntivirusId} from "../services/CustomerService";


interface Props{
    antivirusId: number;
}
export const CustomerList: React.FC<Props> = ({ antivirusId }) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchCustomers = () => {
        getCustomersByAntivirusId(antivirusId)
            .then((data: any[]) => {
                const customerInstances = data.map(customer => new Customer(customer.id, customer.fullName, customer.email, customer.age, customer.antivirusId));
                if (customerInstances.length === 0) {
                    setHasMore(false);
                } else {
                    setCustomers(customerInstances); // Set the customers state directly to the new customers
                }
            });
    }

    useEffect(() => {
        // Clear the customers state
        setCustomers([]);

        // Fetch the new customers
        fetchCustomers();
    }, [antivirusId]);

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