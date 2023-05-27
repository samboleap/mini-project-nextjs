'use client'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik"
// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import * as Yup from 'yup'
import { BASE_URL } from "../utils/constant";
import Link from "next/link";
import React from 'react'


async function getCategories(){
    const cates = await fetch(`${BASE_URL}categories` ,{cache: "no-store"});
    return cates.json()
}

export default function AddProducts() {

    // const router = useRouter()
    const [cates, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageURL, setImageURL] = useState("");

    useEffect(()=> {
        const getCategory = async () =>{
            try{const data = await getCategories();
            setCategory(data);
            setIsLoading(false);
            }catch(err){
            console.log(err)
        }
    };
    getCategory();
    }, []);
    
    const FILE_SIZE = 1024 * 1024 * 10; // 10MB
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const validateSchema = Yup.object().shape({
        title: Yup.string().required("Required title"),
        price: Yup.string().required("Require price"),
        description: Yup.string().required("Require description"),
        categoryId: Yup.number().integer().required("Require category"),
        images: Yup.array().of(
        
        Yup.mixed().test("fileSize", "Image too large", (value) => {
            console.log("value", value);
            if (!value) {
                return true
            }
            return value.size <= FILE_SIZE;
        }).test("ImageFormat", "Unsupported Format", (value) => {
            if (!value) {
                return true
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        )
        .required("Required")
    })
    const uploadImage = async (values) => {
        try {

            const uploadPromises = values.map(async (image)=>{
                const response = await axios.post(`${BASE_URL}images/upload`, image);
                console.log(response);
                return response.data.location;
            });
            const uploadedImageUrls = await Promise.all(uploadPromises);
    console.log(uploadedImageUrls);
    return uploadedImageUrls;
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }

    const insertProduct = async (data) => {
        let { title, price, description, categoryId, images } = data
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const productData = JSON.stringify({
            title,
            price,
            description,
            categoryId,
            images: [images]
        });

        let requestData = {
            method: "POST",
            headers: myHeaders,
            body: productData,
        }

        const resp = await fetch(`${BASE_URL}products`, requestData)
        return resp.json()
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-5">
            <Formik
                initialValues={{
                    title: "",
                    price: "",
                    description: "",
                    categoryId: "",
                    images: null

                }}
                validationSchema={validateSchema}
                onSubmit={async (values, { setSubmitting ,resetFrom}) => {
                    const formData = new FormData();
                    formData.append("images", values.images);
                    const images = await uploadImage({ images: formData });
                    console.log("images", images);
                    console.log(values.images)
                    values.images = images;

                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        insertProduct(values, resetFrom)
                            .then(resp => { alert("Successfully insert Product") })
                        setSubmitting(false);
                    }, 1000);
                }}
            >
                {
                    ({ isSubmitting }) => (
                        <section className="bg-gray-50 dark:bg-gray-900 mt-20">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    <img className="w-8 h-8 mr-2" src="./images/logo-no-background.png" alt="logo" />
                                    SBL Company
                                </Link>

                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Create a product
                                        </h1>
                                        <Form
                                            className="space-y-4 md:space-y-6"
                                        >
                                            <div>
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
                                                <Field type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" />
                                                <ErrorMessage
                                                    name="title"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                <Field type="price" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="price" required="" />
                                                <ErrorMessage
                                                    name="price"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>

                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <Field type="description" name="description" placeholder="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                                <ErrorMessage
                                                    name="description"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CategoryId</label>

                                                <Field
                                                    as="select"
                                                    name="categoryId"
                                                    placeholder="categoryId"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required
                                                >
                                                    <option value="categories" disabled>Choose a category</option>

                                                    { cates.map((cate) => ( 
                                                        <option key={cate.id} value={cate.id}>
                                                            {cate.name}
                                                        </option>
                                                    ))}

                                                </Field>
                                                <ErrorMessage
                                                    name="categoryId"
                                                >
                                                    {msg => <div className="text-red-600">{msg}</div>}
                                                </ErrorMessage>
                                            </div>
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    <Field
                                                        id="dropzone-file"
                                                        name="file"
                                                        type="file"
                                                        className="hidden"
                                                        component={DropFileZone}
                                                    />

                                                </label>

                                            </div>
                                            <ErrorMessage
                                                name="images"
                                            >
                                                {msg => <div className="text-red-600">{msg}</div>}
                                            </ErrorMessage>

                                            <button
                                                disabled={isSubmitting}
                                                type="submit" class="text-white w-full bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
                                                Insert Product - SBL Company
                                            </button>

                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }
            </Formik>
        </div>
    )
}

function DropFileZone({ field, form }) {
    const [previewImage, setPreviewImage] = useState(null);
    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        form.setFieldValue(field.name, file);
        setPreviewImage(URL.createObjectURL(file));
    }
    return (
        <>
            <input
                id="dropzone-file"
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
            />
            {previewImage && (
                <img
                    src={previewImage}
                    alt="preview"
                    className="mt-2 h-20 w-full" />
            )}
        </>
    )
}