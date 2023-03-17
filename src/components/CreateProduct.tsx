import axios from "axios"
import React, { useState } from "react"
import { IProduct } from "../models"
import { ErrorMessage } from "./ErrorMessage"

const productData: IProduct = {
    title: "",
    price: 109.95,
    description: 'lorem ipsum',
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 3.9,
        count: 120
    }
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({onCreate}: CreateProductProps) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (value.trim().length === 0) {
            setError('Please enter valid title')
            return
        }

        productData.title = value

        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)

        onCreate(response.data)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <form onSubmit={submitHandler}>
            <input 
                type="text" 
                className="border py-2 px-4 mb-2 w-full outline-none"
                placeholder="Enter product title"
                value={value}
                onChange={changeHandler}
            />

            {error && <ErrorMessage error={error} />}

            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
        </form>
    )
}