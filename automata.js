document.addEventListener("DOMContentLoaded", function(){
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const entrada = document.getElementById("entrada").value;
        const contenedor = document.getElementById("salida")
        const resultado = automata(entrada);

        const salida = `<p>${JSON.stringify(resultado)}</p>`

        contenedor.innerHTML = salida;

        console.log(resultado)
    });
});

const automata = (cadena) => {
    const estados = {
        q0: { "2": "q1" },
        q1: { "1": "q2", 0: "q26" },
        q2: { C: "q3", D: "q7", E: "q18" },
        q3: { C: "q4" },
        q4: { S: "q5" },
        q5: { 2: "q6" },
        q6: { Y: "q11" },
        q7: { D: "q8" },
        q8: { S: "q9" },
        q9: { 1: "q10" },
        q10: { 4: "q11" },
        q11: { 5: "q12" },
        q12: { 0: "q13" },
        q13: { 0: "q14" },
        q14: { _: "q15" },
        q15: { T: "q16" },
        q16: { P: "q17" },
        q18: { 4: "q19" },
        q19: { S: "q20" },
        q20: { 0: "q21" },
        q21: { 9: "q22" },
        q22: { 6: "q23" },
        q23: { 0: "q24" },
        q24: { 0: "q25" },
        q26: { X: "q27", Y: "q40" },
        q27: { X: "q28" },
        q28: { S: "q29" },
        q29: { F: "q30" },
        q30: { 6: "q31" },
        q31: { S: "q32" },
        q32: { 0: "q33" },
        q33: { 0: "q34" },
        q34: { _: "q35" },
        q35: { T: "q36" },
        q36: { P: "q37" },
        q37: { M: "q38" },
        q38: { X: "q39" },
        q40: { 6: "q41" },
        q41: { S: "q42" },
        q42: { 1: "q43" },
        q43: { V: "q44" },
        q44: { H: "q45" },
        q45: { 0: "q46" },
        q46: { 0: "q47" },
        q47: { _: "q48" },
        q48: { T: "q49" },
        q49: { P: "q50" },
    };

    let estado_actual = "q0"
    let salida = "q0"
    const estados_terminales = ["q14", "q17", "q25", "q34", "q39", "q47", "q50"]

    for (let i = 0; i < cadena.length; i++) {
        const caracter_actual = cadena.substring(i, i + 1)

        try {
            if (!estados[estado_actual][caracter_actual]) {
                salida = `${salida} X`

                return { success: false, msg: salida };
            }
        } catch (error) {
            salida = `${salida} X`

            return { success: false, msg: salida };
        }
        estado_actual = estados[estado_actual][caracter_actual];

        salida = `${salida} -> ${estado_actual}`
    }

    if (estados_terminales.includes(estado_actual)) {
        return { success: true, msg: salida };
    }
    salida = `${salida} X`
    return { success: false, msg: salida };
}
