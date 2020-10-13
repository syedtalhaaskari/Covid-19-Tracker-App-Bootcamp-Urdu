import React, {Fragment} from 'react';
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

    let keyData = Object.keys(globalData)
    let valueData = Object.values(globalData)

    const data = {
        datasets: [{
            label: valueData[1],
            data: [
                valueData[4],
                valueData[5],
                valueData[6],
                valueData[7],
                valueData[8],
                valueData[9],
                valueData[10],
                valueData[11]
            ],
            borderWidth: 1,
            borderColor: [
                '#FF6304',
                '#4BC000',
                '#FFCE06',
                '#E7E90D',
                '#36A20B',
                '#4BC00F',
                '#FFEE03',
                '#E7AB0D'
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB',
                '#4BC0FF',
                '#FFEE63',
                '#E7ABED'
            ],
            hoverBackgroundColor: [
                '#FF5184',
                '#4BAFC0',
                '#FFBD56',
                '#E7D8ED',
                '#3691EB',
                '#4BAFFF',
                '#FFDD63',
                '#E79AED'
            ],
            hoverBorderColor: [
                '#FF4184',
                '#4B9FC0',
                '#FFAD56',
                '#E7C8ED',
                '#3681EB',
                '#4B9FFF',
                '#FFCD63',
                '#E78AED'
            ]
        }],
        labels: [
            keyData[4],
            keyData[5],
            keyData[6],
            keyData[7],
            keyData[8],
            keyData[9],
            keyData[10],
            keyData[11]
        ]
    };

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Countrywise Covid-19 Stats</h1>

            <Grid container spacing={3}>
                {

                    Object.entries(globalData).map((key, ind) => {
                        if (key[0] === "ourid" || key[0] === "code" || key[0] === "source")
                            return <Fragment key={ind}></Fragment>
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



// import React from 'react';




// export default React.createClass({
//   displayName: 'PolarExample',

//   render() {
//     return (
//       <div>
//         <h2>Polar Example</h2>
//         <Polar data={data} />
//       </div>
//     );
//   }
// });