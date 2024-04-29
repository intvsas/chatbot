const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//cerrar flujo
const flowend = addKeyword(['1']).addAnswer([
    
    '',
   

]

)


//servicio de television

const flowTv = addKeyword(['1', 'siguiente']).addAnswer([
    
    'Indíquenos a nombre de quien esta su servicio, por favor espere y en un momento le responde un asesor.',
   

])


//Servicio de internet

const flowreslento = addKeyword(['1', 'siguiente']).addAnswer([
    
    'Indiquenos a nombre de quien esta su servicio, por favor espere y en un momento le responde un asesor.',
   

])


const flowresRojo = addKeyword(['1', 'siguiente']).addAnswer([
    
    'Gracias por comunicarte con nosotros, enseguida programamos una visita técnica lo más pronto posible para solucionar su falla. \nPor favor indíquenos a nombre de quien esta su servicio y nos proporciona una foto del equipo.',
           

])


const flowSecundario2 = addKeyword(['2', 'siguiente']).addAnswer([
    'Escribe el numero de la opción que requieras',
            '',
            '👉 *1* El equipo tiene el led(bombillo) PON intermitente o rojo',
            '👉 *2*  El equipo tiene el led(bombillo) PON estático ',

],
null,
null,
[flowresRojo]
)

const flowSecundario = addKeyword(['1', 'siguiente']).addAnswer([
    'Por favor, desconecte de la corriente durante 30 segundos y vuelva a conectar. Verifique que el dispositivo que está usando no esté muy lejos, y no haya interferencia (paredes o planchas) y si es consola, tv o computador esté conectado por cable.',
    '',
            '👉 *1*  Ya hice esto y sigue lento',
            

],
null,
null,
[flowreslento]
)



const flowMintic = addKeyword(['1', '1']).addAnswer(
    [
        'Hola 👋',
        'A continuación, le enviamos la información acerca del subsidio *CONECTIVIDAD PARA CAMBIAR VIDAS* con INTV S.A.S, que manejamos actualmente para las personas de estrato 1 y 2, con el fin de que lo lea detenidamente.', 
        'Si tiene alguna duda háganosla saber y con gusto le responderemos.',
        '',
        'Instalación zona urbana corinto',  
        '',
        'Estrato *1* internet + tv 25.000 mil mensual',
        'Estrato *1* internet + tv 25.000 mil mensual',
        'Estrato *2* internet + tv 35.000 mil mensual',
        '',
         'Velocidad de internet', 
        '',
        '25 Mbps de bajada ',
        '5 Mbps de subida ', 
        '',
         'Requisitos (Estos documentos debe llevarlos a nuestras oficinas de INTV): ',
        '   •  Fotocopia de cedula ampliada al 150 por ambos lados ',
        '   •  Fotocopia de recibo del agua o energía',
        '   •  Número de celular ',
        '   •  Correo electrónico',
        '   •  Los nombres de los que viven en la casa con numero de documento ',
        '   •  Teléfono',
        '   •  Firmar carta juramentada (solo firma de quien que titular en el servicio)',
        '',
        'Nota:  Las personas que se encuentren afiliadas a las empresas que se mencionan a continuación no aplican al beneficio: ',
        '',
        '   •  TIERRA NET',
        '   •  WINTV',
        '   •  CABLE NORTE',
        '   •  INTERNET Y TELEVISION SAS',
        '',
        '📌 2 años de beneficio',  
        '📌 Las facturas se emiten cada primero del mes y los cortes o suspensión del servicio por no pago de la factura son cada 5 del mes.',
        '📌 Los equipos que se instalan son en calidad de préstamo, debe de cuidarlos y en caso que se dañe debe de responder por el equipo.',
        '',
        'Visítenos en cualquiera de nuestros centros de atención presencial:',
        'Calle 11 # 8-04 El Ruiz (MIRANDA)',
        'Carrera 11 # 6-80 EL Centro ferretería INELECTRO piso 2 (CORINTO)',
    ],
    null,
    null,
    [flowSecundario]
)



const flowInter = addKeyword(['2', '2']).addAnswer(
    [
        'Escribe el numero de la opción que requieras',
            '',
            '👉 *1*  Internet lento o intermitente',
            '👉 *2*  No tengo internet',
    ],
    null,
    null,
    [flowSecundario,flowSecundario2]
)

const flowTele = addKeyword(['3']).addAnswer(
    [
        'Por favor verifique que su tv esté conectado, conectores ajustados y que el cable no esté en mal estado, una vez realizada la verificación escanee de nuevo la señal. Recordando que debe ser en la antena de aire y señal digital.',
        '',
        '👉 Escanear canales En decodificador TDT: https://youtube.com/shorts/QJyCG5GSDHE?si=AdZlB5o9h2gi5AJR ',
        '👉 Escanear canales en Smart TV: https://youtube.com/shorts/QJyCG5GSDHE?si=WNNEuS_D01GhrUsC',
        '',
        '👉 *1*  Ya hice esto y sigo sin Televisión',
    ],
    null,
    null,
    [flowTv]
)

//flujo principal de Bienvenida
const flowPrincipal = addKeyword([''])
    .addAnswer('🙌 Hola, bienvenido a *INTV* \n¿En qué podemos ayudarte?')
    .addAnswer(
        [
            'Escribe el numero de la opción que requieras',
            '',
            '👉 *1*  Información sobre Internet Subsidiado',
            '👉 *2*  Reportar fallas en su servicio de Internet',
            '👉 *3*  Reportar fallas en su servicio de Televisión',
            
        ],
        null,
        null,
        [flowInter, flowMintic, flowTele]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()



