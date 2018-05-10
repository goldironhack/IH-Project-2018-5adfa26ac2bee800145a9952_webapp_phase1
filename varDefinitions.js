const NEIBORHOOD_NAMES_URL = 'https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD'

const DISTRICT_GEOSHAPES_URL = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson'

const CRIMES_URL = 'https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=1015-02-14T00:00:00.000'

const HOUSING_URL = 'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?acces'

const POLLUTION_URL = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD'

const NY_COORDS = {lat: 40.730610, lng: -73.935242}

const SCHOOL_COORDS = {lat: 40.729754, lng: -73.996330}

var map

var neighborhoods = []
var districtGeoshapes =[]
var crimes = []
var housingData = []
var pollution = []
var traffic = []

housingDataById = {}