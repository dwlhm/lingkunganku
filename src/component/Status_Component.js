import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Line } from 'rc-progress';
import Pusher from 'pusher-js';

import Chart_Element from './Chart_Element';
import LineGraph from './chartjs/LineGraph';

function Status_Component(props) {
    const [data, setData] = useState({
        air: 0,
        udara: 0,
        sampah: 0,
        date: "Loading",
        dataLabels: [],
        dataAir: [],
        dataUdara: [],
        dataSampah: [],
        status: "Loading"
    })
    const [air, setAir] = useState([]);
    const [udara, setUdara] = useState([]);
    const [labels, setLabels] = useState([]);
    const [sampah, setSampah] = useState([]);

    const [kota, setKota] = useState("loading")
    let pusher = new Pusher("f690560bf61bb6b8937a", {
        cluster: "ap1",
        encrypted: true
    });


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get("https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" + String(position.coords.latitude) + "%2C" + String(position.coords.longitude) + "%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=9fqnaB6d6rLJWxFpNASK&app_code=RoB26jtN0zFQ1BBhPdJe2A")
                .then((response) => {
                console.log(response.data.Response.View[0].Result[0].Location.Address.Subdistrict);
                let kota = String(response.data.Response.View[0].Result[0].Location.Address.Subdistrict) + ", " + String(response.data.Response.View[0].Result[0].Location.Address.Label);
                setKota(kota) 
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }
    })    

    useEffect(() => {
        let channel = pusher.subscribe('data-notif');

        channel.bind('new-data', (datas) => {
            setData({
                air: datas.air,
                udara: datas.udara,
                sampah: datas.sampah,
                date: datas.date,
                status: datas.status
            }); 
            setLabels(oldArray => [...oldArray, datas.date]);
            setAir(oldArray => [...oldArray, datas.air]);
            setUdara(oldArray => [...oldArray, datas.udara]);
            setSampah(oldArray => [...oldArray, datas.sampah]);
            
        });

        console.log(labels);

        /*
        pusher.connection.bind('connected', () => {
            axios.get('https://strawxserver.herokuapp.com/data1')
                .then(response => {
                    setData(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        })
        */
    }, [])

    return(
        <div className="flex">
            <div className="header-nav w-7/12 h-full pt-10 pb-10">
                <div id="top">
                    <h1 className="text-2xl font-light text-teal-500 pl-10">LINGKUNGANKU</h1>
                    <div className="status-wilayah mt-5 mb-5 pl-10 pr-10 pt-5 pb-5 bg-blue-200">
                        <h3 className="text-xs text-light text-gray-800">Status Wilayah Kamu</h3>
                        <h4 className="text-xs text-light text-black">{kota}</h4>
                        <h4 className="text-3xl text-light text-blue-500">{data.status}</h4>
                    </div>
                    <div className="p-10">
                        <div className="pb-10">
                            <p className="text-left">{data.date}</p>
                        </div>
                        <div className="pb-5">
                            <div className="flex justify-between pb-2">
                                <p className="text-left">Kadar Udara</p>
                                <p className="text-right">{data.udara}%</p>
                            </div>
                            <Line percent={data.udara} strokeWidth="2" strokeColor="#4299e1" trailColor="#ffffff" />
                        </div>
                        <div className="pb-5">
                            <div className="flex justify-between pb-2">
                                <p className="text-left">Tinggi Air</p>
                                <p className="text-right">{data.air}%</p>
                            </div>
                            <Line percent={data.air} strokeWidth="2" strokeColor="#4299e1" trailColor="#ffffff" />
                        </div>
                        <div className="pb-5">
                            <div className="flex justify-between pb-2">
                                <p className="text-left">Sampah</p>
                                <p className="text-right">{data.sampah}%</p>
                            </div>
                            <Line percent={data.sampah} strokeWidth="2" strokeColor="#4299e1" trailColor="#ffffff" />
                        </div>
                        <div className="text-sm italic text-gray-900">
                            <Link to="/">Kembali</Link>
                        </div>
                        
                    </div>
                    <div ic="profil" className="pl-10 pr-10 pb-10 flex items-center">
                            <div className="rounded-full w-8 h-8 overflow-hidden flex items-center justify-center">
                                <img src="https://scontent.fbdo4-1.fna.fbcdn.net/v/t1.0-9/82589712_2615495252064744_1157270567015940096_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_eui2=AeHTe15AJMau5MSJG3z4VTab_jrZeKPX2IdAPBAqtmMon-yZ2nb0mTj3JWwrWjEtga4YA-LjD5hTIo09OegIdaQHaYGNdeQpQ3hGBC4OuPUYAw&_nc_oc=AQkU5mQ0J5EherqrWEUjka6xtaG3wltbhnvh3IJfag3tzXto7HVWUCxvbm1Zv2MTQ7w&_nc_ht=scontent.fbdo4-1.fna&oh=412e7911424e0828c63f1108a6417fd5&oe=5E92B989" />
                            </div>
                            <h2 className="pl-5">Dwi Ilham Maulana</h2>
                        </div>
                </div>
                <footer className="pl-10">
                    <div className="flex text-xs">
                    <a href="#" className="text-gray-600 pr-2">Tentang Alat</a>
                    <a href="#" className="text-gray-600 pr-2">Tentang Kami</a>
                    <a href="#" className="text-gray-600 pr-2">FAQ</a>
                    </div>
                    <p className="text-gray-600 pt-2 text-xs">Copyright 2020</p>
                </footer>
            </div>
            <div className="w-full h-screen p-10 pl-0">
                <div className="rounded shadow-xl h-full w-full p-5">
                    <LineGraph 
                        sampah={sampah}
                        air={air}
                        udara={udara}
                        labels={labels}
                    />
                </div>
            </div>
        </div>
    )
}

export default Status_Component;