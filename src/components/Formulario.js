import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helpers';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    margin-top: 2rem;
    transition: all 0.25s ease-in-out;

    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, guardarError] = useState(false);

    const { marca, year, plan } = datos;

    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    const cotizarSeguro = e => {
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        const diferencia = obtenerDiferenciaYear(parseInt(year));
        // EL precio inicial es de 2000
        let resultado = 2000;
        // Calculo del porcentaje dependiendo del año seleccionado
        resultado -= ((diferencia * 3) * resultado) / 100;
        // Calculo del precio dependiendo de la marca del auto
        let incremento = calcularMarca(marca);
        resultado = resultado * incremento;
        // Calculo del precio dependiendo del tipo de plan
        resultado = parseFloat(obtenerPlan(plan) * resultado).toFixed(2);

        guardarCargando(true);

        setTimeout(() => {
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
            guardarCargando(false);
        }, 3000);


    }


    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {
                error ?
                    <Error>Todos los campos son obligatorios</Error>
                    :
                    null
            }
            <Campo>
                <Label htmlFor="marca">Marca</Label>
                <Select
                    name="marca"
                    id="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Selecciones --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>

            <Campo>
                <Label htmlFor="year">Año</Label>
                <Select
                    name="year"
                    id="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label htmlFor="basico">Plan basico</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    id="basico"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                />
            </Campo>
            <Campo>
                <Label htmlFor="completo">Plan completo</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    id="completo"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                />
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired,
};

export default Formulario;