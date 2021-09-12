const {google} = require ("googleapis");

export const saveData = async (data) => {
    var state = {};
    state.spreadsheetId = "1XuzHOyi9Jqi8y_58O4g9Uwl3UVb2Nwpde-DS2x8VLyA";

    const save = async (data) => {
        // write rows to spreadsheet
        await state.sheetsApi.spreadsheets.values.append({
            auth: state.auth,
            spreadsheetId: state.spreadsheetId,
            range: "Hoja 1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        data[0],data[1],                                    // Dolar Blue
                        data[4],data[5],                                    // Dolar Oficial Promedio
                        data[6],data[7],                                    // Dolar Bolsa
                        data[8],data[9],                                    // Dolar Contado con Liqui
                        data[10], "",                                       // Dolar Solidario/tarjeta
                        new Date(Date.now()).toLocaleString('es-AR'),       // Date 
                    ],
                ]
            }
        });
    }
    
    const initialize = async () => {
        // authenticate object
        state.auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
    
        // client instance for auth
        state.client = await state.auth.getClient();
    
        // google sheet api instance
        state.sheetsApi = google.sheets({version: "v4", auth: state.client});
    }

    if(!state.sheetsApi)
        await initialize();

    await save(data);
}