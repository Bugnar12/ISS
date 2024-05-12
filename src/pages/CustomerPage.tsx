import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Customer } from '../models/Customer';
import { getCustomersByAntivirusId, getNoOfCustomersByAntivirusId } from '../services/CustomerService';
import LoadingPage from "./LoadingPage";
import InfiniteScroll from "react-infinite-scroll-component";
import '../styling/CustomerPageStyle.css';
import '../styling/CustomerListStyle.css';
import {getAntivirusById} from "../api/API_Requests";
import {Antivirus} from "../models/Antivirus";

export const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerCount, setCustomerCount] = useState<number>(0);
    const { antivirusId } = useParams();
    const [antivirus, setAntivirus] = useState<Antivirus>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [customersSum, setCustomersSum] = useState<number>(0);

    if(antivirusId === undefined)
        return null;

    const fetchCustomers = () => {
        getCustomersByAntivirusId(parseInt(antivirusId), pageNumber, 20).then((response) => {
            setCustomers([...customers, ...response]);
            setPageNumber(pageNumber + 1);
        });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getCustomersByAntivirusId(parseInt(antivirusId), pageNumber, 20).then((response) => {
            setCustomers(response);
            setIsLoading(false);
            setPageNumber(pageNumber + 1);
        });

        getNoOfCustomersByAntivirusId(parseInt(antivirusId)).then((count) => {
            setCustomerCount(count);
        });

        getAntivirusById(parseInt(antivirusId)).then((response) => {
            setAntivirus(response.data);
        })
    }, []);

    if(isLoading) return <LoadingPage/>

    return (
        <div className='customer-list'>
            <h2 className='antivirus-for-customers'>Customers subscribed to the antivirus <span className='highlighted'>{antivirus?.name}</span></h2>
            <h3 className='customer-count'>Total Customers: {customerCount}</h3>
            <InfiniteScroll
                dataLength={customers.length}
                next={fetchCustomers}
                hasMore={customers.length < customerCount}
                loader={<h3>Loading page...</h3>}
                className = 'infinite-scroll-grid'>
                {customers.map((customer: Customer) => (
                    <div key={customer.getId()} className='customer-card'>
                        <h2>{customer.getFullName()}</h2>
                        <p>Email: {customer.getEmail()}</p>
                        <p>Age: {customer.getAge()}</p>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}