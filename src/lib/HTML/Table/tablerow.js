import React from 'react';
import { Box } from 'rebass';
import PropTypes from 'prop-types';

export const TableRow = ({ children, ...rest}) => (
    <Box as='tr' {...rest}>{children}</Box>
);

TableRow.propTypes = {
    children: PropTypes.node.isRequired
};