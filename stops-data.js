// Sound Transit stops and stations data
// Coordinates from official Sound Transit GeoJSON data

const soundTransitStops = [
    // Light Rail - Main Line (Lynnwood to Federal Way)
    {
        name: "Lynnwood City Center Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.8156389468246,
        lng: -122.294753204068,
        address: "3000 194th St SW",
        dailyRidership: 7200,
        weeklyRidership: 50400,
        annualRidership: 2620800
    },
    {
        name: "Mountlake Terrace Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.7850021962777,
        lng: -122.314791200734,
        address: "236th St SW & 56th Ave W",
        dailyRidership: 5600,
        weeklyRidership: 39200,
        annualRidership: 2038400
    },
    {
        name: "Shoreline North/185th Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.7640810883447,
        lng: -122.322850802958,
        address: "185th St & 5th Ave N",
        dailyRidership: 6800,
        weeklyRidership: 47600,
        annualRidership: 2474800
    },
    {
        name: "Shoreline South/148th Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.7361012121992,
        lng: -122.325233528668,
        address: "148th St & 5th Ave N",
        dailyRidership: 6400,
        weeklyRidership: 44800,
        annualRidership: 2329600
    },
    {
        name: "Northgate Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.7030278568312,
        lng: -122.328290001707,
        address: "10440 8th Ave NE",
        dailyRidership: 8900,
        weeklyRidership: 62300,
        annualRidership: 3239600
    },
    {
        name: "Roosevelt Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6765945836052,
        lng: -122.315976128072,
        address: "12th Ave NE & NE 65th St",
        dailyRidership: 9200,
        weeklyRidership: 64400,
        annualRidership: 3348800
    },
    {
        name: "U District Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6603010387388,
        lng: -122.314131795454,
        address: "4720 University Way NE",
        dailyRidership: 10400,
        weeklyRidership: 72800,
        annualRidership: 3785600
    },
    {
        name: "University of Washington Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6498150806149,
        lng: -122.303763015652,
        address: "3750 15th Ave NE",
        dailyRidership: 11600,
        weeklyRidership: 81200,
        annualRidership: 4222400
    },
    {
        name: "Capitol Hill Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6190601473748,
        lng: -122.320194654226,
        address: "E Pike St & 10th Ave",
        dailyRidership: 10300,
        weeklyRidership: 72100,
        annualRidership: 3749200
    },
    {
        name: "Westlake Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6115721588528,
        lng: -122.336719986395,
        address: "8th Ave & Olive Way",
        dailyRidership: 12100,
        weeklyRidership: 84700,
        annualRidership: 4404200
    },
    {
        name: "Symphony Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6078102407675,
        lng: -122.336019831775,
        address: "3rd Ave & Pine St",
        dailyRidership: 9800,
        weeklyRidership: 68600,
        annualRidership: 3567200
    },
    {
        name: "Pioneer Square Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.6025601245898,
        lng: -122.33121602176,
        address: "3rd Ave S & S Jackson St",
        dailyRidership: 7800,
        weeklyRidership: 54600,
        annualRidership: 2838800
    },
    {
        name: "Intl. District / Chinatown Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5983550239356,
        lng: -122.327992256932,
        address: "S Lane St & 5th Ave S",
        dailyRidership: 8900,
        weeklyRidership: 62300,
        annualRidership: 3239600
    },
    {
        name: "Stadium Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5911083518244,
        lng: -122.327171618272,
        address: "1st Ave S & S Royal Brougham Way",
        dailyRidership: 7200,
        weeklyRidership: 50400,
        annualRidership: 2620800
    },
    {
        name: "Sodo Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.581074282053,
        lng: -122.327389774014,
        address: "401 S Lander St",
        dailyRidership: 6100,
        weeklyRidership: 42700,
        annualRidership: 2220400
    },
    {
        name: "Beacon Hill Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5793276863571,
        lng: -122.311533471218,
        address: "15th Ave S & S Lander St",
        dailyRidership: 5200,
        weeklyRidership: 36400,
        annualRidership: 1892800
    },
    {
        name: "Mount Baker Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5765501262846,
        lng: -122.297679104375,
        address: "29th Ave S & S McClellan St",
        dailyRidership: 5800,
        weeklyRidership: 40600,
        annualRidership: 2111200
    },
    {
        name: "Columbia City Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5597334784311,
        lng: -122.292691648732,
        address: "Rainier Ave S & S Alaska St",
        dailyRidership: 4400,
        weeklyRidership: 30800,
        annualRidership: 1601600
    },
    {
        name: "Othello Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5379868480215,
        lng: -122.281562901357,
        address: "4800 S Othello St",
        dailyRidership: 4100,
        weeklyRidership: 28700,
        annualRidership: 1492400
    },
    {
        name: "Rainier Beach Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.5223936042706,
        lng: -122.279390550758,
        address: "Rainier Ave S & S Henderson St",
        dailyRidership: 3900,
        weeklyRidership: 27300,
        annualRidership: 1419000
    },
    {
        name: "Tukwila Intl. Blvd. Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.4640306108864,
        lng: -122.287995911829,
        address: "14675 International Blvd S",
        dailyRidership: 3200,
        weeklyRidership: 22400,
        annualRidership: 1164800
    },
    {
        name: "SeaTac / Airport Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.4453811664942,
        lng: -122.296898315866,
        address: "17620 International Blvd S",
        dailyRidership: 12500,
        weeklyRidership: 87500,
        annualRidership: 4562500
    },
    {
        name: "Angle Lake Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.4227026714562,
        lng: -122.29771402321,
        address: "S 200th St & Pacific Hwy S",
        dailyRidership: 4700,
        weeklyRidership: 32900,
        annualRidership: 1710700
    },
    {
        name: "Kent Des Moines Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.4067,
        lng: -122.2954,
        address: "Russell Rd & 212th St S",
        dailyRidership: 3300,
        weeklyRidership: 23100,
        annualRidership: 1201200
    },
    {
        name: "Star Lake Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.3808,
        lng: -122.3035,
        address: "Star Lake Rd S & S 216th St",
        dailyRidership: 2900,
        weeklyRidership: 20300,
        annualRidership: 1055600
    },
    {
        name: "Federal Way Downtown Station",
        type: "Light Rail",
        line: "Light Rail",
        lat: 47.3216,
        lng: -122.3116,
        address: "S 320th St & 23rd Ave S",
        dailyRidership: 4100,
        weeklyRidership: 28700,
        annualRidership: 1492400
    }
];
