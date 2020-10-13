import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState, useContext } from 'react';
import ContextAPI from '../ContextAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: "0 auto",
        marginTop: 20,
        marginBottom: 80
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        color: "#3f51b5",
        textTransform: "uppercase"
    },
}));

export default function AllCountries() {
    const classes = useStyles();

    let [globalData, setGlobalData] = useState({});

    let country = useContext(ContextAPI)

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL');
            let data = await response.json();
            delete data.sitedata;
            Object.values(data.countryitems[0]).map((key) => {
                if (String(key.title).toLowerCase() === country[0].toLowerCase()) {
                    setGlobalData(key)
                }
            })        
        }

        getData()
    }, [country[0]])

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Countrywise Covid-19 Stats</h1>
            <Grid container spacing={3}>
                {
                    
                    Object.entries(globalData).map((key, ind) => {
                        if (key[0] === "ourid" || key[0] === "code" || key[0] === "source")
                            return <></>
                        else
                            return (
                                <Grid item xs={12} sm={4} key={ind} >
                                    <Paper className={classes.paper} elevation={3}>
                                        <h3 className={classes.title}>{key[0].replace(/_/g, " ")}</h3>
                                        <h3>{key[1]}</h3>
                                    </Paper>
                                </Grid>
                            )
                    }
                )}
            </Grid>
        </div>
    );
}