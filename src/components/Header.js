import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorHeader = styled.header`
    background-color: #26C6DA;
    padding: 10px;
    font-weight: bold;
    color: #FFFFFF;
`;

const TexotHeader = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: 'Slabo 27px', serif;
    text-align: center;
`;

const header = ({ titulo }) => {
    return (
        <ContenedorHeader>
            <TexotHeader>{titulo}</TexotHeader>
        </ContenedorHeader>
    );
};

header.propTypes = {
    titulo: PropTypes.string.isRequired,
};

export default header;