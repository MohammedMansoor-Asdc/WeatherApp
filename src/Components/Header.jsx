import React, { useEffect, useState } from 'react'
import LeftNav from './LeftNav';
import { useFetch } from '../Hooks/useFetch';


function getDate() {
    let date = new Date();
    let hour = () => date.getHours();
    let min = () => date.getMinutes();
    let formattedTime = `${hour()}:${min()}`;
    return formattedTime;
}

function greeting() {
    let date = new Date()
    let hour = date.getHours()

    if (hour < 12) {
        return 'Good Morning,';
    } else if (hour >= 12 && hour <= 16) {
        return 'Good Afternoon,';
    } else if (hour >= 16 && hour <= 22) {
        return 'Good Evening'
    } else if (hour >= 22 && hour <= 24) {
        return 'Good Night'
    }
}

function Header() {
    const [weatherData, setWeatherData] = useState(null);
    const [inputVal, setInputVal] = useState()

    useEffect(() => {
        async function fetchEmptyData() {
            try {
                const defaultQuery = 'default';
                const res = await useFetch(`https://api.weatherapi.com/v1/current.json?key=d3b3f42c5cc94d8b9b5152123220605&q=${defaultQuery}&aqi=no`);
                setWeatherData(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (inputVal === undefined || inputVal === 0) {
            fetchEmptyData();
        }

    }, [inputVal]);

    async function fetchData() {
        try {
            let Query = inputVal
            // console.log(Query)
            if (inputVal !== undefined && inputVal !== 0) {
                const res = await useFetch(`https://api.weatherapi.com/v1/current.json?key=d3b3f42c5cc94d8b9b5152123220605&q=${Query}&aqi=no`);
                setWeatherData(res);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    console.log(inputVal)
    return (
        <>
            <div className='mt-3 font-Roboto flex justify-center'>
                <div className='flex gap-[800px]'>
                    <div className='flex gap-4'>
                        <div className='mt-4 cursor-pointer'>
                            <span className='pt-4 pb-4 pr-5 pl-5 text-center bg-orange-600 font-bold text-white rounded-[20%] text-xl'>M</span>
                        </div>
                        <div className='mt-1'>
                            <p>{greeting()}</p>
                            <p className='text-xl'>Mohammed Mansoor</p>
                        </div>
                    </div>
                    <div>
                        <input value={inputVal} onChange={(event) => setInputVal(event.target.value)}
                            onKeyDown={handleKeyDown} className='focus:outline-none mt-1 pl-4 pr-3 pt-4 pb-4 w-[500px] bg-lightGray rounded-s-2xl' type="text" placeholder='Search Location' />
                        <i onClick={fetchData} className=" cursor-pointer ri-search-line text-xl bg-lightGray p-4 pb-5 rounded-e-2xl "></i>
                    </div>
                </div>
            </div>
            <div className='flex mt-6'>
                <LeftNav />
                <>
                    {weatherData && (
                        <div className='mt-4 ml-6 w-[350px] h-[722px] p-4 bg-lightGray rounded-xl font-Roboto flex flex-col gap-3 justify-center'>
                            <div className='flex gap-36'>
                                <p className='border p-2 rounded-2xl bg-white text-black'>{weatherData.location.country},IN</p>
                                <p>{getDate()}</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <img src={weatherData.current.condition.icon} alt="logo" />
                                <p className='text-slate-400'>{weatherData.current.condition.text}</p>
                            </div>
                            <div className='flex justify-center'>
                                <span className='text-[150px]'>{weatherData.current.temp_c}</span><span className='mt-10'>&#9900;C</span>
                            </div>
                            <div className='flex gap-10'>
                                <div>
                                    <p className='text-slate-400'>Presssure</p>
                                    <p className='text-2xl'>{weatherData.current.pressure_mb} mb</p>
                                </div>
                                <div>
                                    <p className='text-slate-400'>Humidity</p>
                                    <p className='text-2xl'>{weatherData.current.humidity} %</p>
                                </div>
                                <div>
                                    <p className='text-slate-400'>Visibility</p>
                                    <p className='text-2xl'>{weatherData.current.vis_km} km</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <div className='bg-superGray rounded-xl p-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <svg className='w-[25px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>
                                        <p className='text-slate-400'>Sunrise</p>
                                        <p className=''>6:25 AM</p>
                                    </div>
                                </div>
                                <div className='bg-superGray rounded-xl p-2'>
                                    <div className='flex gap-2 flex-col'>
                                        <svg className='w-[25px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.98392 5.05991C11.1323 3.22236 13.1734 2 15.5 2C19.0899 2 22 4.91015 22 8.5C22 9.58031 21.7365 10.5991 21.2701 11.4955C22.3351 12.4985 23 13.9216 23 15.5C23 18.5376 20.5376 21 17.5 21H9C4.58172 21 1 17.4183 1 13C1 8.58172 4.58172 5 9 5C9.33312 5 9.66149 5.02036 9.98392 5.05991ZM12.0554 5.60419C14.0675 6.43637 15.6662 8.06578 16.4576 10.0986C16.7951 10.0339 17.1436 10 17.5 10C18.2351 10 18.9366 10.1442 19.5776 10.4059C19.8486 9.82719 20 9.18128 20 8.5C20 6.01472 17.9853 4 15.5 4C14.1177 4 12.8809 4.6233 12.0554 5.60419Z"></path></svg>
                                        <p className='text-slate-400'>Sunset</p>
                                        <p>6:45 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </>
    )
}
export default Header