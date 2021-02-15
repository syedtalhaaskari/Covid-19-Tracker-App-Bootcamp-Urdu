import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState, useContext } from 'react';
import ContextAPI from '../ContextAPI';
import { Bar } from 'react-chartjs-2';

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
    graph: {
        marginTop: 50
    }
}));

export default function AllCountries() {
    const classes = useStyles();

    let [globalData, setGlobalData] = useState({});

    let country = useContext(ContextAPI)

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://api.covid19api.com/summary');
            let data = await response.json();
            data.Countries.forEach(key => {
                if (key.Country.toLowerCase() === country[0].toLowerCase()) {
                    delete key.ID;
                    delete key.CountryCode;
                    delete key.Slug;
                    delete key.Date;
                    delete key.Premium;
                    setGlobalData(key)
                }
            })
        }

        getData()
    }, [country])

    let keyData = Object.keys(globalData)
    let valueData = Object.values(globalData)

    const data = {
        datasets: [{
            label: valueData[0],
            data: [
                valueData[1],
                valueData[2],
                valueData[3],
                valueData[4],
                valueData[5],
                valueData[6],
            ],
            borderWidth: 1,
            borderColor: [
                '#FF6304',
                '#4BC000',
                '#FFCE06',
                '#E7E90D',
                '#36A20B',
                '#4BC00F',
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB',
                '#4BC0FF',
            ],
            hoverBackgroundColor: [
                '#FF5184',
                '#4BAFC0',
                '#FFBD56',
                '#E7D8ED',
                '#3691EB',
                '#4BAFFF',
            ],
            hoverBorderColor: [
                '#FF4184',
                '#4B9FC0',
                '#FFAD56',
                '#E7C8ED',
                '#3681EB',
                '#4B9FFF',
            ]
        }],
        labels: [
            keyData[1],
            keyData[2],
            keyData[3],
            keyData[4],
            keyData[5],
            keyData[6],
        ]
    };

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Countrywise Covid-19 Stats</h1>

            <Grid container spacing={3}>
                {
                    globalData.Country
                        ?
                        Object.keys(globalData).map((key, ind) => {
                            return (
                                <Grid item xs={12} sm={4} key={ind} >
                                    <Paper className={classes.paper} elevation={3}>
                                        <h3 className={classes.title}>{key}</h3>
                                        <h3>{globalData[key]}</h3>
                                    </Paper>
                                </Grid>
                            )
                        })
                        :
                        <Grid item xs={12} >
                            <Paper className={classes.paper} elevation={3}>
                                <h3 className={classes.title}>Enter Valid Country Name</h3>
                            </Paper>
                        </Grid>
                }
            </Grid>
            <div className={classes.graph}>
                <h3 className={classes.title}>Graph</h3>
                <Bar
                    data={data}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
}