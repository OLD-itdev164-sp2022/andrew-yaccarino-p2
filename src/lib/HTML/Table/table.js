import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';

export const Table = ({ children, ...rest }) => (
    <Box mx='auto' as='table' {...rest}>{children}</Box>
);

Table.propTypes = {
    children: PropTypes.node.isRequired
};