// @ts-nocheck
import { Card, CardContent, Grid, Tooltip } from '@mui/material'
import { useEffect, useState } from "react"
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import { NavLink } from 'react-router-dom';


const WeatherChk = () => {



    const [capita, setCapita] = useState<string>('')
    const [wData, setWData] = useState<any>()


    const getApiData = async (v: string) => {
        const response = await fetch(
            `http://api.weatherstack.com/current?access_key=5ab20f3f9d1ae41b6d023c0873017ca4&query=` + v
        ).then((response) => response.json());
        setWData(response)
    };


    useEffect(() => {
        const value = localStorage.getItem('capital');
        if (value !== null) {
            setCapita(value)
            getApiData(value)
        }
    }, [])


    useEffect(() => {
        if (wData) {
            console.log(wData)
        }
    }, [wData])



    return (
        <>
            <NavLink to='/'>
                <Tooltip title="Move Back">
                    <BackspaceRoundedIcon style={{ fontSize: "40px", float: "right" }} />
                </Tooltip>
            </NavLink>
            <h1>Weather in {capita}</h1>
            <Card style={{ minWidth: "1040px" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <span><strong>Temperature : </strong>{wData?.current?.temperature}&deg;C</span>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <span><img src={wData?.current?.weather_icons[0]} /><br />{wData?.current?.weather_descriptions[0]}</span>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <span><strong>Wind Speed : </strong>{wData?.current?.wind_speed}mph</span>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <span><strong>Precipitation : </strong>{wData?.current?.precip}mm</span>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default WeatherChk