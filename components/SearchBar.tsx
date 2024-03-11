"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
    try{
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')){
            return true;
        }
    }catch(error){
        false;
    }
}
const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        
        if(!isValidLink){
            return alert('Please provide Valid Amazon Link');
        }
        try{
            setIsLoading(true);
            const product = await scrapeAndStoreProduct(searchPrompt);
        }catch(error){
            console.log('error' + error);
        } finally{
            setIsLoading(false);
        }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}>
            <input 
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder='Enter text'
                className='searchbar-input'>

                </input>

            <button type-='submit' className='searchbar-btn' disabled={searchPrompt === ''}>{isLoading? 'Searching' :'Search'}</button>
    </form>
  )
}

export default SearchBar