// @ts-nocheck

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';




export default function HomeCard() {
    
    const [input, setInput] = useState<string>('');
    const [showB, setShowB] = useState<boolean>(false);
    const [top100Films, setTop100Films] = useState<[]>([])
    const [selected, setSelected] = useState<string>('');
    const [ide, setIde] = useState<string>('');

    const getApiData = async (v: string) => {
        const response = await fetch(
            `https://restcountries.com/v2/name/` + v
        ).then((response) => response.json());
        let arrays: any = []
        for (let i = 0; i <= 100; i++) {
            arrays.push(response[i])
        }
        setTop100Films(arrays);
    };


    const changedChk = async (v: string) => {
        const response = await fetch(
            `https://restcountries.com/v2/name/` + v
        ).then((response) => response.json());

        setIde(response && response.length ? response[response.length - 1] : '')

        localStorage.setItem('capital', response && response.length ? response[response.length - 1].capital : '')
        setShowB(true)
    };

    useEffect(() => {
        getApiData("a")
        localStorage.clear()
    }, [])

    useEffect(() => {
        if (input) {
            setShowB(true)
        } else {
            setShowB(false)
        }

    }, [input])

    useEffect(() => {
        if (selected) {
            changedChk(selected)

        } else {
            setShowB(false)
        }
    }, [selected])


    return (
        <>
            <h1>Select a Country</h1>
            <Card style={{ minWidth: "1040px" }}>
                <CardContent>
                    <Autocomplete
                        disablePortal
                        id="combobox"
                        data-testid="autocomplete"
                        options={top100Films ? top100Films : ''}
                        // @ts-ignore
                        getOptionLabel={(option) => option.name}

                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Countries" data-testid="textbox"/>}
                        onInputChange={(e) => setInput((e.target as HTMLInputElement).value)}
                        onSelect={(e) => setSelected((e.target as HTMLInputElement).value)}
                    />
                </CardContent>
                <CardActions>
                    <NavLink to={!showB ? '' : '/weather'} ><Button data-testid="button" variant="contained" disabled={!showB ? true : false} className={!showB ? "grey" : 'blue'} style={{ background: !showB ? "grey" : '' }}>Capital Weather</Button></NavLink>
                </CardActions>
            </Card>

            <br />
            {ide && selected ? (<>
                <Card style={{ minWidth: "1040px" }}>
                <CardContent>
                    <h4 style={{ fontSize: "24px" }}> Selected {selected ? selected : ''}</h4><br />
                    {}
                    <span><strong>Capital : </strong></span>{ide ? ide.capital : ''}<br />
                    <span><strong>Population : </strong></span>{ide ? ide.population : ''}<br />
                    <span><strong>Latitude, Longitude : </strong></span>{ide ? ide.latlng[0] : ''},{ide ? ide.latlng[1] : ''}<br />
                    <span><strong>Flag : </strong></span><img src={ide ? ide.flags.png : ''} /><br />
                </CardContent>
            </Card>
            </>) : ''}
            


        </>
    );
}