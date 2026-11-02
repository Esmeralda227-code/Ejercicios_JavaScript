// DATOS (Array, objetos)
const gastos = [
    { descripcion: 'Supermercado mensual', monto: 120, categoria: 'Alimentación' },
    { descripcion: 'Pasaje mensual', monto: 40, categoria: 'Transporte' },
    { descripcion: 'pago de suscripciónes(netflix, spotify, disney+)', monto: 45, categoria: 'Entretenimiento' },
    { descripcion: 'Compra de mangas', monto: 15, categoria: 'hobby' },
    { descripcion: 'Internet de casa', monto: 50, categoria: 'Servicios' },
    { descripcion: 'Universidad', monto: 133, categoria: 'Educación' }
];

// Calculo Total 
function calcularTotal(listaGastos) {
    let suma = 0;
    for (let i = 0; i < listaGastos.length; i++) {
        if (typeof listaGastos[i].monto != 'number') {
            throw new Error(`El gasto "${listaGastos[i].descripcion}" no tiene un monto numérico válido.`);
        }
        suma += listaGastos[i].monto;
    }
    return suma;
}

// Calculo promedio
function calcularPromedio(listaGastos) {
    if (listaGastos.length === 0) {
        throw new Error('El array de gastos está vacío, no se puede calcular el promedio.');
    }
    let total = calcularTotal(listaGastos);
    return total / listaGastos.length;
}

function filtrarPorCategoria(listaGastos, categoriaBuscada) {
    let resultado = [];
    for (let i = 0; i < listaGastos.length; i++) {
        if (listaGastos[i].categoria === categoriaBuscada) {
            resultado[resultado.length] = listaGastos[i]; // Asignación por índice requerida
        }
    }
    return resultado;
}

// Gasto Mayor
function obtenerMayorGasto(listaGastos) {
    if (listaGastos.length === 0) return null;
    let mayor = listaGastos[0];
    for (let i = 1; i < listaGastos.length; i++) {
        if (listaGastos[i].monto > mayor.monto) {
            mayor = listaGastos[i];
        }
    }
    return mayor;
}

function clasificarGasto(monto) {
    if (monto >= 100) {
        return 'Alto';
    } else if (monto >= 50 && monto < 100) {
        return 'Medio';
    } else {
        return 'Bajo';
    }
}

// Categorías usadas
function describirCategoria(categoria) {
    switch (categoria) {
        case 'Alimentación':
            return 'Gastos de alimentacion';
        case 'Transporte':
            return 'Gastos relacionados con movilidad y traslados.';
        case 'Entretenimiento':
            return 'Gastos de entretenimiento';
        case 'Servicios':
            return 'Gastos de servicios para el hogar.';
        case 'Educación':
            return 'Gastos relacionados con el estudio';
        default:
            return 'Categoría general de hobby.';
    }
}

// gastos altos
function crearContadorDeAltos() {
    let contadorAltos = 0;
    return function () {
        contadorAltos++;
        return contadorAltos;
    };
}

const esGastoRelevante = (monto) => monto > 30;


//Flujo principal (try-catch)
try {
    let incrementarContadorAlto = crearContadorDeAltos();
    let cantidadAltos = 0;

    let gastosClasificados = [];
    for (let i = 0; i < gastos.length; i++) {
        let gastoActual = gastos[i];
        let nivelClasificado = clasificarGasto(gastoActual.monto);
        let descripcionCat = describirCategoria(gastoActual.categoria);

  
        if (nivelClasificado === 'Alto') {
            cantidadAltos = incrementarContadorAlto();
        }

        gastosClasificados[gastosClasificados.length] = {
            descripcion: gastoActual.descripcion,
            monto: gastoActual.monto,
            categoria: gastoActual.categoria,
            nivel: nivelClasificado,
            descripcionCategoria: descripcionCat
        };
    }

    // Cálculos generales
    let totalGastos = calcularTotal(gastos);
    let promedioGastos = calcularPromedio(gastos);
    let gastoMayor = obtenerMayorGasto(gastos);
    let filtradosTransporte = filtrarPorCategoria(gastos, 'Transporte');

    //resumen por categoría
    let resumenPorCategoria = {};
    for (let i = 0; i < gastos.length; i++) {
        let cat = gastos[i].categoria;
        let monto = gastos[i].monto;
        if (resumenPorCategoria[cat]) {
            resumenPorCategoria[cat] += monto;
        } else {
            resumenPorCategoria[cat] = monto;
        }
    }

    
    console.log(' INFORME GENERAL DE GASTOS ');

    console.log('Gastos Clasificados (Tabla):');
    console.table(gastosClasificados);

    console.log(`Promedio de gastos: ${promedioGastos.toFixed(2)}`);
    console.log(`Total gastado: ${totalGastos}`);

    console.log('Gasto más alto:', gastoMayor);
    console.log(`Cantidad de gastos altos: ${cantidadAltos}`);

    console.log('Gastos filtrados por categoría (Transporte):', filtradosTransporte);

    // JSON.stringify
    let informeFinal = {
        total: totalGastos,
        promedio: promedioGastos,
        cantidadAltos: cantidadAltos,
        mayorGasto: gastoMayor,
        resumenPorCategoria: resumenPorCategoria
    };

    console.log('Informe Final en JSON:');
    console.log(JSON.stringify(informeFinal, null, 2));


    // Prueba controlada (Array Vacío)

    console.log('\n--- PRUEBA CONTROLADA DE ERROR ---');
    try {
        calcularPromedio([]);  //error controlado
    } catch (errorPrueba) {
        console.error('Error controlado capturado exitosamente:', errorPrueba.message);
    }

} catch (errorPrincipal) {
   
    console.error('Ocurrió un error en el procesamiento:', errorPrincipal.message);
}